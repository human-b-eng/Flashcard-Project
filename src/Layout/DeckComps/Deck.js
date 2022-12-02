import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard, listDecks } from "../../utils/api";

export default function Deck({setDecks}) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardList, setCardList] = useState([]);
    const history = useHistory();

    useEffect(()=> {
        const thisDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
            setCardList(data.cards)
        }
        thisDeck()

        // eslint-disable-next-line 
    },[deckId])
 
    function handleDeleteDeck(deckId) {
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

    function handleDeleteCard(cardId) {
        if (
          window.confirm("Delete this card?\n\nYou will not be able to recover it.")
        ) {
            async function DeleteCard() {
                await deleteCard(cardId);
                history.go(0);
            }
            DeleteCard();
        }
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
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>

            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}/edit`} >
                    <button className="btn btn-dark m-2"><span className="oi oi-pencil"></span> Edit</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`} >
                    <button className="btn btn-primary m-2"><span className="oi oi-book"></span> Study</button>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`} >
                    <button className="btn btn-primary m-2"><span className="oi oi-plus"> Add Cards</span></button>
                </Link>
                <Link to="/" >
                    <button onClick={()=>handleDeleteDeck(deck.id)} className="btn btn-danger m-2 ml-5"><span className="oi oi-trash"></span></button>
                </Link>
            </div>
            <div>
            <div>
                {cardList.length > 0 ? (
                <div> 
                    <h2>Cards</h2>
                    <ul>
                        {cardList.map((card,i) => <li className="card container p-2" key={i}>
                        <div className="row">
                        <p className="m-2 col">{card.front}</p>
                        <p className="m-2 col">{card.back}</p>
                        </div>
                        <div className="row justify-content-end mx-2">
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} >
                                <button className="btn btn-dark m-2"><span className="oi oi-pencil"></span> Edit</button>
                            </Link>
                            <Link to={`/decks/${deck.id}`} >
                                <button onClick={()=>handleDeleteCard(card.id)} className="btn btn-danger m-2"><span className="oi oi-trash"></span></button>
                            </Link>
                        </div>
                        </li>)}
                    </ul>
                </div>
                ) : (null)}
            </div>
            </div>
        </div>
    )
}