import React, { createContext, useState } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL);

export const AppContext = createContext();
export function AppContextProvider({ children }) {
  const [roundAnswer, setRoundAnswer] = useState(null);
  const [scoreBoard, setScoreBoard] = useState(null);
  //handle time to answer
  const [start, setStart] = useState(null);

  return (
    <AppContext.Provider
      value={{
        socket,
        start,
        setStart,
        roundAnswer,
        setRoundAnswer,
        scoreBoard,
        setScoreBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
