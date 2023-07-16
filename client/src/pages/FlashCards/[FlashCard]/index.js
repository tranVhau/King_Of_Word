import React from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import ParticlesComponent from "@/components/ui/Particles";

function FlashCard() {
  const cards = [
    {
      id: 1,
      frontHTML: (
        <div>
          What is the capital of <u>Alaska</u>?
        </div>
      ),
      backHTML: <>Juneau</>,
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    },
    {
      id: 3,
      frontHTML: <>What is the capital of New York?</>,
      backHTML: <>Albany</>,
    },
    {
      id: 4,
      frontHTML: <>What is the capital of Florida?</>,
      backHTML: <>Tallahassee</>,
    },
    {
      id: 5,
      frontHTML: <>What is the capital of Texas?</>,
      backHTML: <>Austin</>,
    },
    {
      id: 6,
      frontHTML: <>What is the capital of New Mexico?</>,
      backHTML: <>Santa Fe</>,
    },
    {
      id: 7,
      frontHTML: <>What is the capital of Arizona?</>,
      backHTML: <>Phoenix</>,
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FlashcardArray
        backContentStyle={{
          backgroundColor: "#77DD77",
          color: "black",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          font: "bold",
        }}
        frontContentStyle={{
          backgroundColor: "white",
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
        cards={cards}
        cycle={true}
      />
      <ParticlesComponent />
    </div>
  );
}

export default FlashCard;
