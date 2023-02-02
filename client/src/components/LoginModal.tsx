import ReactModal from "react-modal";
import Login from "./login";
import "../styles/modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface modalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal = (props: modalProps) => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="loginModal"
      className="loginModal"
      overlayClassName="modal__overlay"
      ariaHideApp={false}
      style={customStyles}
    >
      <button id="close-btn" onClick={props.onRequestClose}>
        X
      </button>
      <Login />
      {/* <div>
        <h1>Login</h1>
        <p>
          This is a test Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Dolorem, molestias. Rem ut rerum sequi nihil, maxime, esse
          assumenda nisi provident quaerat recusandae quasi perspiciatis,
          consequatur ipsa vero animi earum similique!
        </p>
      </div> */}
    </ReactModal>
  );
};

export default LoginModal;
