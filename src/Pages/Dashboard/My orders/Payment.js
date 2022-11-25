import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const data = useLoaderData();

  return (
    <div className="p-5 my-10 h-screen ">
      <h1 className="text-xl font-semibold">
        {/* Payment For {data.treatmentName} */}
      </h1>
      <p className="text-semibold">
        Please Pay <strong>{data.price}</strong>
      </p>
      <div className="my-4">
        <Elements stripe={stripePromise}>
          <CheckOutForm booking={data} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
