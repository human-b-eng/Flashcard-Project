import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";


export default function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardList, setCardList] = useState([]);
    const [flipped, setFlipped] = useState(false);
    const [cardId, setCardId] = useState(1);
    const history = useHistory();

    useEffect(()=> {
        const thisDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
            setCardList(data.cards)
        }
        thisDeck()
    },[deckId])

    function handleFlip() {
        flipped ? setFlipped(false) : setFlipped(true);
        if (cardId === cardList.length) {
            if (
                window.confirm(
                    "Restart Cards? \n\n Click 'cancel' to return to the home page."
                )
            ) {
                setCardId(1);
                setFlipped(false);
            } else {
                history.push("/");
            }
        }
    }

    function handleNext() {
        if (cardId < cardList.length) {
            setCardId(cardId + 1);
        }
        setFlipped(false);
    }
  
    if (cardList.length < 3) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="oi oi-home"></i> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                             {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
                </nav>
            
                <h1>{deck.name}: Study</h1>
                <h2>Not enough cards.</h2>
                <p>
                You need at least 3 cards to study. There are {cardList.length} cards in this deck.
                </p>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button type="button" className="btn btn-primary">
                    <i className="oi oi-plus"></i> Add Cards
                    </button>
                </Link>
            </div>
        )
    } else {
        return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="oi oi-home"></i> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                             {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>
            <div>
                <h2>{deck.name}: Study</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                        Card {cardId} of {cardList.length}
                        </h4>
                        <p className="card-text">
                            {flipped ? cardList[cardId-1].back : cardList[cardId-1].front}
                        </p>
                        <button
                          type="button"
                          className="btn btn-secondary mr-2 mt-3"
                          onClick={handleFlip}
                        >Flip
                        </button>
                        {flipped ? (
                            <button
                              type="button"
                              className="btn btn-primary mt-3"
                              onClick={handleNext}
                            >Next
                            </button>
                        ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}