import { React, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./UserKindMain.module.css";
import styles from "./EntDetailsForm.module.css";
import Multiselect from "multiselect-react-dropdown";
//import { useState } from "react/cjs/react.development";
import LoadingSpinner from "../UI/LoadingSpinner";

//import { useHistory } from "react-router-dom";
import { VCList } from "../Helper/FundProviderListHelper";

const VentureCapDetailsForm = (props) => {
  //const history = useHistory();
  const firmNameInputRef = useRef("");
  const branchInputRef = useRef("");
  const firmPhoneInputRef = useRef("");
  const pocNameInputRef = useRef("");
  const pocEmailInputRef = useRef("");
  const pocPhoneInputRef = useRef("");
  const passwordInputRef = useRef("");
  const interestInputRef = useRef("");

  const { setIsLoading, setShowPasswordForm, setErrorConfig, setOtpConfig,setIsSuccess } =
    props;
  async function formSubmitHandler(event) {
    event.preventDefault();
    const userId = firmNameInputRef.current.getSelectedItems()[0].email.split("@")[0];
    const interest = interestInputRef.current.getSelectedItems();
    let enteredDetails = {};
    enteredDetails[userId] = {
      userConfig: {
        firmName: firmNameInputRef.current.getSelectedItems()[0].name,
        email: firmNameInputRef.current.getSelectedItems()[0].email,
        branch: branchInputRef.current.value,
        firmPhone: firmPhoneInputRef.current.value,
        pocName: pocNameInputRef.current.value,
        pocEmail: pocEmailInputRef.current.value,
        pocPhone: pocPhoneInputRef.current.value,
        password: passwordInputRef.current.value,
        interest: interest,
        userKind: "fundProvider"
      },
    };
    const response = await fetch(
      "https://v2can-e55ef-default-rtdb.firebaseio.com/User.json",
      {
        method: "PATCH",
        body: JSON.stringify(enteredDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setIsSuccess(true);
    //history.push({ pathname: "/login" });
  }
  function submitHandler(event) {
    event.preventDefault();
    let enteredDetails = {
      firmName: firmNameInputRef.current.value,
      branch: branchInputRef.current.value,
      firmPhone: firmPhoneInputRef.current.value,
      // pocName: pocNameInputRef.current.value,
      // pocEmail: pocEmailInputRef.current.value,
      // pocPhone: pocPhoneInputRef.current.value,
      // password: passwordInputRef.current.value,
      // interest: interestInputRef.current.value,
    };

    console.log(enteredDetails);
    bankSigupVerification(enteredDetails);
  }

  async function bankSigupVerification(userDetails) {
    console.log(userDetails);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://v2can-e55ef-default-rtdb.firebaseio.com/User.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const selectedVC = firmNameInputRef.current.getSelectedItems()[0];
      const vCUserName = selectedVC.email.split("@")[0]
      
      console.log(selectedVC);

      if(data[vCUserName]) {
        setErrorConfig({
          isError: true,
          errorMessage: "An Account for this firm already exists"
        })
      }
      else {
        //const otp = sendEmail(firmNameInputRef.current.getSelectedItems(), bankEmail);
        setShowPasswordForm(true);
        const otp = "123456";
        setOtpConfig({
          showOtpModal: true,
          otp: otp,
        });
      }
    } catch (errornew) {
      setErrorConfig({
        isError: true,
        errorMessage: errornew.message || "Something went wrong..",
      });
    }
    setIsLoading(false);
  }
  return (
    <Card className={classes.card}>
      <header>Firm Details</header>
      <div className={styles.input}>
        <form
          onSubmit={(event) => {
            formSubmitHandler(event);
          }}
        >
          <label htmlFor="firmname">Firm Name</label>
          <Multiselect
            id="css_custom"
            placeholder="Select Firm name"
            ref={firmNameInputRef}
            isObject={true}
            singleSelect={true}
            avoidHighlightFirstOption={true}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            options={VCList}
            displayValue="name"
            style={{
              chips: {
                background: "white",
                width: "100%",
                color: "#00545f",
              },
              inputField: {
                margin: "0px",
                padding: "4px",
              },
              optionContainer: {
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
          
          <label htmlFor="firmphone">Firm Phone Number</label>
          <input id="phone" type="text" ref={firmPhoneInputRef} />
          {props.showPasswordForm && (
            <><header>Branch Details</header>
            <label htmlFor="branch">Branch</label>
              <input id="branch" type="branch" ref={branchInputRef} />
              
              <label htmlFor="pocname">Name</label>
              <input id="pocname" type="pocname" ref={pocNameInputRef} />
              <label htmlFor="pocemail">Email</label>
              <input id="pocemail" type="pocemail" ref={pocEmailInputRef} />
              <label htmlFor="pocphone">Phone</label>
              <input id="pocphone" type="pocphone" ref={pocPhoneInputRef} />
              <label htmlFor="password">Password</label>
              <input id="password" type="password" ref={passwordInputRef} />
              <label htmlFor="Interest">Interest</label>
              <Multiselect
                id="css_custom"
                placeholder="Choose from options"
                avoidHighlightFirstOption={true}
                ref={interestInputRef}
                isObject={false}
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
                    padding: "3px",
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
            <Button
              type="button"
              className={classes.button}
              onClick={submitHandler}
            >
              Email Verification
            </Button>
          )}
          {props.isLoading && <LoadingSpinner />}
        </form>
      </div>
    </Card>
  );
};
export default VentureCapDetailsForm;
