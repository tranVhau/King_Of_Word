import React from "react";
import CoinsIcon from "../../../public/assets/svgs/coins.svg";

function PricingCard(props) {
  return (
    <div
      value={props.value}
      className={`${
        props.choosenCard == props.value
          ? "border-4 border-green-600"
          : "border-2 border-slate-200"
      } max-w-xs p-4 bg-white rounded-lg shadow-lg w-full sm:w-72 md:mx-6 mx-2`}
    >
      <div
        className={`${
          props.choosenCard == props.value ? "text-green-700" : "text-black"
        }`}
      >
        <p className={`pt-4 text-xl sm:text-2xl font-semibold text-center`}>
          {props.priceCard?.name}
        </p>
        <p className="pb-4 text-2xl sm:text-4xl font-semibold text-center">
          <span className="text-base font-normal leading-loose text-center uppercase mr-1">
            $
          </span>
          {props.priceCard?.price}
          <span className="text-sm font-semibold leading-tight text-center text-black opacity-50">
            /{props.priceCard?.coin}
            <CoinsIcon className="inline ml-1 w-4 h-4 fill-yellow-500" />
          </span>
        </p>
      </div>
      <ul>
        <li className="py-4 text-sm sm:text-xs font-medium text-center text-black border-t border-gray-300">
          Extra {props.priceCard?.extra} coins
        </li>
        <li className="py-4 text-sm sm:text-xs font-medium text-center text-black border-t border-gray-300">
          {props.priceCard?.extra + props.priceCard?.coin} coins total
        </li>
      </ul>
      <div className="py-4 text-center w-full">
        <button
          onClick={props.onClick}
          type="button"
          value={props.value}
          className="py-2 px-4  bg-green-500 focus:ring-offset-indigo-200 text-white w-full sm:w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 rounded-lg"
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
