import React, {useState, useEffect} from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import Study from "./CardComps/Study";
import Deck from "./DeckComps/Deck";
import { listDecks } from "../utils/api";
import CreateDeck from "./DeckComps/CreateDeck";
import EditCard from "./CardComps/EditCard";
import AddCard from "./CardComps/AddCard";
import EditDeck from "./DeckComps/EditDeck";

function Layout() {

  const [decks, setDecks] = useState([])
  useEffect(() => {
      document.title ="Flashcard-o-matic"
      const loadDecks = async () => {
          const data = await listDecks()
          setDecks(data)
      }
      loadDecks()
      // eslint-disable-next-line 
  },[])


  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDeck={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck setDecks={setDecks}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
