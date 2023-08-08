import React, { useEffect, useContext, useState, memo } from "react";
import { AppContext } from "@/context/context";

const CountDown = memo(function CountDown({
  socket,
  setSelectedButton,
  setRoundResult,
  timeName,
  setTimeName,
}) {
  // for time count down
  const [time, setTime] = useState();
  const { roundAnswer, setRoundAnswer, setStart } = useContext(AppContext);

  useEffect(() => {
    function onAnswerTime(second) {
      setTimeName("Answer Time");
      setTime(second);
      if (second == 0) {
        socket.emit("round:answer", {
          ...roundAnswer,
          roomID: localStorage.getItem("roomID"),
        });
        setRoundAnswer(null);
      }
    }

    function onBreakTime(second) {
      setTimeName("Break Time");
      setTime(second);
      if (second == 0) {
        setRoundResult(null);
        setSelectedButton(null);
        socket.emit("game:next", { roomID: localStorage.getItem("roomID") });
        setStart(Date.now());
      }
    }

    socket.on("room:break_time", onBreakTime);
    socket.on("room:answer_time", onAnswerTime);

    return () => {
      socket.off("room:break_time", onBreakTime);
      socket.off("room:answer_time", onAnswerTime);
    };
  }, [roundAnswer]);

  return (
    <div className="flex justify-center col-span-12">
      <span
        className={`mx-4 ${
          timeName != "Break Time" ? "text-red-600" : "text-green-600"
        }`}
      >
        {timeName}
      </span>
      <span>{time >= 0 ? time + "s" : "  "}</span>
    </div>
  );
});

export default CountDown;
