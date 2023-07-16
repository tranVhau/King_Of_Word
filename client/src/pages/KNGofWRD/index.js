import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import LeaveIcon from "../../../public/assets/svgs/exit.svg";
import userAPIs from "@/services/api/user.api";
import Spinner from "@/components/ui/Spinner";
import CoinsIcon from "../../../public/assets/svgs/coins.svg";
import LobbyCard from "@/components/card/Lobby";
import Progress from "@/components/ui/Progress";

import { SocketContext } from "../context";

import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "@/store/features/reducers/gameSlice";

export async function getServerSideProps(context) {
  const reqCookie = context.req.headers.cookie;
  const data = await userAPIs.me(reqCookie);

  return { props: { me: data.data.data } };
}

function Lobby({ me }) {
  const socket = useContext(SocketContext);
  // const dispatch = useDispatch();
  const router = useRouter();
  // const { roomInfo, isFindMatch } = useSelector((state) => state.game).roomInfo;
  const [roomInfo, setRoomInfo] = useState("");
  const [isFindMatch, setIsFindMatch] = useState(false);
  const [opponent, setOpponent] = useState({});
  const [progress, setProgress] = useState(0);

  const findMatchHandler = () => {
    socket.emit("room:create", {
      player: me.email,
      photo: me.photo,
      name: me.name,
    });
    socket.on("room:get", (payload) => {
      // dispatch(updateRoom({ isFindMatch: !payload.isFull, roomInfo: payload }));
      setIsFindMatch(!payload.isFull);
      setRoomInfo(payload);
      localStorage.setItem("roomID", payload.roomID);
    });
  };

  setTimeout(() => {
    // router.push("/KNGofWRD/Game");
  }, 3000);

  const leaveRoomHandler = () => {
    socket.emit("room:leave", { roomID: roomInfo.roomID, player: me.email });
    socket.on("room:get", (payload) => {
      // console.log("leave Room");
      // dispatch(updateRoom({ isFindMatch: payload.isFull, roomInfo: payload }));
      setIsFindMatch(payload.isFull);
      // setProgress(100);
    });
  };

  useEffect(() => {
    if (roomInfo) {
      if (roomInfo.players.length == 2) {
        const opponentInf = roomInfo.players.filter(
          (player) => player.playerID != me.email
        );
        setOpponent(...opponentInf);
        socket.on("room:count_down", (second) => {
          // let countDown = 0;
          console.log(second);

          setProgress((prev) => (prev += 25));

          // countDown += 18;
          if (second == 0) {
            setProgress(0);
            router.push("/KNGofWRD/Game");
          }
        });
      } else {
        setOpponent("");
      }
    }
  }, [roomInfo]);
  return (
    <div className=" relative h-screen flex flex-col justify-center font-Londrina_Solid select-none bg-my-lobby-bg bg-no-repeat bg-center bg-contain ">
      <Progress
        style={"fixed top-0 bg-my-golden-color"}
        progress={progress}
      ></Progress>
      <div className="block absolute top-14 left-0 right-0 text-center text-5xl ">
        LOBBY
      </div>
      <div className="grid grid-cols-12  place-items-center">
        <div className="col-span-5 text-2xl">
          <LobbyCard info={me} side={"YOU"} />
        </div>
        <div className="col-span-2">
          <p className="text-5xl text-red-600">VS</p>
        </div>
        <div className="col-span-5 text-2xl">
          <LobbyCard info={opponent} side={"OPPONENT"} />
        </div>
        <div className="col-span-full flex flex-col justify-center items-center">
          <div className="text-md py-2">
            <span className="mx-1">Your Balance: </span>
            <span className="mx-1">{me?.balance}</span>
            <CoinsIcon className="w-6 h-6 inline-block fill-my-golden-color mx-1 " />
          </div>
          {/* <div className="opacity-50 pb-4">
            <p>you must at least 40 coins to play</p>
            <span className="loading loading-spinner text-warning"></span>
          </div> */}
          <div className="box-border">
            {!isFindMatch ? (
              <button
                onClick={findMatchHandler}
                className="bg-my-golden-color px-6 py-3 rounded text-3xl hover:bg-my-softer-golden active:text-gray-500"
              >
                FIND MATCH
              </button>
            ) : (
              <button
                onClick={findMatchHandler}
                className="bg-my-golden-color  px-6 py-3 rounded text-3xl hover:bg-my-softer-golden active:text-gray-500"
              >
                FINDING MATCH
                <Spinner style={" mx-2 border-6 "} />
              </button>
            )}
          </div>
          <p>or</p>
          <div className="text-center text-4xl px-2 py-1 rounded-md  bg-yellow-300 hover:bg-yellow-400 hover:duration-500 ">
            <button onClick={leaveRoomHandler}>
              <LeaveIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="block absolute bottom-8 left-0 right-0 text-center  pb-4 ">
        <p className="opacity-70">
          Tips: You must have at least{" "}
          <span className="text-yellow-400 opacity-100"> 60 coins</span> to play
        </p>
      </div>
    </div>
  );
}

export default Lobby;
