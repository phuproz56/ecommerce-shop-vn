import React, { useState } from "react";
import "./FloatingMessageButton.css"; // You can style this component in a separate CSS file
import ChatButton from "./ChatButton";
import MessengerIcon from "./MessengerIcon";
import { IoIosCloseCircleOutline } from "react-icons/io";

const FloatingMessageButton = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div
      className={`floating-message-button ${
        isMessageOpen ? "bg-none" : "bg-blue-300"
      }`}
    >
      {isMessageOpen ? (
        <div className="message-content">
          {/* Include your message or content here */}
          <ChatButton />
          <button className="justify-start items-start pb-[400px]">
            <p
              className="text-lg"
              onClick={() => setIsMessageOpen(false)}
            >
              <IoIosCloseCircleOutline />
            </p>
          </button>
        </div>
      ) : null}
      <button className={`text-black `} onClick={() => setIsMessageOpen(true)}>
        <MessengerIcon />
      </button>
    </div>
  );
};

export default FloatingMessageButton;
