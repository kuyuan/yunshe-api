import passport from "passport";

interface IUserSessionObject {
  _id: string;
  name: string;
  profilePhoto: string;
}

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser((data: string, done) => {
    let user: IUserSessionObject;
    try {
      user = JSON.parse(data);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default init;
