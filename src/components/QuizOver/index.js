import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loader from '../Loader';
import Modal from '../Modal';


const QuizOver = React.forwardRef((props, ref) => {

  const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setAsked(ref.current)
  }, [ref]);
  const showModal = id => {
    setOpenModal(true)
  }

  const hideModal = () =>{
    setOpenModal(false)
  }

  const averageGrade = maxQuestions/2;
  if(score < averageGrade){
    setTimeout(() => {loadLevelQuestions(quizLevel)}, 3000);
  }
  

  const decision = score >= averageGrade ? (
    <Fragment>
      <div className='stepsBtnContainer'>
      {
        quizLevel < levelNames.length ? (
          
          <Fragment>
            
              <p className='successMsg'>Bravo, passez au niveau suivant!</p>
              <button onClick={() => loadLevelQuestions(quizLevel)} className='btnResult success'>Niveau Suivant</button>
            
            
          </Fragment>
        ) : (
          <Fragment>
            
              <p className='successMsg'><GiTrophyCup size='50px'/>Bravo, vous etes un expert</p>
              <button onClick={() => loadLevelQuestions(0)} className='btnResult gameOver'>Accueil</button>
           
            
          </Fragment>
        )
      }
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='stepsBtnContainer'>
        <p className='failureMsg'>vous avez échoué</p>
        
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  )
  
  const questionAnswer = score >= averageGrade ? (
    asked.map(question => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td><button onClick={() => showModal(question.heroId)} className='btnInfo'>Infos</button></td>
        </tr>
      )
    })
  ) : (
        <tr>
          <td colSpan="3">
           <Loader 
            loadingMsg={"Pas de réponses!"} 
            styling={{textAlign: 'center', color: 'red'}}
          /> 
          </td>
          
        </tr>
  )
 
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées:</p>
      <div className='answerContainer'>
        <table className='answers'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {questionAnswer}
          </tbody>
        </table>
      
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        <div className='modalHeader'>
          <h2></h2>
        </div>
        <div className='modalBody'>
          <h3></h3>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn'>Fermer</button>
        </div>
      </Modal>
    </Fragment>
    
  )
}

)
 

export default React.memo(QuizOver)
