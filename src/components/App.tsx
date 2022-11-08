import Hangman from "@/components/Hangman"
import Word from "@/components/Word"
import Keyboard from "@/components/Keyboard"
import { useEffect, useContext } from "react"
import { GameActionType, GameContext } from "@/contexts/GameContext"

function App() {

  const { dispatch } = useContext(GameContext);

  useEffect(() => {
    dispatch({type: GameActionType.INITIALISE});
  }, []);

  return (
    <div className="App">
      <section>
        <Hangman />
      </section>
      <section>
        <Word />
        <Keyboard />
      </section>
    </div>
  )
}

export default App
