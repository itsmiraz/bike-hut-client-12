import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const data = useLoaderData();
    console.log(data)
  return (
    <div className="p-5 mx-4 bg-white rounded-lg shadow-lg my-10 ">
      <h1 className="text-xl font-semibold">
              Confirm Payment for { data.bikeModel
}
      </h1>
      <p className="text-semibold">
        Please Pay <strong>{data.bikePrice}</strong> tk
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
