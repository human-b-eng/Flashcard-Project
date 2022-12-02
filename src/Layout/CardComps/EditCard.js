import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard({ deckId}) {
    const history = useHistory();
    const { cardId } = useParams()
    const [card, setCard] = useState({});
  
    useEffect(() => {
      async function loadCard() {
        const cardResponse = await readCard(cardId);
        setCard(cardResponse);
      }
      loadCard();
    }, [deckId, cardId]);
  
    function handleChange({ target }) {
      setCard({
        ...card,
        [target.name]: target.value,
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      async function UpdateCard() {
          await updateCard(card);
          history.push(`/decks/${deckId}`);
          history.go(0);
      }
      UpdateCard();
    }
  
    function handleCancel() {
      history.push(`/decks/${deckId}`);
    }
  
    return (
        <CardForm
          card={card}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDoneAndCancel={handleCancel}
          doneOrCancel = "Cancel"
        />
    );
}