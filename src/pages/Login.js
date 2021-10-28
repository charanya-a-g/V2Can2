import { React, useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import classes from "./Login.module.css";
import { useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorModal from "../components/UI/ErrorModal";

const Login = (props) => {
  const history = useHistory();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const userId = emailInputRef.current.value.split("@")[0];
    const password = passwordInputRef.current.value;

    try {
      const response = await fetch(
        "https://v2can-e55ef-default-rtdb.firebaseio.com/User.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const existingUser = data[userId];
      if (existingUser) {
        const storedPwrd = existingUser.userConfig.password;
        if (password !== storedPwrd) {
          throw new Error("Invalid Password");
        } else {
          homeRedirect();
        }
      } else {
        throw new Error("User does not exist");
      }
    } catch (errornew) {
      console.log(errornew.message);
      setIsError(true);
    }
    setIsLoading(false);
  }

  const newUserHandler = (event) => {
    history.push({ pathname: "/signup" });
  };
  const guestUserHandler = () => {
    history.push({ pathname: "/advertisement" });
  };
  const homeRedirect = () => {
    history.push({ pathname: "/home" });
  };
  const errorHandler = () => {
    setIsError(null);
  };

  return (
    <>
      {isError && (
        <ErrorModal
          title="Invalid Credentials"
          message="Try again"
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailInputRef} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordInputRef} />
          <div className={classes.btngrp}>
            {!isLoading && (
              <Button type="submit" className={`${classes.button} ${classes.login}`}>
                Login
              </Button>
            )}
            <Button
              type="button"
              className={classes.button}
              onClick={guestUserHandler}
            >
              Login as Guest
            </Button>
          </div>
          {isLoading && <LoadingSpinner />}
          <div className={classes.newUser} onClick={newUserHandler}>
            New user?Signup
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
