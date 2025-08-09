import axios from "axios";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";

// ✅ 1. Create PayPal Order
export const createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    // Get Access Token
    const tokenRes = await axios({
      method: "post",
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      data: "grant_type=client_credentials",
    });

    const accessToken = tokenRes.data.access_token;

    // Create order
    const orderRes = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ orderId: orderRes.data.id });
  } catch (err) {
    console.error("Create PayPal Order Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to create PayPal order" });
  }
};

// ✅ 2. Verify PayPal Payment
export const verifyPayPalPayment = async (req, res) => {
  const { orderId, courseId, userId, userName, userEmail } = req.body;

  try {
    // Get Access Token
    const authRes = await axios({
      method: "post",
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      data: "grant_type=client_credentials",
    });

    const accessToken = authRes.data.access_token;

    // Verify Order
    const orderRes = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const order = orderRes.data;

    if (order.status !== "COMPLETED") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const payer = order.payer;
    const purchase = order.purchase_units[0];

    // Save Payment
    const payment = await Payment.create({
      orderId,
      courseId,
      payerId: payer.payer_id,
      payerEmail: payer.email_address,
      amount: parseFloat(purchase.amount.value),
      currency: purchase.amount.currency_code,
      status: order.status,
    });

    // Enroll Student
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const isAlreadyEnrolled = course.students.some(
      (s) => String(s.studentId) === String(userId)
    );

    if (!isAlreadyEnrolled) {
      course.students.push({
        studentId: userId,
        studentName: userName,
        studentEmail: userEmail,
      });
      await course.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and enrolled",
      payment,
    });
  } catch (err) {
    console.error("Verify PayPal Error:", err.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
};
