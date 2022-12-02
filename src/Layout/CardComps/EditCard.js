import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
  
    useEffect(() => {
      async function loadCard() {
        const cardResponse = await readCard(cardId);
        setCard(cardResponse);
      }
      loadCard();
    }, [deckId, cardId]);

    useEffect(()=> {
        const thisDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
        }
        thisDeck()
        // eslint-disable-next-line 
    },[deckId])
  
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
          //history.go(0);
      }
      UpdateCard();
    }
  
    function handleCancel() {
      history.push(`/decks/${deckId}`);
    }
  
    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        <i className="oi oi-home px-1"></i>Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>
                        {deck.name}
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Edit
                </li>
            </ol>
            </nav>
            <h2>{deck.name}: Edit Card</h2>
            <CardForm
              card={card}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleDoneAndCancel={handleCancel}
              doneOrCancel = "Cancel"
            />
        </div>
    );
}