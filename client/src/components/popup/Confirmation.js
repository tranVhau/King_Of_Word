import React, { useState } from "react";
import Spinner from "../ui/Spinner";
import collectionAPIs from "@/services/api/collection.api";
import { useRouter } from "next/router";
import Notifies from "utils/notify.util";

function Confirmation({ isOpenConfirm, setIsOpenConfirm, collectionInfo, me }) {
  const router = useRouter();
  const onConfirmHandler = () => {
    setIsOpenConfirm(false);
  };

  const onPurchaseHandler = async (e) => {
    e.preventDefault();
    const fetchData = async (payload) => {
      try {
        const data = await collectionAPIs.purchaseCollection(payload);
        Notifies.success(data.data.message);
      } catch (error) {
        Notifies.error(error.response.data.message);
      }
    };
    const message = await fetchData({
      user_id: me._id,
      collection_id: collectionInfo,
    });
    setIsOpenConfirm(false);
    router.push("/FlashCards?owned=true");
  };

  return (
    <div className={`w-full ${!isOpenConfirm ? "hidden" : ""}`}>
      <div
        onClick={onConfirmHandler}
        className={
          "fixed top-0 left-0 w-full h-full bg-slate-900 opacity-20 z-50 cursor-pointer "
        }
      ></div>
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit flex justify-center items-center z-50 font-Londrina_Solid `}
      >
        <div className="p-6 w-full rounded-md shadow-xl  bg-white">
          <div className="flex justify-center flex-col">
            Do you want to unlock this collection?
            <div className="flex justify-around pt-4">
              <button
                onClick={() => {
                  setIsOpenConfirm(false);
                }}
                className="px-4 py-1 text-white bg-red-700 hover:bg-red-500 rounded "
              >
                No
              </button>
              <button
                onClick={onPurchaseHandler}
                className="px-4 py-1 text-white bg-green-700 hover:bg-green-500 rounded"
              >
                Yes
                {/* <Spinner style={"w-3 h-3"} /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
