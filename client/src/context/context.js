import React, { createContext, useState } from "react";
import { io } from "socket.io-client";

import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const socketURL =
  serverRuntimeConfig.socketURL || publicRuntimeConfig.socketURL;

const socket = io(socketURL);

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
