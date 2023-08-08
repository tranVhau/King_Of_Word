import React, { useState, useEffect, useContext, memo } from "react";
import StatisticTable from "../table/StatisticTable";
import LeaveIcon from "../../../public/assets/svgs/exit.svg";
import CoinsIcon from "../../../public/assets/svgs/coins.svg";
import { useRouter } from "next/router";
import { AppContext } from "@/context/context";

function calculatePoint(array) {
  return array?.reduce((accumulator, value) => accumulator + value.scored, 0);
}
const ScoreBoard = memo(function ScoreBoard({
  openScoreBoard,
  setOpenScoreBoard,
  me,
}) {
  const router = useRouter();
  const { scoreBoard } = useContext(AppContext);
  const [myResult, setMyResult] = useState(null);
  const [opponentResult, setOpponentResult] = useState(null);
  const myPoint = calculatePoint(myResult);
  const opponentPoint = calculatePoint(opponentResult);
  useEffect(() => {
    scoreBoard?.forEach((board) => {
      if (board[0].player == me.email) {
        setMyResult(board);
      } else {
        setOpponentResult(board);
      }
    });
  });

  const onLeaveHandler = () => {
    router.push("/FlashCards");
    setOpenScoreBoard(false);
  };

  return (
    <div
      className={` ${
        openScoreBoard ? "" : "hidden"
      } fixed top-0 left-0 right-0 z-50 w-full p-2  overflow-x-hidden overflow-y-auto md:inset-0 h-full ${
        myPoint >= opponentPoint ? "bg-my-softer-golden" : "bg-red-400"
      }`}
    >
      <div className="relative w-full h-full">
        <div
          className={`relative bg-white rounded-lg shadow bg-no-repeat bg-center bg-cover ${
            myPoint >= opponentPoint ? " bg-my-win-bg" : " bg-my-lose-bg"
          } `}
        >
          <div className="p-6 space-y-6">
            <div className=" relative h-screen flex flex-col justify-center font-Londrina_Solid select-none ">
              <div className="block absolute top-14 left-0 right-0 text-center text-5xl ">
                Scoreboard
              </div>
              <div className="grid grid-cols-12  place-items-center">
                <div className="col-span-5 text-2xl"></div>
                <div className="col-span-2">
                  {myPoint >= opponentPoint ? (
                    <p className="text-5xl text-yellow-400">WIN</p>
                  ) : (
                    <p className="text-5xl text-red-600">LOSE</p>
                  )}
                </div>
                <div className="col-span-5 text-2xl"></div>
                <div className="col-span-full flex flex-col justify-center items-center">
                  <StatisticTable
                    myResult={myResult}
                    opponentResult={opponentResult}
                  />
                  <div className="flex text-2xl ">
                    <span className="px-1">Reward:</span>
                    <span className="px-2">{` ${myPoint} - ${opponentPoint} = ${
                      myPoint - opponentPoint
                    }`}</span>
                    <span>
                      <CoinsIcon className="w-6 h-6 fill-my-golden-color" />
                    </span>
                  </div>
                  <div className="text-center text-4xl px-2 py-1 rounded-md  bg-yellow-300 hover:bg-yellow-400 hover:duration-500 ">
                    <button onClick={onLeaveHandler}>
                      <LeaveIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ScoreBoard;
