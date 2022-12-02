import React, {useState, useEffect} from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import Study from "./CardComps/Study";
import Deck from "./DeckComps/Deck";
import { listDecks } from "../utils/api";
import CreateDeck from "./DeckComps/CreateDeck";

function Layout() {

  const [decks, setDecks] = useState([])
  useEffect(() => {
      document.title ="Flashcard-o-matic"
      const loadDecks = async () => {
          const data = await listDecks()
          setDecks(data)
          console.log("ONE",decks)
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
            <Home decks={decks}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <div>New Card</div>-
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {/* TODO: Implement the screen starting here */}
      </div>
    </>
  );
}

export default Layout;
