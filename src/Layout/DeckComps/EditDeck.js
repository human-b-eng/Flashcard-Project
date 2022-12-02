import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateDeck, readDeck, listDecks } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck({setDecks}) {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const [updatedDeck, setUpdatedDeck] = useState({});

    const handleChange = ({ target }) => {
      setUpdatedDeck({
        ...deck,
        [target.name]: target.value,
      });
    };
    
    
    useEffect(()=> {
        const thisDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
            setUpdatedDeck(data)
        }
        thisDeck()
        
        // eslint-disable-next-line 
    },[deckId])

    function handleSubmit(event) {
        event.preventDefault();
        async function updateDeckList() {
            await updateDeck(updatedDeck);
            history.push("/");
            listDecks().then(setDecks)
        }
        updateDeckList();
    }
  
    function handleCancel() {
        history.push("/");
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
                        <Link to={`/decks/${deck.id}`}>
                             {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Edit Deck</h2>
            <DeckForm
              deck={deck}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
        </div>
    );
}
  
  
  