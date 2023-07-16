import React from "react";
import Collection from "@/components/card/Collection";
import Link from "next/link";
import CoinsIcon from "../../../public/assets/svgs/coin.svg";
import Particles from "@/components/ui/Particles";

function FlashCards() {
  return (
    <div>
      <nav className="fixed w-3/4 z-40 top-2 left-1/2 -translate-x-1/2 font-Londrina_Solid bg-yellow-600 py-3 rounded-3xl bg-opacity-50">
        <div className="flex justify-center select-none ">
          <nav className="px-6 cursor-pointer hover:text-gray-700 text-xl">
            All Collections
          </nav>
          <nav className="px-6 cursor-pointer hover:text-gray-700 text-xl">
            Owned Collections
          </nav>
          <nav className="px-6 cursor-pointer hover:text-gray-700 text-xl">
            <Link href="/KNGofWRD">KNGofWRD</Link>
          </nav>
          <nav className="flex justify-center cursor-pointer px-3 py-1 ">
            <span>balance: 300</span>
            <CoinsIcon className="w-5 h-5 fill-slate-900 ml-1" />
          </nav>
        </div>
      </nav>
      <div className="px-44 py-20">
        <div className="grid grid-cols-4 gap-y-8 place-items-center">
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
        </div>
      </div>
      <Particles color={"#FFE55C"} />
    </div>
  );
}

export default FlashCards;
