import passport from "passport";
import KakaoStrategy from "passport-kakao";
import { getRepository } from "typeorm";
import { User } from "./entity/User";

const passportConfig = () => {
  passport.use(
    new KakaoStrategy(
      {
        callbackURL: "/auth/kakao/callback",
        clientID: "e386b5f670b8ac0c48c7e7ed198f56bd",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null);
      }
    )
  );
};

export default passportConfig;
