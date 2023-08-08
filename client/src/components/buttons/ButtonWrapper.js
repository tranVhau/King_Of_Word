import { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Spinner from "../ui/Spinner";
import Notifies from "utils/notify.util";
import { useRouter } from "next/router";
// This values are the props in the UI

function ButtonWrapper({ currency, showSpinner, choosenPackage, user_id }) {
  const router = useRouter();
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [showSpinner, choosenPackage]);

  return (
    <>
      {showSpinner && isPending && (
        <div className="w-full flex justify-center text-green-700">
          <span className="mr-2">Caculating</span>
          <Spinner style={"w-3 h-3"} />
        </div>
      )}
      <PayPalButtons
        // style={style}
        disabled={false}
        forceReRender={[choosenPackage, currency]}
        fundingSource={"paypal"}
        createOrder={async (data, actions) => {
          try {
            const response = await fetch(
              "http://localhost:8000/client/api/orders",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...choosenPackage, user_id }),
              }
            );

            if (!response.ok) {
              const data = await response.json();
              Notifies.error(data.message);
              return;
            }

            const details = await response.json();
            return details.id;
          } catch (error) {
            Notifies.error("unexpected error");
          }
        }}
        onApprove={async (data, actions) => {
          console.log(data);
          try {
            const response = await fetch(
              `http://localhost:8000/client/api/orders/${data.orderID}/capture`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: user_id,
                  ...choosenPackage,
                }),
              }
            );

            const details = await response.json();
            const errorDetail =
              Array.isArray(details.details) && details.details[0];

            if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            }

            if (errorDetail) {
              let msg = "Sorry, your transaction could not be processed.";
              msg += errorDetail.description
                ? " " + errorDetail.description
                : "";
              msg += details.debug_id ? " (" + details.debug_id + ")" : "";
              Notifies.error(msg);
            }

            Notifies.notify("Thank you for your purchase", "🎉");
            router.push("/FlashCards");
          } catch (error) {
            console.error(error);
            // Notifies.error(error);
            // Handle the error or display an appropriate error message to the user
          }
        }}
      />
    </>
  );
}

export default ButtonWrapper;
