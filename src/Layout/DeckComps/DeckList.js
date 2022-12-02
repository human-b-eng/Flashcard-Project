import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

export default function DeckList({decks, setDecks}) {
    const history = useHistory();

    function handleDelete(deckId) {
        if (
          window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ) {
        async function deleteThisDeck() {
            await deleteDeck(deckId);
            history.go(0);
            listDecks().then(setDecks)
        }
        deleteThisDeck();
        }
    }
    
    return decks ? (
            <ul>
               {decks.map((deck,i) => <li className="card p-2" key={i}>
                    <header>
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.cards.length} cards</p>
                    </header>
                    <p className="cardbody">{deck.description}</p>
                    <div className="d-flex flex-direction-row">
                    <Link to={`/decks/${deck.id}`} >
                        <button className="btn btn-dark m-2"><span className="oi oi-eye"></span> View</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} >
                        <button className="btn btn-primary m-2"><span className="oi oi-book"></span> Study</button>
                    </Link>
                    <Link to="/" >
                        <button onClick={()=>handleDelete(deck.id)} className="btn btn-danger m-2 ml-5"><span className="oi oi-trash"></span></button>
                    </Link>
                    </div>
                </li>
                )}  
           </ul>
      ) : (
            <div>
                <h2>Loading Decks . . .</h2>
            </div>
        )
}