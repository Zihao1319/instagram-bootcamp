import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  //   const [userData, setUserData] = useState({ email: "", password: "" });

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
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          )
            .then((userCredential) => {
              console.log("signed up successful!");
              props.setLogin();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    // if the user already exists on firebase, then check if password is right or wrong

    // if not exist, create a new login ID
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
        <input type="submit" name="submit" />
      </form>
    </div>
  );
};

export default Login;
