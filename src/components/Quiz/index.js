import React, { Component, Fragment } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa'


toast.configure();

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomMsg: false,
  quizEnd: false,
  percent: 0
}

const levelNames = ["debutant", "confirme", "expert"];
class Quiz extends Component {


  constructor(props) {
    super(props)

  
    this.state = initialState;
  }
  
  
  storedDataRef = React.createRef();
  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if(fetchedArrayQuiz.length >= this.state.maxQuestions){
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
      this.setState({
        storedQuestions: newArray
      })
    }else{
      console.log("pas assez de questions!!!")
    }
  }
  showWelcomeMsg = pseudo => {
    if(!this.state.showWelcomMsg){
      this.setState({
        showWelcomMsg: true
      })
      
      toast.warn(`Welcome ${pseudo} bonne chance`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      })
      
    }
    
  }

  componentDidMount = () => {
    this.loadQuestions(levelNames[this.state.quizLevel])
  }
  componentDidUpdate(prevProps, prevState){

    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd
    } = this.state;
    if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length){
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options
      })
    }

    if((idQuestion !== prevState.idQuestion) && storedQuestions.length){
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if(quizEnd !== prevState.quizEnd){
      const gradpercent = this.getPercentage(maxQuestions, score)
      this.gameOver(gradpercent);
    }

    if(this.props.userData.pseudo !== prevProps.userData.pseudo){
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  }
  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }
  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
  gameOver = percent => {
    
    if(percent >= 50){
      this.setState({
        quizLevel: this.state.quizLevel +1,
        percent: percent
      })
    }else{
      this.setState({
        percent: percent
      })
    }
  }
  
  nextQuestion = () => {
    
    if(this.state.idQuestion === this.state.maxQuestions - 1){
      this.setState({quizEnd: true})
      //this.gameOver()
    }else{
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer){
      this.setState(prevState => ({score: prevState.score + 1}))
      toast.success('Bravo + 1', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName: "toastify-color"
      })
    }else{
      toast.error('Raté', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName: "toastify-color"
      })
    }
    
    
  }

  loadLevelQuestions = param => {
    this.setState({...initialState, quizLevel: param});
    this.loadQuestions(levelNames[param]);
  }
  
  render(){


    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent
    } = this.state 

    const displayOptions = options.map((option, index) => {
      return (
        <p key={index} 
          onClick={() => this.submitAnswer(option)} 
          className={`answerOptions ${userAnswer === option ? "selected" : null}`}>
          <FaChevronRight /> {option}
        </p>
      ) 
    })
    return quizEnd ? 
          (<QuizOver ref={this.storedDataRef} 
            levelNames={levelNames} 
            score={score} 
            maxQuestions={maxQuestions} 
            quizLevel={quizLevel} 
            percent={percent}
            loadLevelQuestions={this.loadLevelQuestions}/>
          ) : (
            <Fragment>
              <Levels levelNames={levelNames} quizLevel={quizLevel}/>
              <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions}/>
              <h2>{question}</h2>
              {displayOptions}
              <button 
                onClick={this.nextQuestion} 
                disabled={btnDisabled} 
                className='btnSubmit'>
                {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
              </button>
            </Fragment>
            )
  }
}

export default Quiz
