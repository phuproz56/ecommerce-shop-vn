import React, { useState } from "react";
import "./FloatingMessageButton.css"; // You can style this component in a separate CSS file
import ChatButton from "./ChatButton";
import MessengerIcon from "./MessengerIcon";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";

const FloatingMessageButton = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className={`floating-message-button  `}>
      {isMessageOpen ? (
        <div className="message-content bg-none h-[450px] md:h-[350px]">
          {/* Include your message or content here */}
          <div className="md:justify-between md:items-center">
            <ChatButton />
          </div>

          <button className="justify-start items-start pb-[400px] md:pb-[300px]">
            <p className="text-[30px]" onClick={() => setIsMessageOpen(false)}>
              <IoIosCloseCircleOutline />
            </p>
          </button>
        </div>
      ) : null}
      <button
        className={`text-black  bg-blue-300 rounded-full p-[10px] hover:p-[15px] hover:transition-all hover:duration-350 hover:bg-green-300`}
        onClick={() => setIsMessageOpen(true)}
      >
        {/* <MessengerIcon /> */}
        <MdOutlineSupportAgent
          className={`text-[30px] ${isMessageOpen && "hidden"}`}
        />
      </button>
    </div>
  );
};

export default FloatingMessageButton;
