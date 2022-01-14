import passport from "passport";
import KakaoStrategy from "passport-kakao";
import { getRepository } from "typeorm";
import { User } from "./entity/User";

const passportConfig = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: "a901df17d13f61c89a412946009caaec",
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile._json.kakao_account.email;

        const exist = await getRepository(User)
          .createQueryBuilder("user")
          .where("user.email = :email", { email })
          .getOne();
        // .andWhere("user.phone = :phone", { phone });

        if (exist) {
          return done("Already Exist");
        }

        const newUser = await getRepository(User).create({
          email,
          name: "sample",
          phone: "01012341234",
          stratgey: "kakao",
        });
        console.log("create");
        await getRepository(User).save(newUser);
        console.log("save");
        const token = await newUser.generateToken();

        console.log("before done");
        return done(null, newUser, token);
      }
    )
  );
};

export default passportConfig;
