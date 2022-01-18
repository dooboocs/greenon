import axios from "axios";
import { getRepository } from "typeorm";
import { User } from "../entity";
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
    .where("user.email = :email", { email: user.data.kakao_account.email })
    .getOne();

  if (!exist) {
    const newUser = await getRepository(User).create({
      email: user.data.kakao_account.email,
      name: user.data.kakao_account.profile.nickname,
      strategy: "kakao",
      phone: "01012341234",
    });
    
    const result = await getRepository(User).save(newUser);
    const token = await result.generateToken();
    
    res.append("Set-Cookie", `token=${token}; Path=/;`);
    res.redirect("http://52.79.146.233");
  } else {
    const token = await exist.generateToken();
    console.log(token);
    res.append("Set-Cookie", `token=${token}; Path=/;`);
    res.redirect("http://52.79.146.233");
  }
};
