import React from "react";
import Image from "next/image";

function LobbyCard({ info, side }) {
  return (
    <div className=" text-center py-5">
      <div>
        <p className="text-3xl">{side}</p>
      </div>
      <div>
        <Image
          src={info?.photo ? info.photo : "/assets/images/unknown_2.png"}
          alt="image collection"
          width="0"
          height="0"
          sizes="100vw"
          className="mx-auto m-4 w-16 rounded-full"
        ></Image>

        <p>{info?.name ? info.name : "unknown"}</p>
      </div>
    </div>
  );
}

export default LobbyCard;
