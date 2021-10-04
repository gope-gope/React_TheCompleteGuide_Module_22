import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const API_KEY = "AIzaSyABqdKU5_JHhQIY-K1UVDQ5ulQTDITdA2s";

const ProfileForm = () => {
  const newPasswordInput = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInput.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}
    `,
      {
        method: "POST",
        body: JSON.stringify({
          password: enteredNewPassword,
          idToken: authCtx.token,
          returnSecureToken: false,
        }),
        header: "Content-Type: application/json",
      }
    ).then((response) => {
      // assumption: always succeeds
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={newPasswordInput}
          type="password"
          minLength="7"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
