import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import CoinIcon from "../../../public/assets/svgs/coin.svg";
import LockIcon from "../../../public/assets/svgs/icons8-lock.svg";
import Link from "next/link";

function Collection({ collection, setIsOpenConfirm, setCollectionInfo }) {
  const router = useRouter();
  const onUnlockHandler = () => {
    setIsOpenConfirm(true);
    setCollectionInfo(collection?._id);
  };
  return (
    <div className="bg-white relative flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
      {!collection.owned ? (
        <div className="absolute top-2 left-2">
          <LockIcon className="w-5 h-5" />
        </div>
      ) : (
        ""
      )}
      <div className="grid place-items-center font-Londrina_Solid">
        <div className="py-2 w-20 sm:w-28">
          <Image
            src={collection?.contributor.photo}
            alt="image collection"
            width="0"
            height="0"
            sizes="100vw"
            className="mx-auto rounded-full w-16 sm:w-20"
          />
        </div>
        <div
          onClick={() => {
            router.push({
              path: "/FlashCards",
              query: `contributor=${collection?.contributor.name}`,
            });
          }}
          className="text-gray-800 text-lg sm:text-xl font-medium mt-2 cursor-pointer"
        >
          <p>{collection?.contributor.name}</p>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm">
          <p>As contributor</p>
        </div>
        <div>
          <div className="text-gray-700 mt-2 p-4">
            {collection?.categories.map((cate) => (
              <span
                key={cate}
                onClick={() => {
                  router.push({
                    pathname: "/FlashCards",
                    query: `tag=${cate}`,
                  });
                }}
                className="bg-teal-200 text-teal-800 text-xs lg:text-sm px-2 inline-block rounded-full uppercase font-semibold tracking-wide p-1 m-1 hover:bg-teal-500 hover:text-white cursor-pointer"
              >
                {cate}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {!collection?.owned ? (
            <>
              <button
                onClick={onUnlockHandler}
                className="bg-blue-500 py-2 px-4 sm:px-6 hover:bg-blue-600 text-white w-full sm:w-auto font-medium rounded-lg shadow-lg"
              >
                Unlock with
              </button>
              <div className="flex items-center px-2 sm:px-4">
                <CoinIcon className="w-6 h-6 fill-my-golden-color" />
                <span className="mx-1 text-lg">{collection?.price}</span>
              </div>
            </>
          ) : (
            <Link
              href={`/FlashCards/${collection?._id}`}
              className="bg-green-600 py-2 px-4 sm:px-6 text-white hover:bg-green-400 w-full sm:w-auto font-medium rounded-lg shadow-lg"
            >
              Learn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
