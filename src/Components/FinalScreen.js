import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FetchButton from './FetchButton'

function FinalScreen() {
  const score = useSelector((state) => state.score)
  const amount = useSelector((state) => state.amount)
  let grade = (score < amount/3) ? "Not good enough, You should try again":
              (score > 2*(amount/3) && score !== amount) ? "Very good!":
              (score === amount) ? "Perfect!":
              "OK, But you can do better";
  let img = (score < amount/3) ? '"../img/1.png"':
            (score > 2*(amount/3)) ? '"../img/3.png"':
              '"../img/2.png"';

  const dispatch = useDispatch()

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  return (
    <div className='bg'>
      <h3>Final Score: {score*100/amount}%</h3>
      <img className='img' src={img} width="200" alt=""></img>
      <h3>{grade}</h3>
      <FetchButton text="New Game" />
      <button onClick={settings}>Home</button>
      <p></p>
    </div>
  )
}
export default FinalScreen