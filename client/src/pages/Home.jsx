import React, { useEffect } from "react";
import Headers from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_categorys, get_products } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const {
    categorys,
    products,
    latest_products,
    topRated_products,
    discount_products,
  } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_categorys());
    dispatch(get_products());
  }, [dispatch]);
  return (
    <div className="w-full">
      <Headers categorys={categorys} />
      <Banner />
      <div className="my-4">
        <Categorys categorys={categorys} />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latest_products} />
            </div>
            <div className="overflow-hidden">
              <Products
                title="Top Rated Product"
                products={topRated_products}
              />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" products={discount_products} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
