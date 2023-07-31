import React, { useEffect, useState } from "react";
import Link from "next/link";
import CoinsIcon from "../../../public/assets/svgs/coins.svg";
import PowerIcon from "../../../public/assets/svgs/power.svg";
import XIcon from "../../../public/assets/svgs/X.svg";
import MenuIcon from "../../../public/assets/svgs/menu-burger.svg";
import Image from "next/image";

const NavLinks = ({ me, setIsOpen }) => {
  const logoutHandler = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Link
        onClick={() => {
          setIsOpen(false);
        }}
        href={"/FlashCards"}
        className="px-4 cursor-pointer hover:text-gray-700 text-xl"
      >
        All Collections
      </Link>
      <Link
        onClick={() => {
          setIsOpen(false);
        }}
        href={"/FlashCards?owned=true"}
        className="px-4 cursor-pointer hover:text-gray-700 text-xl"
      >
        Owned Collections
      </Link>

      <Link
        onClick={() => {
          setIsOpen(false);
        }}
        href="/KNGofWRD"
        className="px-4 cursor-pointer hover:text-gray-700 text-xl"
      >
        KNGofWRD
      </Link>

      <nav className=" hidden md:flex justify-center cursor-pointer px-3 py-1 ">
        <span className="flex justify-center">balance: {me?.balance}</span>
        <CoinsIcon className="w-5 h-5 fill-slate-900 ml-1" />
      </nav>
      <nav className="py-1 px-2 flex justify-center hover:text-gray-700 text-xl ">
        <PowerIcon
          onClick={logoutHandler}
          className="w-5 h-5 fill-slate-900 ml-1 cursor-pointer"
        />
      </nav>
    </>
  );
};

function Nav({ me }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed flex justify-center items-center w-full sm:w-3/4 z-40 top-2 left-1/2 -translate-x-1/2 font-Londrina_Solid bg-yellow-600 py-2 rounded-3xl bg-opacity-50 
      
      } `}
    >
      <div>
        <div className="hidden md:flex ">
          <div className="flex flex-wrap justify-center select-none">
            <NavLinks setIsOpen={setIsOpen} me={me} />
          </div>
        </div>
        <div className="w-full md:hidden flex ml-auto justify-between">
          <Image
            alt="banner image"
            className="w-4/12 mx-3 object-cover rounded-2xl select-none cursor-pointer "
            width="0"
            height="0"
            sizes="100vw"
            src={require("../../../public/assets/images/logo-black.png")}
          />

          <div className="flex justify-center">
            <nav className="flex justify-content-center items-center cursor-pointer px-3 ">
              <span className="flex justify-center">
                balance: {me?.balance}
              </span>
              <CoinsIcon className="w-5 h-5 fill-slate-900 ml-1" />
            </nav>
            <button className="mx-4" onClick={toggleMenuHandler}>
              {isOpen ? (
                <>
                  <XIcon className="w-5 h-5" />
                </>
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div>
          {/* Your other components here... */}
          <div
            className={`flex flex-col items-center basis-full w-full transition-transform ${
              isOpen ? "" : "-translate-y-full"
            } duration-500`}
          >
            {isOpen && <NavLinks setIsOpen={setIsOpen} me={me} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
