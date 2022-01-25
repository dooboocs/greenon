import axios from "axios";
import { getRepository } from "typeorm";
import { User, PhoneCert } from "../entity";
import qs from "qs";

export const login = async (req, res) => {
  const user = await getRepository(User).findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({ error: "Cannot find user" });
  } else {
    const comparePassword = await user.comparePassword(req.body.password);

    if (!comparePassword) {
      res.status(401).json({ error: "Incorrect password" });
    } else {
      const accessToken = await user.generateToken();
      res.json({ token: accessToken });
    }
  }
};

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const userRepo = getRepository(User);
    const checkEmail = await userRepo.findOne({ email: req.body.email });
    const checkPhone = await userRepo.findOne({ phone: req.body.phone });

    if (checkEmail) {
      res.status(401).json({ error: "Already Exist" });
    } else if (checkPhone) {
      res.status(401).json({ error: "Already Exist" });
    } else {
      const newUser = await userRepo.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
      });
      const result = await userRepo.save(newUser);
      const accessToken = await result.generateToken();
      res.json({ token: accessToken });
    }
  } catch (error) {
    res.status(400).json({ erorr: { message: error } });
  }
};

export const kakaoLogin = async (req, res) => {
  const token = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify({
      grant_type: "authorization_code",
      client_id: "a901df17d13f61c89a412946009caaec",
      code: req.query.code,
    }),
  });

  const user: any = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${token.data.access_token}` },
  });

  const exist = await getRepository(User)
    .createQueryBuilder("user")
    .where("user.kakaoId = :kakaoId", { kakaoId: user.data.id })
    .getOne();

  if (!exist) {
    const newUser = await getRepository(User).create({
      kakaoId: user.data.id,
      email: user.data.kakao_account.email,
      name: user.data.kakao_account.profile.nickname,
      strategy: "kakao",
    });

    const result = await getRepository(User).save(newUser);
    const token = await result.generateToken();

    res.append("Set-Cookie", `token=${token}; Path=/;`);
    res.redirect("http://52.79.146.233");
  } else {
    const token = await exist.generateToken();
    res.append("Set-Cookie", `token=${token}; Path=/;`);
    res.redirect("http://52.79.146.233");
  }
};

export const sendSMS = async (req, res) => {
  // Generate Random Code
  let verifyCode = "";
  for (let i = 0; i < 6; i++) {
    verifyCode += parseInt((Math.random() * 10).toString()).toString();
  }

  if (!req.body.phone) return res.sendStatus(400);

  try {
    await axios({
      method: "POST",
      url: "https://apis.aligo.in/send/",
      data: qs.stringify({
        key: "6labktb7v9ot2j21es0jetvp8ihzxsmm",
        user_id: "greenon1",
        sender: "01099832558",
        receiver: req.body.phone,
        msg: `[그린온] 인증번호 [${verifyCode}]를 입력해 주세요.`,
        msg_type: "SMS",
      }),
    });

    const exist = await getRepository(PhoneCert).findOne({
      phone: req.body.phone,
    });

    if (exist) {
      // update
      await getRepository(PhoneCert).update(exist, { verifyCode });
    } else {
      // create
      const phoneCert = await getRepository(PhoneCert).create({
        phone: req.body.phone,
        verifyCode,
      });
      await getRepository(PhoneCert).save(phoneCert);
    }
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400).json({ error: "SMS Server Error" });
  }
};

export const authSMS = async (req, res) => {
  if (!req.body.phone) return res.sendStatus(400);

  // Find PhoneCert by phone
  const phoneCert = await getRepository(PhoneCert).findOne({
    phone: req.body.phone,
  });

  const isVerified = await phoneCert.verify(req.body.verifyCode);

  // Verify Code
  if (isVerified) {
    // valid
    return res.sendStatus(200);
  } else {
    // invalid
    res.sendStatus(401);
  }
};
