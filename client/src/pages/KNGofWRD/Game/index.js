import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Progress from "@/components/ui/Progress";
import AnswerBtn from "@/components/buttons/AnswerBtn";
import CountDown from "@/components/ui/CountDown";
import Notifies from "utils/notify.util";
import userAPIs from "@/services/api/user.api";
import { AppContext } from "@/context/context";

import ScoreBoard from "@/components/popup/ScoreBoard";

export async function getServerSideProps(context) {
  const reqCookie = context.req.headers.cookie;
  const data = await userAPIs.me(reqCookie);

  return { props: { me: data.data.data } };
}

function Game({ me }) {
  const {
    socket,
    roundAnswer,
    setRoundAnswer,
    start,
    setStart,
    setScoreBoard,
  } = useContext(AppContext);

  const [selectedButton, setSelectedButton] = useState(null);
  const [timeLeft, setTimeLeft] = useState(100);
  const [questionPackage, setQuestionPackage] = useState("");
  const [roundResult, setRoundResult] = useState("");
  const [roundPoint, setRoundPoint] = useState({ mePts: 0, opponentPts: 0 });
  const [openScoreBoard, setOpenScoreBoard] = useState(false);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit("game:start", {
      roomID: localStorage.getItem("roomID"),
      playerID: me.email,
    });

    function onCountDown(second) {
      setTimeLeft((prev) => (prev -= 20));
      if (second == 0) {
        setTimeLeft(100);
        socket.emit("game:next", { roomID: localStorage.getItem("roomID") });
        setStart(Date.now());
      }
    }

    function onGetQuestion(question) {
      setQuestionPackage(question);
    }

    function onRoundResult(result) {
      result.forEach((record) => {
        if (record.player == me.email) {
          roundPoint.mePts += record.scored;
        } else {
          roundPoint.opponentPts += record.scored;
        }
      });
      setRoundResult(result[0]);
    }

    function onGameFinish(payload) {
      setScoreBoard(payload);
      setOpenScoreBoard(true);
    }
    function onLeaveNotify(payload) {
      Notifies.notify(payload, "🏃‍♂️");
    }

    socket.on("room:leave_alert", onLeaveNotify);
    socket.on("room:count_down", onCountDown);
    socket.on("game:get_question", onGetQuestion);
    socket.on("round:result", onRoundResult);
    socket.on("game:finish", onGameFinish);

    return () => {
      socket.off("room:leave_alert", onLeaveNotify);
      socket.off("room:count_down", onCountDown);
      socket.off("game:get_question", onGetQuestion);
      socket.off("round:result", onRoundResult);
      socket.off("game:finish", onGameFinish);
    };
  }, []);

  const onAnswerHandler = (e) => {
    e.preventDefault();
    setSelectedButton(e.target.value);
    e.target.isSelected = true;
    setRoundAnswer({
      question_id: questionPackage?._id,
      answer: e.target.value,
      duration: Math.abs((start - Date.now()) / 1000).toFixed(2),
    });
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center font-Londrina_Solid bg-my-game-bg bg-center bg-contain bg-no-repeat">
      <Progress
        style={`fixed top-0 bg-my-golden-color p-2 rounded-sm ${
          timeLeft == 100 || timeLeft == 0 ? "hidden" : ""
        }`}
        progress={timeLeft}
      ></Progress>

      <div className="grid grid-cols-12 gap-4 justify-center w-full text-center text-xl  ">
        <div className="flex justify-center col-span-12">
          <Image
            alt="banner image"
            className="w-1/3 object-cover rounded-xl select-none "
            width="0"
            height="0"
            sizes="100vw"
            src={require("../../../../public/assets/images/logo-black.png")}
          />
        </div>

        <CountDown
          socket={socket}
          setSelectedButton={setSelectedButton}
          setRoundResult={setRoundResult}
          setRoundAnswer={setRoundAnswer}
          roundAnswer={roundAnswer}
        />

        <div className=" col-start-2 col-span-5   ">
          You
          <Progress
            style={`${roundPoint.mePts == 0 ? "" : "bg-green-400"}`}
            progress={(roundPoint.mePts / 40) * 100}
          >
            {`${roundPoint.mePts}/40`}
          </Progress>
        </div>
        <div className=" col-end col-span-5  ">
          Opponent
          <Progress
            style={`${roundPoint.opponentPts == 0 ? "" : "bg-red-400"}`}
            progress={(roundPoint.opponentPts / 40) * 100}
          >
            {`${roundPoint.opponentPts}/40`}
          </Progress>
        </div>
        <div className="relative col-start-2 col-span-10 bg-my-softer-golden p-8 rounded-lg ">
          <span className="absolute top-1 left-2 text-base text-slate-600">
            {questionPackage ? `# ${questionPackage?.no + 1}/5` : ""}
          </span>
          {`${
            questionPackage
              ? questionPackage?.question
              : "Preparing your questions"
          }`}
        </div>
        <div className="grid grid-cols-2 gap-2 col-start-2 col-span-10 ">
          {questionPackage ? (
            questionPackage?.answers.map((answer, index) => (
              <AnswerBtn
                key={index}
                value={index}
                style={`
                ${
                  selectedButton == index
                    ? "bg-slate-400 hover:bg-slate-300"
                    : ""
                }
                ${
                  roundResult?.correctAnswer == index
                    ? "bg-green-400 hover:bg-green-400"
                    : ""
                }
                ${
                  roundResult && roundResult?.correctAnswer != index
                    ? "bg-red-400 hover:bg-red-400"
                    : ""
                }
                ${
                  selectedButton == index && roundResult?.correctAnswer == index
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : ""
                }
              `}
                isCorrect={false}
                isSelected={false}
                onClick={onAnswerHandler}
              >
                {answer}
              </AnswerBtn>
            ))
          ) : (
            <>
              <AnswerBtn>?</AnswerBtn>
              <AnswerBtn>?</AnswerBtn>
              <AnswerBtn>?</AnswerBtn>
              <AnswerBtn>?</AnswerBtn>
            </>
          )}
        </div>
      </div>
      <div className="block absolute bottom-8 left-0 right-0 text-center opacity-50 pb-4 ">
        <p> Tips: Choose the best answer to the question</p>
      </div>
      <ScoreBoard
        openScoreBoard={openScoreBoard}
        setOpenScoreBoard={setOpenScoreBoard}
        me={me}
      />
    </div>
  );
}

export default Game;
