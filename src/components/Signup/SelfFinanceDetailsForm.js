import { React, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./UserKindMain.module.css";
import styles from "./EntDetailsForm.module.css";
import Multiselect from "multiselect-react-dropdown";
//import { useState } from "react/cjs/react.development";
import LoadingSpinner from "../UI/LoadingSpinner";
//import { useHistory } from "react-router-dom";
import { sendEmail } from "../Helper/EmailHelper";

const SelfFinanceDetailsForm = (props) => {
  //const history = useHistory();
  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const aadharInputRef = useRef("");
  const phoneInputRef = useRef("");
  const passwordInputRef = useRef("");
  const interestInputRef = useRef("");
  const { setIsLoading, setShowPasswordForm, setErrorConfig, setOtpConfig,setIsSuccess } =
    props;
  function submitHandler(event) {
    event.preventDefault();
    let enteredDetails = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      aadhar: aadharInputRef.current.value,
      phone: phoneInputRef.current.value,
    };

    console.log(enteredDetails);
    selfFinanceSigupVerification(enteredDetails);
  }
  async function selfFinanceSigupVerification(userDetails) {
    console.log(userDetails);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://v2can-e55ef-default-rtdb.firebaseio.com/Aadhar.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const existingUserAadar = data[userDetails.aadhar];
      let validationResults = {
        isError: false,
        errorMessage: "",
      };
      if (existingUserAadar) {
        if (userDetails.phone !== existingUserAadar.phone) {
          validationResults.isError = true;
          validationResults.errorMessage = "Give Valid Phone Number";
        }
        if (userDetails.name !== existingUserAadar.name) {
          validationResults.isError = true;
          validationResults.errorMessage = "Give Valid Name";
        }
        if (!validationResults.isError) {
          const otp = sendEmail(userDetails.name, userDetails.email);
          //const otp = "123456";
          setOtpConfig({
            showOtpModal: true,
            otp: otp,
          });
        }
      } else {
        validationResults.isError = true;
        validationResults.errorMessage = "Invalid Aadhar Number";
      }
      if (validationResults.isError) {
        setErrorConfig(validationResults);
        throw new Error(validationResults.errorMessage);
      } else {
        setShowPasswordForm(true);
      }
    } catch (errornew) {
      setErrorConfig({
        isError: true,
        errorMessage: errornew.message || "Something went wrong..",
      });
    }
    setIsLoading(false);
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const userId = emailInputRef.current.value.split("@")[0];
    const interest = interestInputRef.current.getSelectedItems();
    console.log(interest);
    let userDetails = {};
    userDetails[userId] = {
      userConfig: {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        aadhar: aadharInputRef.current.value,
        phone: phoneInputRef.current.value,
        password: passwordInputRef.current.value,
        interest: interest,
        userKind:"fundProvider"
      },
    };
    const response = await fetch(
      "https://v2can-e55ef-default-rtdb.firebaseio.com/User.json",
      {
        method: "PATCH",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setIsSuccess(true);
   // history.push({ pathname: "/login" });
  }
  return (
    <Card className={classes.card}>
      <header>Venture Capitalist Verification</header>
      <div className={styles.input}>
        <form
          onSubmit={(event) => {
            formSubmitHandler(event);
          }}
        >
          <label htmlFor="name">Name(As in Aadhar)</label>
          <input id="name" type="text" ref={nameInputRef} />
          <label htmlFor="email">email</label>
          <input id="email" type="email" ref={emailInputRef} />
          <label htmlFor="aadhar">Aadhar Number</label>
          <input id="aadhar" type="text" ref={aadharInputRef} />
          <label htmlFor="phone">Phone Number(As in Aadhar)</label>
          <input id="phone" type="text" ref={phoneInputRef} />
          {props.showPasswordForm && (
            <>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" ref={passwordInputRef} />
              <label htmlFor="Interest">Interest</label>
              <Multiselect
                id="css_custom"
                placeholder="Choose from options"
                ref={interestInputRef}
                isObject={false}
                avoidHighlightFirstOption={true}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
                options={[
                  "Option 1",
                  "Option 2",
                  "Option 3",
                  "Option 4",
                  "Option 5",
                ]}
                style={{
                  chips: {
                    background: "#e8f0fe",
                    color: "#00545f",
                  },
                  inputField: {
                    margin: "0px",
                    padding:"3px"
                  },
                  optionContainer: {
                    // To change css for option container
                    borderRadius: "2px",
                  },
                  option: {
                    background: "#e8f0fe",
                    color: "#00545f",
                  },
                  multiselectContainer: {
                    color: "black",
                    borderRadius: "2px",
                  },
                  searchBox: {
                    borderColor: "#00545f",
                    borderRadius: "8px",
                  },
                }}
              />
              <Button type="submit" className={classes.button}>
                Submit
              </Button>
            </>
          )}
          {!props.isLoading && !props.showPasswordForm && (
            <Button type="button" className={classes.button} onClick={submitHandler}>
              Verify email and Aadhar
            </Button>
          )}
          {props.isLoading && <LoadingSpinner />}
        </form>
      </div>
    </Card>
  );
};
export default SelfFinanceDetailsForm;
