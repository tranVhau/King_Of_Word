import React, { useEffect, useState } from "react";
import Collection from "@/components/card/Collection";
import Link from "next/link";
import CoinIcon from "../../../public/assets/svgs/coin.svg";
import Particles from "@/components/ui/Particles";
import collectionAPIs from "@/services/api/collection.api";
import userAPIs from "@/services/api/user.api";

import Nav from "@/components/layout/Nav";
import Pricing from "@/components/popup/Pricing";
import Confirmation from "@/components/popup/Confirmation";

export const getServerSideProps = async (context) => {
  const reqCookie = context.req.headers.cookie;
  const query = context.query;
  const me = await userAPIs.me(reqCookie);
  const collections = await collectionAPIs.getAllCollections(reqCookie, query);
  const priceList = await collectionAPIs.getPriceList(reqCookie);
  return {
    props: {
      collections: collections.data.data,
      priceList: priceList.data.data,
      me: me.data.data,
    },
  };
};

function FlashCards({ collections, me, priceList }) {
  const [isClose, setClose] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("isAd")) {
      setTimeout(() => {
        setClose(false);
        localStorage.setItem("isAd", true);
      }, 3000);
    }
  }, []);
  return (
    <div>
      <Nav me={me} />
      {/* <nav className="fixed w-full sm:w-3/4 z-40 top-2 left-1/2 -translate-x-1/2 font-Londrina_Solid bg-yellow-600 py-3 rounded-3xl bg-opacity-50">
        <div className="flex flex-wrap justify-center select-none ">
          <Link
            href={"/FlashCards"}
            className="px-6 cursor-pointer hover:text-gray-700 text-xl"
          >
            All Collections
          </Link>
          <Link
            href={"/FlashCards?owned=true"}
            className="px-6 cursor-pointer hover:text-gray-700 text-xl"
          >
            Owned Collections
          </Link>
          <nav className="px-6 cursor-pointer hover:text-gray-700 text-xl">
            <Link href="/KNGofWRD">KNGofWRD</Link>
          </nav>

          <nav className="flex justify-center cursor-pointer px-3 py-1 ">
            <span className="flex justify-center">balance: {me?.balance}</span>
            <CoinsIcon className="w-5 h-5 fill-slate-900 ml-1" />
          </nav>
          <nav className="py-1 px-2 flex justify-center hover:text-gray-700 text-xl ">
            <PowerIcon className="w-5 h-5 fill-slate-900 ml-1 cursor-pointer" />
          </nav>
        </div>
      </nav> */}
      {collections[0] ? (
        <div className="px-4 sm:px-10 sm:py-24 md:px-16 lg:px-16 xl:px-32 py-24">
          <div className="grid sm:grid-cols-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-2 lg:gap-6">
            {collections.map((collection) => (
              <Collection
                key={collection._id}
                collection={collection}
                setIsOpenConfirm={setIsOpenConfirm}
                setCollectionInfo={setCollectionInfo}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="relative px-4 sm:px-44 py-20">
            <div className="font-Londrina_Solid text-2xl text-center">
              Emptier than a banker`s heart 💔
            </div>
            <Link
              href={"/FlashCards"}
              className="font-Londrina_Solid text-lg cursor-pointer text-blue-700 block mt-4 sm:inline"
            >
              See all collections
            </Link>
          </div>
        </div>
      )}
      <Pricing
        isClose={isClose}
        setClose={setClose}
        priceList={priceList}
        user_id={me?._id}
      />
      <Confirmation
        isOpenConfirm={isOpenConfirm}
        setIsOpenConfirm={setIsOpenConfirm}
        collectionInfo={collectionInfo}
        me={me}
      />
      <CoinIcon
        onClick={() => {
          setClose(false);
        }}
        className="fixed hover:animate-spin right-5 bottom-5 w-10 h-10 fill-slate-800 ml-1 cursor-pointer hover:fill-yellow-600 duration-100"
      />
      <Particles color={"#FFE55C"} />
    </div>
  );
}

export default FlashCards;
