import React from "react";
import Image from "next/image";
import GoogleButton from "@/components/buttons/GoogleButton";

import Sparticles from "../components/ui/Particles";

function Home() {
  // const [roomInfo, setRoomInfo] = useState("");

  // useEffect(() => {
  //   socket.on("room:get", (payload) => {
  //     setRoomInfo(payload);
  //   });
  // }, []);

  const googleLoginHandler = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <Image
          alt="banner image"
          className="w-1/3 object-cover rounded-3xl select-none "
          width="0"
          height="0"
          sizes="100vw"
          src={require("../../public/assets/images/logo_red_trans.png")}
        ></Image>{" "}
        <div className="p-10">
          <GoogleButton onClick={googleLoginHandler} />
        </div>
      </div>
      <Sparticles />
    </>
  );
}

export default Home;
