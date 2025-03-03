'use client'

import React, { useState, useEffect } from 'react';
import './page.css';
import Modal from 'react-modal';



function Answer(props) {
  return <p>{props.answer}</p>
}

function gameBoard() { 
  
  const [gameQuestions, setGameQuestions] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [answerVisable, setAnswerVisable] = useState(true)
  // const [answerOneVisable, setAnswerOneVisable] = useState(true);
  const username = 'drew';
  const password = 'Dv27232723';
  const base64_encoded_credentials = btoa(`${username}:${password}`);


  function closeModal() {
    console.log("closeModal");
    setModalIsOpen(false);
  }

  function answerFlipper() {
    console.log("Flipper");
    // const targetList = [answerOneVisable]
    // const targetListSet = [setAnswerOneVisable]
    
    if (answerVisable === false) {
      setAnswerVisable(true);
      // setAnswerOneVisable(true);
      console.log(answerVisable);
      
    } else {
      setAnswerVisable(false);
      // setAnswerOneVisable(false);
      console.log(answerVisable);
      
    }
  }
    
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/question/', {headers: {'Authorization': `Basic ${base64_encoded_credentials}`}})
      .then(response => response.json())
      .then(data => setGameQuestions(data));
  } , []);

  if (gameQuestions) {
    return (
      <body>
        <div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} className="start-game-overlay">
            <p>Start Game</p>
            <button onClick={closeModal}>Start</button>
          </Modal>
        </div>
        <div className="ff-logo">
          <img src="./images/family-fued.png" alt="Family Fued Logo" />
        </div>
        <div className="top-section">
            <div className='top-teamone-points'>
              <div>
                Team 1
              </div>
              <div>
                {/* <TeamOnePoints></TeamOnePoints> */}
              </div>
            </div>
            <div className="top-round-info">
              <div className="round-number-area">
                {/* Round <RoundNumber></RoundNumber> */}
              </div>
              <div>
                {/* <RoundPoints></RoundPoints> */}
              </div>
            </div>
            <div className="top-teamtwo-points">
              <div>
                Team 2
              </div>
              <div>
              {/* <TeamTwoPoints></TeamTwoPoints> */}
              </div>
            </div>
        </div>
    
        <div className="bottom-section"> 
          <div className='left-questions-area'>
            {/* <div onClick={answerFlipper()}> */}
            <div onClick={()=>setAnswerVisable(!answerVisable)}>
              <Answer answer={gameQuestions[0].answerone}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answertwo}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answerthree}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answerfour}></Answer>
            </div>
          </div>
          <div className="strikes-area">
            <div>
              {/* <FirstStrike></FirstStrike> */}
            </div>
            <div>
              {/* <SecondStrike></SecondStrike> */}
            </div>
            <div>
              {/* <ThirdStrike></ThirdStrike> */}
            </div>
          </div>
          <div className='right-questions-area'>
            <div>
              <Answer answer={gameQuestions[0].answerfive}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answersix}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answerseven}></Answer>
            </div>
            <div>
              <Answer answer={gameQuestions[0].answereight}></Answer>
            </div>
          </div>
        </div>
      </body>
    ); 
  }
}

export default gameBoard;