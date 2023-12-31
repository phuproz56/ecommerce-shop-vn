/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/Footer";
import Ratings from "../components/Ratings";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import Reviews from "../components/Reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import {
  get_product,
  check_review_customer,
  // recommendations,
} from "../store/reducers/homeReducer";
import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    product,
    relatedProducts,
    moreProducts,
    totalReview,
    check_review,
    loader,
  } = useSelector((state) => state.home);
  const { slug } = useParams();
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const [selectedOption, setSelectedOption] = useState(product?.color);

  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);

  const location = useLocation();

  // useEffect(() => {
  //   dispatch(recommendations(userInfo.id));
  // }, [userInfo.id, dispatch]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(
      check_review_customer({
        customerId: userInfo.id,
        productId: product._id,
      })
    );
    dispatch(get_product(slug));
    if (product && product?.size) {
      setSelectedSize(product.size[0]);
    }
  }, [dispatch, userInfo.id, product._id]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

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
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
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
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Số lượng không thể vượt quá kho!");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      product &&
      product.stock &&
      newQuantity <= product.stock
    ) {
      setQuantity(newQuantity);
    } else if (newQuantity >= product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(1);
    }
  };

  const add_card = () => {
    if (userInfo) {
      if (selectedSize === "") {
        setSize(true);
        toast.error("Vui lòng chọn size!");
      } else {
        dispatch(
          add_to_card({
            userId: userInfo.id,
            quantity,
            size: selectedSize,
            productId: product._id,
          })
        );
      }
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product?.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const [size, setSize] = useState(false);

  const buy = () => {
    if (userInfo) {
      if (selectedSize === "") {
        setSize(true);
        toast.error("Vui lòng chọn size!");
      } else {
        let price = 0;

        if (product.discount !== 0) {
          price =
            product.price -
            Math.floor((product.price * product.discount) / 100);
        } else {
          price = product.price;
        }
        const obj = [
          {
            sellerId: product.sellerId,
            shopName: product.shopName,
            price: quantity * (price - Math.floor(price * 5) / 100),
            products: [{ quantity, productInfo: product }],
            selectedSize,
            selectedOption,
          },
        ];
        navigate("/shipping", {
          state: {
            products: obj,
            price: price * quantity,
            shipping_fee: price > 500000 ? 0 : 50000,
            items: 1,
          },
        });
      }
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  return (
    <div>
      <Headers />

      <section className="bg-[url('http://localhost:3000/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-reqeat relative bg-left">
        <div className="absolute left-0 top-0 h-full w-full mx-auto bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Chi Tiết Sản Phẩm</h2>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-slate-100 py-5 mb-5 ">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start items-center text-md text-slate-600 w-full">
            <Link to="/">Trang Chủ</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <Link to="/">{product.category}</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>
      <section>
        {loader ? (
          <FadeLoader />
        ) : (
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
            <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8 ">
              <div>
                <div className="p-5 border">
                  <img
                    className="h-[500px] w-full"
                    src={image ? image : product.images?.[0]}
                    alt="product_image"
                  />
                </div>
                <div className="py-3">
                  {product.images && (
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      transitionDuration={500}
                      responsive={responsive}
                    >
                      {product.images.map((img, i) => {
                        return (
                          <div key={i} onClick={() => setImage(img)}>
                            <img
                              className="h-[120px] cursor-pointer"
                              src={img}
                              alt="img_new"
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
                  <h2>{product.name}</h2>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="flex text-xl">
                    <Ratings ratings={product.rating}></Ratings>
                  </div>
                  <span className="text-green-500">
                    ({totalReview} Đánh Giá)
                  </span>
                </div>
                <div className="text-2xl text-red-500 font-bold flex gap-3">
                  {product.discount ? (
                    <>
                      <h2 className="line-through text-slate-400">
                        {product.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </h2>
                      <h2>
                        {(
                          product.price -
                          Math.floor(product.price * product.discount) / 100
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                        (-{product.discount}%)
                      </h2>
                    </>
                  ) : (
                    <h2>Price: {product.price}</h2>
                  )}
                </div>
                <h2 className="text-slate-600 ">Giới tính: {product.sex}</h2>
                <h2 className="text-slate-600 ">Màu sắc: {product?.color}</h2>
                <div className="text-slate-600">
                  <p>{product.description}</p>
                </div>
                <div className="flex gap-3 pb-10 border-b">
                  {product.stock ? (
                    <>
                      <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                        <div
                          onClick={() => dec()}
                          className="px-6 cursor-pointer"
                        >
                          -
                        </div>

                        <input
                          type="text"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="px-[2px] text-center m-[2px]"
                        />

                        <div
                          onClick={() => inc()}
                          className="px-6 cursor-pointer"
                        >
                          +
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={add_card}
                          className="px-5 py-1 sm:h-full h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white"
                        >
                          Thêm Vào Giỏ Hàng
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div>
                    <div
                      onClick={add_wishlist}
                      className={`px-5 py-1 h-[50px] sm:h-full flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white
                  `}
                    >
                      Thêm Vào Yêu Thích
                    </div>
                  </div>
                </div>
                <div className="flex py-5 gap-5">
                  <div className="w-[200px] text-black font-bold text-xl flex flex-col gap-5">
                    <span>Sản phẩm có sẵn</span>
                    <span>Chia sẻ</span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <span
                      className={`text-${product.stock ? "green" : "red"}-500`}
                    >
                      {product.stock
                        ? `Tồn kho (${product.stock})`
                        : "Hết hàng"}
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
                  <h2>Chọn size:</h2>

                  {product?.size &&
                    product?.size.map((u) => (
                      <div
                        onClick={() => setSelectedSize(u) || setSize(false)}
                        className={``}
                      >
                        <input
                          readOnly
                          className={`flex w-[50px] p-2 text-center border font-bold cursor-pointer ${
                            selectedSize === u
                              ? "text-green-400 border-green-400 cursor-not-allowed"
                              : "hover:text-red-500 border hover:border-red-500"
                          }`}
                          name="size"
                          id=""
                          value={u}
                        />
                      </div>
                    ))}
                  {size ? (
                    <h2 className="text-red-500">
                      <b>vui lòng chọn size bạn mong muốn!!!</b>
                    </h2>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-3">
                  {product.stock ? (
                    <button
                      onClick={buy}
                      className="px-8 py-3 h-[50px] sm:h-full cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white"
                    >
                      Mua ngay
                    </button>
                  ) : (
                    ""
                  )}
                  {/* <button
                  onClick={() => chat_to_shop(product.sellerId)}
                  className="px-8 py-3 sm:h-full h-[50px] cursor-pointer hover:shadow-lg hover:shadow-orange-500/40 bg-orange-500 text-white block"
                >
                  Chat với Người Bán
                </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
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
                    Đánh Giá
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:text-white hover:bg-green-500 ${
                      state === "description"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Giới Thiệu SP
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2> Sản Phẩm Cùng Loại</h2>
                </div>
                <div className="flex flex-col gap-5 mt-3 border p-3">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link
                        to={`/product/details/${p.slug}`}
                        target="_blank"
                        key={i}
                        className="block"
                      >
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full"
                            src={p?.images[0]}
                            alt=""
                          />
                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {p.discount}%
                            </div>
                          )}
                        </div>
                        <h2 className="text-slate-600 py-1">{p.name}</h2>
                        <div className="flex gap-2">
                          <h2 className="text-[#6699ff] text-lg font-bold">
                            {p.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Ratings ratings={p.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="text-2xl py-8-text text-slate-600">
            Những sảm phẩm tương tự
          </h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p) => {
                return (
                  <SwiperSlide key={p._id}>
                    <Link
                      className="block"
                      to={`/product/details/${p.slug}`}
                      target="_blank"
                    >
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={p?.images[0]}
                            alt=""
                          />
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                        </div>

                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {p.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <h2 className="text-slate-600 text-lg font-semibold">
                          {p.name}
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                          <h2 className="text-[#6699ff] text-lg font-bold">
                            {p.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Ratings ratings={p.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="w-full flex justify-center items-center py-10">
              <div className="custom_bullet justify-center gap-3 !w-auto"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
