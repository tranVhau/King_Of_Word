import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CoinIcon from "../../../public/assets/svgs/coin.svg";
import LockIcon from "../../../public/assets/svgs/icons8-lock.svg";

function Collection() {
  const [isLocked, setLock] = useState(true);
  return (
    <div className="bg-white  relative flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-64">
      {isLocked ? (
        <div className="absolute top-2 left-2 ">
          <LockIcon className="w-5 h-5 " />
        </div>
      ) : (
        ""
      )}
      <div className="  grid place-items-center font-Londrina_Solid ">
        <div className=" py-2 w-16">
          <Image
            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
            alt="image collection"
            width="0"
            height="0"
            sizes="100vw"
            className="mx-auto rounded-full py-2 w-16"
          />
        </div>
        <div className="text-gray-800 text-2xl font-medium mt-2">
          <p className="">Tran Hau</p>
        </div>
        <div className="text-gray-400 text-xs">
          <p>As contributor</p>
        </div>
        <div>
          <div className=" text-gray-700 mt-2 p-4 h-20">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer">
              30 words
            </span>
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer">
              toeic
            </span>
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer">
              Ielts
            </span>
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer">
              Ielts
            </span>
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer">
              Ielts
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {isLocked ? (
            <>
              <button className="bg-blue-500 py-2 px-4 hover:bg-blue-600 text-white w-full font-medium rounded-lg shadow-lg">
                Unlock with
              </button>
              <div className="flex items-center px-5">
                <CoinIcon className="w-6 h-6 fill-my-golden-color " />
                <span className="mx-1 text-lg">300</span>
              </div>
            </>
          ) : (
            <button className="bg-blue-500 py-2 px-4 hover:bg-blue-600 text-white w-full font-medium rounded-lg shadow-lg">
              Learn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
