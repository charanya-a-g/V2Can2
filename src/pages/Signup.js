import { useState } from "react";
import UserKindMain from "../components/Signup/UserKindMain";
import EntAadharDetailsForm from "../components/Signup/EntAadharDetailsForm";
import FundProvSelectionForm from "../components/Signup/FundProvSelectionForm";
//import PasswordInterestDetailsForm from "../components/Signup/PasswordInterestDetails";
import ErrorModal from "../components/UI/ErrorModal";
import OtpModal from "../components/UI/OtpModal";
import VentureCapDetailsForm from "../components/Signup/VentureCapDetailsForm";
import BankDetailsForm from "../components/Signup/BankDetailsForm";
import SelfFinanceDetailsForm from "../components/Signup/SelfFinanceDetailsForm";
import { sendEmail } from "../components/Helper/EmailHelper";
import SuccessModal from "../components/UI/SuccessModal";

const Signup = () => {
  const [showUserKind, setShowUserKind] = useState(true);
  const [showfPKind, setShowfPKind] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userKind, setUserKind] = useState("");
  const [fpKind, setfPKind] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess,setIsSuccess]=useState(false);
  const [errorConfig, setErrorConfig] = useState({
    isError: false,
    errorMessage: "",
  });
  const [otpConfig, setOtpConfig] = useState({
    otp: "",
    showOtpModal: false,
  });

  const onClick = (userType) => {
    console.log("ent clicked");
    setShowUserKind(false);
    setUserKind(userType);
  };

  const errorHandler = () => {
    setErrorConfig({ isError: false, errorMessage: "" });
  };

  async function entrepreneurSigupVerification(userDetails) {
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
        if (existingUserAadar.gender !== "F") {
          validationResults.isError = true;
          validationResults.errorMessage = "You are not a valid user";
        }
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

  const onFPTypeClick = (fPType) => {
    setShowfPKind(false);
    setfPKind(fPType);
  };

  return (
    <div>
      {errorConfig.isError && (
        <ErrorModal
          title="Verification Failed"
          message={errorConfig.errorMessage}
          onConfirm={errorHandler}
        />
      )}
      {isSuccess&&(<SuccessModal setIsSuccess={setIsSuccess}/>)}
      {otpConfig.showOtpModal && (
        <OtpModal otpConfig={otpConfig} setOtpConfig={setOtpConfig} />
      )}
      {showUserKind ? (
        <UserKindMain onClickHandler={onClick} />
      ) : userKind === "entrepreneur" ? (
        <div>
          <EntAadharDetailsForm
            entrepreneurSigupVerification={entrepreneurSigupVerification}
            isLoading={isLoading}
            showPasswordForm={showPasswordForm}
            setIsSuccess={setIsSuccess}
          />
        </div>
      ) : showfPKind ? (
        <FundProvSelectionForm onClickHandler={onFPTypeClick} />
      ) : fpKind === "bank" ? (
        <BankDetailsForm
          setIsLoading={setIsLoading}
          setShowPasswordForm={setShowPasswordForm}
          setErrorConfig={setErrorConfig}
          setOtpConfig={setOtpConfig}
          showPasswordForm={showPasswordForm}
          isLoading={isLoading}
          setIsSuccess={setIsSuccess}

        />
      ) : fpKind === "ventureCapitalist" ? (
        <VentureCapDetailsForm
          setIsLoading={setIsLoading}
          setShowPasswordForm={setShowPasswordForm}
          setErrorConfig={setErrorConfig}
          setOtpConfig={setOtpConfig}
          showPasswordForm={showPasswordForm}
          isLoading={isLoading}
          setIsSuccess={setIsSuccess}
        />
      ) : (
        <SelfFinanceDetailsForm
          setIsLoading={setIsLoading}
          setShowPasswordForm={setShowPasswordForm}
          setErrorConfig={setErrorConfig}
          setOtpConfig={setOtpConfig}
          showPasswordForm={showPasswordForm}
          isLoading={isLoading}
          setIsSuccess={setIsSuccess}
        />
      )}
    </div>
  );
};
export default Signup;
