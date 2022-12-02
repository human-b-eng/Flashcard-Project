import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
  
    const initialFormState = {
      front: "",
      back: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
  
    function handleChange({ target }) {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
    
    useEffect(()=> {
        const thisDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
        }
        thisDeck()
        
        // eslint-disable-next-line 
    },[deckId])

    function handleSubmit(event) {
      event.preventDefault();
      const newCard = {
        front: formData.front,
        back: formData.back,
      };
      async function createNewCard() {
        await createCard(deckId, newCard);
        history.go(0);
      }
      createNewCard();
    }
  
    function handleDone() {
      history.push(`/decks/${deckId}`);
    }
  
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
                    Add Card
                </li>
            </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
        <CardForm
          card={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDoneAndCancel={handleDone}
          doneOrCancel = "Done"
        />
      </div>
    );
}