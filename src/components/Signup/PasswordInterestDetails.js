import { React, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./UserKindMain.module.css";
import styles from "./EntDetailsForm.module.css";
const PasswordInterestDetailsForm = (props) => {
    const passwordInputRef = useRef("");
    const interestInputRef = useRef("");
    

    function submitHandler(event) {
        event.preventDefault();
    }    
    return (
        <Card className={classes.card}>
          <header>Personal Details</header>
          <div className={styles.input}>
          <form onSubmit={submitHandler}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passwordInputRef} />
            <label htmlFor="interest">Interest</label>
            <input id="interest" type="text" ref={interestInputRef} />
    
            <Button type="submit" className={classes.button}>
              Submit
            </Button>
            {/* {isLoading && <LoadingSpinner />}
              <div className={classes.newUser} onClick={newUserHandler}>
                New user?Signup
              </div> */}
          </form></div>
        </Card>)
};
export default PasswordInterestDetailsForm;