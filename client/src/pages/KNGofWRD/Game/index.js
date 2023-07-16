import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Progress from "@/components/ui/Progress";
import AnswerBtn from "@/components/ui/AnswerBtn";
import userAPIs from "@/services/api/user.api";
import { SocketContext } from "@/pages/context";
// import { io } from "socket.io-client";
// const socket = io(process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL);

export async function getServerSideProps(context) {
  const reqCookie = context.req.headers.cookie;
  const data = await userAPIs.me(reqCookie);

  return { props: { me: data.data.data } };
}

function Game({ me }) {
  const socket = useContext(SocketContext);
  const [selectedButton, setSelectedButton] = useState(null);
  const [timeLeft, setTimeLeft] = useState(100);
  const [questionPackage, setQuestionPackage] = useState("");

  const [timeName, setTimeName] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    socket.emit("game:start", {
      roomID: localStorage.getItem("roomID"),
      player: me.email,
    });

    socket.on("room:count_down", (second) => {
      setTimeLeft((prev) => (prev -= 20));
      if (second == 0) {
        setTimeLeft(100);
        socket.emit("game:next", { roomID: localStorage.getItem("roomID") });
      }
    });

    socket.on("room:answer_time", (second) => {
      setTimeName("Answer Time");

      setTime(second);
      if (second == 0) {
        socket.emit("round:answer", {
          answer: "dummy",
          duration: "dummy",
          roomID: localStorage.getItem("roomID"),
        });
      }
    });

    socket.on("room:break_time", (second) => {
      setTimeName("Break Time");
      setTime(second);
      if (second == 0) {
        socket.emit("game:next", { roomID: localStorage.getItem("roomID") });
      }
    });

    socket.on("game:get_question", (question) => {
      setQuestionPackage(question);
    });

    return () => {
      socket.off("room:break_time");
      socket.off("room:answer_time");
    };
  }, []);

  const onAnswerHandler = (e) => {
    e.preventDefault();
    setSelectedButton(e.target.value);
    e.target.isSelected = true;
    socket.emit("round:answer", {
      question_id: questionPackage?._id,
      answer: e.target.value,
      roomID: localStorage.getItem("roomID"),
    });
  };
  // console.log(questionPackage);
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
        <div className="flex justify-center col-span-12">
          <span
            className={`mx-4 ${
              timeName != "Break Time" ? "text-red-600" : "text-green-600"
            }`}
          >
            {timeName}
          </span>{" "}
          <span>{time >= 0 ? time + "s" : "  "}</span>
        </div>

        <div className=" col-start-2 col-span-5   ">
          You
          <Progress style={"bg-green-400"} progress={20}>
            20/60 pts
          </Progress>
        </div>
        <div className=" col-end col-span-5  ">
          Opponent
          <Progress style={"bg-red-400"} progress={50}>
            20/60 pts
          </Progress>
        </div>
        <div className="relative col-start-2 col-span-10 bg-my-softer-golden p-8 rounded-lg ">
          <span className="absolute top-1 left-2 text-base text-slate-600">
            {questionPackage ? `# ${questionPackage?.no + 1}/5` : ""}
          </span>
          {`${
            questionPackage
              ? questionPackage?.question
              : "Loading your question"
          }`}
        </div>
        <div className="grid grid-cols-2 gap-2 col-start-2 col-span-10 ">
          {questionPackage ? (
            questionPackage?.answers.map((answer, index) => (
              <AnswerBtn
                key={index}
                value={index}
                style={
                  selectedButton == index
                    ? "bg-slate-400 hover:bg-slate-300"
                    : ""
                }
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
          {/* <AnswerBtn
            style={selectedButton == 1 ? "bg-slate-400 hover:bg-slate-300" : ""}
            value={1}
            isCorrect={false}
            isSelected={false}
            onClick={onAnswerHandler}
          >
            Anwers 2
          </AnswerBtn>
          <AnswerBtn
            style={selectedButton == 2 ? "bg-slate-400 hover:bg-slate-300" : ""}
            value={2}
            isCorrect={false}
            isSelected={false}
            onClick={onAnswerHandler}
          >
            Anwers 3
          </AnswerBtn>
          <AnswerBtn
            value={3}
            // style={"bg-slate-400 hover:bg-slate-300 "}
            style={selectedButton == 3 ? "bg-slate-400 hover:bg-slate-300" : ""}
            isCorrect={false}
            isSelected={false}
            onClick={onAnswerHandler}
          >
            Anwers 4
          </AnswerBtn> */}
        </div>
      </div>
      <div className="block absolute bottom-8 left-0 right-0 text-center opacity-50 pb-4 ">
        <p> Tips: Choose the best answer to the question</p>
      </div>
    </div>
  );
}

export default Game;
