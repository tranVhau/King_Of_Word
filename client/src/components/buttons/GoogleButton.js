import React from "react";
import Image from "next/image";
import Link from "next/link";

function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
    >
      <Image
        className="w-6 h-6"
        src={require("../../../public/assets/images/google.png")}
        loading="lazy"
        alt="google logo"
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleButton;
