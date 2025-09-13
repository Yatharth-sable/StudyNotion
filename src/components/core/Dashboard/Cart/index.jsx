import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div className=" mt-10 flex flex-col items-center justify-center bg-richblack-900 text-white text-lg font-inter px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">SHOPPING CART</h1>
      <p className="text-richblack-200 mb-8">
        {totalItems} Courses in Your Cart
      </p>

      {total > 0 ? (
        <div className="w-full max-w-maxContent bg-richblack-800 shadow-lg rounded-2xl p-6 space-y-6">
          {/* Cart Items */}
          <RenderCartCourses />

          {/* Divider + Total */}
          <div className="border-t border-richblack-600 pt-6">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          {/* Empty Cart Icon */}
          <AiOutlineShoppingCart className="w-24 h-24 text-yellow-100 mb-6" />

          {/* Empty Text */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-richblack-200">
            <span>
              Before proceed to checkout you must add some products to your
              shopping cart.
              <br />
              You will find a lot of interesting products on our "Shop" page.
            </span>
          </p>

          {/* Return to Shop Button */}
          <button className="mt-8 bg-yellow-100 hover:bg-blue-100 text-black font-semibold px-4 py-2 rounded-full transition"
          onClick={ () => navigate("/")}
          >
            Return To Shop
          </button>
        </div>
      )}
    </div>
  );
}
