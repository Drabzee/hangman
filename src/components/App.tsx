import Hangman from "@/components/Hangman"
import Word from "@/components/Word"
import Keyboard from "@/components/Keyboard"
import { useEffect, useContext } from "react"
import { GameActionType, GameContext, GameStatus } from "@/contexts/GameContext"

function App() {

  const { state: { status }, dispatch } = useContext(GameContext);

  useEffect(() => {
    dispatch({type: GameActionType.INITIALISE});
  }, []);

  return (
    <div className="App">
      <section>
        <Hangman />
        { status !== GameStatus.RUNNING
          && <button
               onClick={() => dispatch({type: GameActionType.INITIALISE})}
               className="reload">
                Try another
             </button>
        }
      </section>
      <section>
        <Word />
        <Keyboard />
      </section>
    </div>
  )
}

export default App
