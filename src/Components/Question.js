import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const decodeHTML = function (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

let useHelp=false

function Question() {
  const [questions, setQuestions] = useState([])
  const [answerSelected, setAnswerSelected] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [options, setOptions] = useState([])
  const amount = useSelector((state) => state.amount)
  const score = useSelector((state) => state.score)
  const encodedQuestions = useSelector((state) => state.questions)
  const dispatch = useDispatch()
  

  //import questions from api to function
  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
      }
    })

    setQuestions(decodedQuestions)
  }, [encodedQuestions])
  const questionIndex = useSelector((state) => state.index)
  const question = questions[questionIndex]
  const answer = question && question.correct_answer

  //randomize the answers
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max+1))
  }
  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)
    setOptions(answers)
  }, [question])

  //setting timer
  let timeForQuestion = 10;
  const [counter, setCounter] = useState(timeForQuestion);
  useEffect(() => {
      const interval = setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
      }, 1000); 
      return () => clearInterval(interval);
      }, []); 
  if (counter === 1) {
    setTimeout(() => {
      setInterval();
    }, );
    goToNextQuestion()
  }
  
  //targets the button click
  const handleListItemClick = (event) => {
    if (!answerSelected) {
      setAnswerSelected(true)
      setSelectedAnswer(event.target.textContent)
      if (event.target.textContent === answer) {
        dispatch({
          type: 'SET_SCORE',
          score: score + 1,
        })
      }
      goToNextQuestion();
    }
  }

  //clue - 50-50
  const handleHelp = () => {
    if (!useHelp){
      if (options.length>3){
        let index1 = Math.floor(Math.random() * (3 + 1));
        let index2 = Math.floor(Math.random() * (3 + 1));
        while (options[index1] === answer) {
          index1 = Math.floor(Math.random() * (3 + 1)); }
        while (options[index2] === answer || index2 === index1) {
          index2 = Math.floor(Math.random() * (3 + 1)); }
        options[index1]=null
        options[index2]=null
        useHelp = true }
    }
  }

  //go to next question
  function goToNextQuestion(){
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerSelected(false);
      useHelp=false
      dispatch({
        type: 'SET_INDEX',
        index: questionIndex + 1,
      })
      setCounter(timeForQuestion);
    },1500);
  }

  //used to preform the user the right answer
  const getClass = option => {
    if (!answerSelected) {
      return ``;
    }
    if (option === answer) {
      return `correct`
    }
    if (option === selectedAnswer) {
      return `selected`
    }
  }

  if (!question) {
    return <div>Loading</div>
  }

  return (
    <div className='bg'>
      <div className='question'>
        <p>Question {questionIndex + 1} of {amount}</p>
        <h3>{question.question}</h3>
        <div>
          {
            options.map((option, i) => {
              return (
              <li key={i} onClick={handleListItemClick} className={getClass(option)}>
                {option}
              </li>
              )
            })
          }
        </div>
        <p>
          Score: {score} / {amount}
          &emsp;
          Time: {counter}
        </p>
        <button className='help' onClick={handleHelp}>for 50-50 clue press here</button> 
        <p></p>
      </div>
    </div>
  )
}

export default Question