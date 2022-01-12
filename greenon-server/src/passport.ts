import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getRepository } from "typeorm";
import { User } from "./entity/User";

const passportConfig = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        const user = await getRepository(User).findOne({ email });

        if (!user) {
          return done(null, false, { message: "Cannot find user" });
        }

        const campareResult = await user.comparePassword(password);

        if (!campareResult) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      }
    )
  );
};

export default passportConfig;
