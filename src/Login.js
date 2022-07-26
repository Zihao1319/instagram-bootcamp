import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [passwordStatus, setPasswordStatus] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(true);

  const handleChangeText = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log("Signed in");
        console.log(userCredential.user);
        props.setLogin();
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          alert("Invalid Password");
          setPasswordStatus(true);
        }
      });
    // if the user already exists on firebase, then check if password is right or wrong

    // if not exist, create a new login ID
  };
  const handleSignUp = (e) => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log("signed up successful!");
        setSignUpStatus(true);
        props.setLogin();
        alert("Sign up successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            //   value={formData.image.value}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            //   value={formData.caption}
            onChange={handleChangeText}
          />
        </div>
        <input disabled={!signUpStatus} type="submit" name="submit" />

        <button disabled={!passwordStatus} type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
