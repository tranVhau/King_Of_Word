import React, { useState, useEffect } from "react";
import PricingCard from "../card/PricingCard";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "../buttons/ButtonWrapper";

function Pricing({ isClose, setClose, priceList, user_id }) {
  const [choosenCard, setChoosenCard] = useState(priceList[1]._id);
  const [choosenPackage, setChoosenPackage] = useState(priceList[1].price);
  useEffect(() => {
    const myPackage = priceList.filter((item) => item._id == choosenCard)[0];
    setChoosenPackage(myPackage);
  }, [choosenCard]);
  const onChoosenHandler = (e) => {
    setChoosenCard(e.target.value);
  };

  const onClosePurchaseHandler = () => {
    setClose(true);
  };

  return (
    <div className={`w-full`}>
      <div
        onClick={onClosePurchaseHandler}
        className={`fixed top-0 left-0 w-full h-full bg-slate-900 z-50 cursor-pointer ${
          !isClose ? "opacity-70" : "opacity-0 invisible"
        } duration-200`}
      ></div>
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit flex justify-center items-center z-50 font-Londrina_Solid ${
          !isClose ? "" : "translate-y-full invisible"
        } duration-200`}
      >
        <div className="pt-10 px-6 w-11/12 md:w-10/12 rounded-md shadow-xl bg-white">
          <div className="flex justify-center">
            {priceList.map((card) => (
              <PricingCard
                onClick={onChoosenHandler}
                key={card._id}
                priceCard={card}
                value={card._id}
                choosenCard={choosenCard}
              />
            ))}
          </div>
          <div className="block my-6 w-full ">
            <div className="max-w-sm mx-auto ">
              <PayPalScriptProvider
                options={{
                  clientId:
                    "ASib_kN0YpfyOTTrZOI0cjNIszkdXEZrgBI_qSNi1uoXTLSiBPTHE95nT_miWzEiChLQDlhUffenT3kL",
                  components: "buttons",
                  currency: "USD",
                }}
              >
                <ButtonWrapper
                  currency="USD"
                  showSpinner={true}
                  choosenPackage={choosenPackage}
                  user_id={user_id}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
