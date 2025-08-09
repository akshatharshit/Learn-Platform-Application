import React, { useEffect, useRef } from "react";

export default function PayPalButton({ amount, courseName }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: courseName,
                amount: {
                  currency_code: "INR",
                  value: amount.toString(),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          alert(`✅ Payment successful, ${details.payer.name.given_name}!`);
          console.log("Payment details:", details);
          // 👉 Trigger course enrollment here
        },
        onError: (err) => {
          console.error("PayPal Checkout error:", err);
          alert("❌ Payment failed. Try again.");
        },
      })
      .render(paypalRef.current);
  }, [amount, courseName]);

  return <div ref={paypalRef}></div>;
}
