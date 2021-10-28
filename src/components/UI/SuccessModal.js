import Modal from "./Modal";
import style from "./OtpModal.module.css";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const SuccessModal = (props) => {
  const history = useHistory();
  const successModalHandler = () => {
    props.setIsSuccess(false);
    history.push({ pathname: "/login" });
  };

  return (
    <>
      <Modal className={style.modal}>
        <div>Account Creation Successful.Login to continue</div>
        <Button type="button" onClick={successModalHandler}>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default SuccessModal;
