import React, { useState } from "react";
import "./FloatingMessageButton.css"; // You can style this component in a separate CSS file
import ChatButton from "./ChatButton";
import MessengerIcon from "./MessengerIcon";
const FloatingMessageButton = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMessageOpen(!isMessageOpen);
  };

  return (
    <div className={`floating-message-button ${isMessageOpen ? "bg-none" : "bg-blue-300"}`}>
      {isMessageOpen ? (
        <div className="message-content">
          {/* Include your message or content here */}
          <ChatButton />
        </div>
      ) : null}
      <button className={`text-black `} onClick={handleButtonClick}>
        <MessengerIcon style={{ color: "blue", width: "50px" }} />
      </button>
    </div>
  );
};

export default FloatingMessageButton;
