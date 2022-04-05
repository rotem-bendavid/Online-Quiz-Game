const initState = {
    options: {
      loading: false,
      question_category: ``,
      question_difficulty: ``,
      question_type: ``,
      amount_of_questions: 5,
    },
    questions: [],
    index: 0,
    score: 0,
    amount: 5,
  }
  
  const Reducer = (state = initState, action) => {
    switch (action.type) {
      case 'CHANGE_LOADING':
        return {
          ...state,
          options: {
            ...state.options,
            loading: action.loading,
          },
        }
  
      case 'SET_QUESTIONS':
        return {
          ...state,
          questions: action.questions,
        }
  
      case 'SET_INDEX':
        return {
          ...state,
          index: action.index,
        }
  
      case 'SET_SCORE':
        return {
          ...state,
          score: action.score,
        }
  
      default:
        return state
    }
  }
  
  export default Reducer