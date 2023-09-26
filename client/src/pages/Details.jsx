/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Headers from "../components/Headers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/Footer";
import Rating from "../components/Ratings";
import { AiFillGithub, AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
const Details = () => {
  const [image, setImage] = useState("");
  const images = [1, 2, 3, 4, 5, 6, 7];
  const [state, setState] = useState("reviews");
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
  };
  const discount = 5;
  const stock = 1;

  return (
    <div>
      <Headers />
      <section className="bg-[url('http://localhost:3000/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-reqeat relative bg-left">
        <div className="absolute left-0 top-0 h-full w-full mx-auto bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">shop.my</h2>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-slate-100 py-5 mb-5 ">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start items-center text-md text-slate-600 w-full">
            <Link to="/">Home</Link>
            <span className="pt-2">
              <MdOutlineKeyboardArrowRight />
            </span>
            <Link to="/">Sport</Link>
            <span className="pt-2">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span>Ao thun</span>
          </div>
        </div>
      </div>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8 ">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[500px] w-full"
                  src={
                    image
                      ? `http://localhost:3000/images/products/${image}.webp`
                      : `http://localhost:3000/images/products/${images[2]}.webp`
                  }
                  alt="product_image"
                />
              </div>
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    transitionDuration={500}
                    responsive={responsive}
                  >
                    {images.map((img, i) => {
                      return (
                        <div onClick={() => setImage(img)}>
                          <img
                            src={`http://localhost:3000/images/products/${img}.webp`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h2>Ao thun</h2>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Rating ratings={4.5}></Rating>
                </div>
                <span className="text-green-500">(23 reviews)</span>
              </div>
              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {discount ? (
                  <>
                    <h2 className="line-through">$500</h2>
                    <h2>
                      ${500 - Math.floor(500 * discount) / 100} (-{discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price: $500</h2>
                )}
              </div>
              <div className="text-slate-600">
                <p>
                  asdsadksadmxc,zxzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                </p>
              </div>
              <div className="flex gap-3 pb-10 border-b">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div className="px-6 cursor-pointer">-</div>
                      <div className="px-5"> 5</div>
                      <div className="px-6 cursor-pointer">+</div>
                    </div>
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white">
                        Add to cart
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                    <AiFillHeart />
                  </div>
                </div>
              </div>
              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availiably</span>
                  <span>Share on</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `In Stock(${stock})` : "Out of Stock"}
                  </span>
                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-cyan-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                        href="#"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-cyan-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                        href="#"
                      >
                        <AiOutlineTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-cyan-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                        href="#"
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-cyan-500 hover:text-white flex justify-center items-center bg-white rounded-full"
                        href="#"
                      >
                        <AiFillGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white">
                    Buy now
                  </button>
                ) : (
                  ""
                )}
                <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-orange-500/40 bg-orange-500 text-white">
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 px-5 hover:text-white hover:bg-green-500 ${
                      state === "reviews"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:text-white hover:bg-green-500 ${
                      state === "description"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div>
                <div>{state === "reviews" ? "reviews" : "description"}</div>
              </div>
            </div>
            <div className="w-[72%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Details;
