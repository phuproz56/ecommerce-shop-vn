// components/FacebookChat.js
import React, { useEffect } from "react";

const FacebookChat = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v12.0", // Sử dụng phiên bản mới nhất của API Facebook
      });
    };

    // Nếu bạn đã thêm đoạn mã SDK ở bước 2, thì script này không cần thiết
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return <div className="fb-customerchat" page_id="61553589753844"></div>;
};

export default FacebookChat;
