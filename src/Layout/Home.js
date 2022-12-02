import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckComps/DeckList";

export default function Home({decks, setDecks}) {

    return (
        <div>
            <Link to="/decks/new" > 
                <button className="btn btn-dark mb-3"><span className="oi oi-plus"></span> Create Deck</button>
            </Link>
            <DeckList decks={decks} setDecks={setDecks} />
        </div>
    )
}
