import { studentEndpoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzpyLogo from "../../assets/company logo/rzpyLogo.png";
import { setPaymentLoading } from "../../Slice/courseSlice";
import { resetCart } from "../../Slice/cartSlice";
const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading,,,");
  try {
    // Load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay sdk failed to load");
      return;
    }

    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(orderResponse)
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message || "Could not initiate order");
    }

    // options
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyNotion",
      description: "Thank You for purchasing the course",
      image: rzpyLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // send successful mail
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        // verfiy payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    
     const paymentObject = new window.Razorpay(options);
     paymentObject.open();
     paymentObject.on("payment.failed",function(response){
        toast.error("oops payment failed")
        console.log(response.error);
     })


  } catch (err) {
    console.log("Payment api error", err);
    toast.error("Could not make payment");
  } finally {
    toast.dismiss(toastId);
  }
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    console.log("Payment Success email error", err);
  }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful , You are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (err) {
    console.log("Payment Success email error", err);
    toast.error("Could not verify payment");
  } finally {
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  }
}
