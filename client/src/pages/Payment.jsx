import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

const Payment = () => {
  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
            <div className="flex flex-wrap md:flex-col-reverse">
                <div className="w-7/12 md:w-full">
                    <div className="pr-2"></div>
                </div>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
