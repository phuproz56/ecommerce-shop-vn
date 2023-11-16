import React, { useEffect } from "react";
import { FacebookProvider, MessageUs, CustomChat } from "react-facebook";
const FacebookChat = () => {
  return (
    <FacebookProvider appId="2554144901412397" chatSupport>
      <CustomChat pageId="848695833931271" minimized={false} />
      123
    </FacebookProvider>
  );
};

export default FacebookChat;
