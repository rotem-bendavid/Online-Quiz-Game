import { useSelector } from 'react-redux'

import Home from './Components/Home'
import Question from './Components/Question'
import FinalScreen from './Components/FinalScreen'

import './App.css'

function App() {
  const questions = useSelector((state) => state.questions);
  const questionIndex = useSelector((state) => state.index);
  const amount = useSelector((state) => state.amount);

  let component

  if (questions.length && questionIndex + 1 <= amount) {
    component = <Question setTimer={10} />
  } else if (!questions.length) {
    component = <Home />
  } else {
    component = <FinalScreen />
  }

  return (
    <div className="App">
      <div className="app-container">{component}</div>
    </div>
  )
}

export default App