import React, { useEffect, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import ParticlesComponent from "@/components/ui/Particles";
import collectionAPIs from "@/services/api/collection.api";

export const getStaticProps = async (context) => {
  const collectionID = context.params.FlashCard;
  const flashcards = await collectionAPIs.getCollection(collectionID);

  return {
    props: {
      flashcards: flashcards.data.data,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

function FlashCard({ flashcards }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const modifiedCard = flashcards?.map((card) => {
      return {
        ...card,
        id: card._id,
        frontHTML: <>{card.front}</>,
        backHTML: <>{card.back}</>,
      };
    });
    setCards(modifiedCard);
  }, []);

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
