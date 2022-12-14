import React, {useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function CreateDeck({setDecks}) {
    const initialFormState = {
        name: "",
        description: ""
    };
    const [formData, setFormData] = useState({...initialFormState});
    const history = useHistory();

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const newDeck = {
            name: formData.name,
            description: formData.description,
            cards: [],
    };
    async function createNewDeck() {
        const createdDeck = await createDeck(newDeck);
        listDecks().then(setDecks)
        
        history.push(`/decks/${createdDeck.id}`);
    }
    createNewDeck();
    };
    
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
                <li className="breadcrumb-item active" aria-current="page">
                    Create Deck
                </li>
              </ol>
            </nav>
            <h2>Create Deck</h2>
            <DeckForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>
      );
}