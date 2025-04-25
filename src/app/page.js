'use client'

import React, { useState, useEffect } from 'react';
import './page.css';
import Modal from 'react-modal';
import logo from './images/family-fued.png';



function gameBoard() { 
  
  const [gameQuestions, setGameQuestions] = useState(null);
  const [totalRoundPoints, setTotalRoundPoints] = useState(0);

  const [teamNameModalIsOpen, setTeamNameModalIsOpen] = useState(true);
  const [startRoundModalIsOpen, setStartRoundModalIsOpen] = useState(false);
  const [stealModalIsOpen, setStealModalIsOpen] = useState(false);
  const [roundWinnerModalIsOpen, setRoundWinnerModalIsOpen] = useState(false);
  const [gameEndModalIsOpen, setGameEndModalIsOpen] = useState(false);

  const [answerOneVisable, setAnswerOneVisable] = useState(false);
  const [answerTwoVisable, setAnswerTwoVisable] = useState(false);
  const [answerThreeVisable, setAnswerThreeVisable] = useState(false);
  const [answerFourVisable, setAnswerFourVisable] = useState(false);
  const [answerFiveVisable, setAnswerFiveVisable] = useState(false);
  const [answerSixVisable, setAnswerSixVisable] = useState(false);
  const [answerSevenVisable, setAnswerSevenVisable] = useState(false);
  const [answerEightVisable, setAnswerEightVisable] = useState(false);

  const [firstStrikeVisable, setFirstStrikeVisable] = useState(false);
  const [secondStrikeVisable, setSecondStrikeVisable] = useState(false);
  const [thirdStrikeVisable, setThirdStrikeVisable] = useState(false);

  const [teamOnePoints, setTeamOnePoints] = useState(0);
  const [teamTwoPoints, setTeamTwoPoints] = useState(0);

  const [roundPoints, setRoundPoints] = useState(0); 
  const [roundNumber, setRoundNumber] = useState(0);

  const [offensiveTeam, setOffensiveTeam] = useState("");
  const [defensiveTeam, setDefensiveTeam] = useState("");

  const username = 'drew';
  const password = 'Dv27232723';
  const base64_encoded_credentials = btoa(`${username}:${password}`);

  const [teamOneName, setTeamOneName] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');
  const [teamNames, setTeamNames] = useState('');
  
  const [gameQuestionIndex, setGameQuestionIndex] = useState(0);


  // TEAM NAMES

  const handleTeamOneChange = (event) => {
    setTeamOneName(event.target.value);
  };
  
  const handleTeamTwoChange = (event) => {
    setTeamTwoName(event.target.value);
  };
  
  const handleSetTeamNames = () => { 
    setTeamNames({ teamOne: teamOneName, teamTwo: teamTwoName });
    setOffensiveTeam(teamOneName)
    setDefensiveTeam(teamTwoName)
  };

  // TEAM NAMES


  



  // ANSWERS

  function Answer(props) { 
    return <p>{props.visible === false ? "" : props.answer}</p>;
  }

  function XPost(props) {
    return <p>{props.visible === false ? "" : props.answer}</p>;
  }

  // ANSWERS


  // BOARD

  function resetRoundBoard() {
    setRoundPoints(0);
    setTotalRoundPoints(0);
    setAnswerOneVisable(false);
    setAnswerTwoVisable(false);
    setAnswerThreeVisable(false);
    setAnswerFourVisable(false);
    setAnswerFiveVisable(false);
    setAnswerSixVisable(false);
    setAnswerSevenVisable(false);
    setAnswerEightVisable(false);
    setFirstStrikeVisable(false);
    setSecondStrikeVisable(false);
    setThirdStrikeVisable(false);
  }


  // MODALS

  function closeTeamNameModal() {
    setTeamNameModalIsOpen(false);
    if (teamOneName.trim().length === 0 || teamTwoName.trim().length === 0) {
      alert('Please enter team names');
      setTeamNameModalIsOpen(true);
    } else {
      handleSetTeamNames();
      setStartRoundModalIsOpen(true);
    }
    
  }

  function closeStartRoundModal() {
    setStartRoundModalIsOpen(false);
    setRoundNumber(roundNumber + 1);
    setTotalRoundPoints(gameQuestions[gameQuestionIndex].answeronepoints + gameQuestions[gameQuestionIndex].answertwopoints + gameQuestions[gameQuestionIndex].answerthreepoints + gameQuestions[gameQuestionIndex].answerfourpoints + gameQuestions[gameQuestionIndex].answerfivepoints + gameQuestions[gameQuestionIndex].answersixpoints + gameQuestions[gameQuestionIndex].answersevenpoints + gameQuestions[gameQuestionIndex].answereightpoints);
    
  }

  function closeStealModal() {
    setStealModalIsOpen(false);
    setOffensiveTeam(defensiveTeam);
    setDefensiveTeam(offensiveTeam);
    resetRoundBoard();
  }

  function closeRounderWinnerModal() {
    setRoundWinnerModalIsOpen(false);
    resetRoundBoard();
    if (gameQuestionIndex === gameQuestions.length) {
      setGameQuestionIndex(0);
    } else if (gameQuestionIndex < gameQuestions.length) {
      setGameQuestionIndex(gameQuestionIndex + 1);
    }
    if (roundNumber >= 3) {
      closeStartRoundModal();
      setGameEndModalIsOpen(true);
    } else if (roundNumber < 3) {
      setStartRoundModalIsOpen(true);
    }
  }

  function closeGameEndModal() {
    setGameEndModalIsOpen(false);
    resetRoundBoard();
    setTeamOnePoints(0);
    setTeamTwoPoints(0);
    setTeamOneName('');
    setTeamTwoName('');
    setRoundNumber(0);
    setTeamNameModalIsOpen(true);
  }

  // MODALS





  // STEAL

  function stealSuccessful() {
    const points = roundPoints
    if (defensiveTeam === teamOneName) {
      setTeamOnePoints(teamOnePoints+points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
    if (defensiveTeam === teamTwoName) {
      setTeamTwoPoints(teamTwoPoints+points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
  }

  function stealUnsuccessful() {
    const points = roundPoints
    if (offensiveTeam === teamOneName) {
      setTeamOnePoints(teamOnePoints+points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
    if (offensiveTeam === teamTwoName) {
      setTeamTwoPoints(teamTwoPoints+points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
  }
  
  // STEAL





  // POINTS

  function PointAdder(props, visible) {
    if (visible === false) {
      setRoundPoints(roundPoints + props);
    } else if (visible === true) {
      setRoundPoints(roundPoints - props);
    } 
  }

  // POINTS



  
  
  // STRIKES
  
  function strikeHandler(strikeNumber) {
    switch (strikeNumber) {
      // TODO: If clicking first strike twice then second stike will be visable
      // TODO: If misclicking strike, be able to remove strike
      case 1:
        setFirstStrikeVisable(true)
        break;
      case 2:
        if (firstStrikeVisable === true) {
          setSecondStrikeVisable(true);
        } else {
          setFirstStrikeVisable(true);
        }
        break;
      case 3:
        if (firstStrikeVisable === true && secondStrikeVisable === true) {
          setThirdStrikeVisable(true);
          setFirstStrikeVisable(false);
          setSecondStrikeVisable(false);
          setThirdStrikeVisable(false);
          setStealModalIsOpen(true)
          setStartRoundModalIsOpen(true);
        } else if (firstStrikeVisable === true) {
          setSecondStrikeVisable(true);
        } else {
          setFirstStrikeVisable(true);
        }
        break;
    }
  }

  // STRIKES




    
  useEffect(() => {
    if (roundPoints > 0 && roundPoints === totalRoundPoints) {
      if (offensiveTeam === teamOneName) {
        setOffensiveTeam(teamTwoName);
        setDefensiveTeam(teamOneName);
        setTeamOnePoints(teamOnePoints + roundPoints);
        
      } else if (offensiveTeam === teamTwoName) {
        setOffensiveTeam(teamOneName);
        setDefensiveTeam(teamTwoName);
        setTeamTwoPoints(teamTwoPoints + roundPoints);
        
      }
      setRoundWinnerModalIsOpen(true);
    }
  } , [roundPoints]);

    
  useEffect(() => {
    fetch('http://127.0.0.1:8000/question/', {headers: {'Authorization': `Basic ${base64_encoded_credentials}`}})
      .then(response => response.json())
      .then(data => setGameQuestions(data));
  } , []);

  // useEffect(() => {
  //   const dataToSend = {"answeronevisable": answerOneVisable, "answertwovisable": answerTwoVisable, "answerthreevisable": answerThreeVisable, "answerfourvisable": answerFourVisable, "answerfivevisable": answerFiveVisable, "answersixvisable": answerSixVisable, "answersevenvisable": answerSevenVisable, "answereightvisable": answerEightVisable};
  //   console.log(JSON.stringify(dataToSend));
  //   fetch('http://127.0.0.1:8000/question/2', {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {'Authorization': `Basic ${base64_encoded_credentials}`, 'Content-Type': 'application/json'},
  //     body: JSON.stringify(dataToSend),

  //   })
  //     .then(response => response.json())

  // }, [answerOneVisable, answerTwoVisable, answerThreeVisable, answerFourVisable, answerFiveVisable, answerSixVisable, answerSevenVisable, answerEightVisable]);
  

  if (gameQuestions) {
    return (
      <body>
        
        <div>
          <Modal isOpen={teamNameModalIsOpen} onRequestClose={closeTeamNameModal} ariaHideApp={false} className="start-team-name-overlay">
            <label htmlFor="teamOne">Team One Name:</label>
            <input type="text" id="teamOne" value={teamOneName} onChange={handleTeamOneChange}/>
            <br />
            <label htmlFor="teamTwo">Team Two Name:</label>
            <input type="text" id="teamTwo" value={teamTwoName} onChange={handleTeamTwoChange}/>
            <br />
            <button onClick={closeTeamNameModal} className='start-game-button'>Start Game</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={startRoundModalIsOpen} onRequestClose={closeStartRoundModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>{gameQuestions[gameQuestionIndex].question}</p>
            <p>{offensiveTeam} you are up!</p>
            <button onClick={closeStartRoundModal} className='start-round-button'>Start Round {roundNumber+1}</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={stealModalIsOpen} onRequestClose={closeStealModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>Steal!</p>
            <p>{defensiveTeam} you get one guess to steal {offensiveTeam}'s points.</p>
            <button onClick={stealSuccessful} className='start-round-button'>Steal Successful</button> 
            <button onClick={stealUnsuccessful} className='start-round-button'>Steal Unsuccessful</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={roundWinnerModalIsOpen} onRequestClose={closeRounderWinnerModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>Round {roundNumber} Winner!</p>
            <p>{teamOneName} you have {teamOnePoints} points!</p>
            <p>{teamTwoName} you have {teamTwoPoints} points!</p>
            <button onClick={closeRounderWinnerModal} className='start-round-button'>Continue</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={gameEndModalIsOpen} onRequestClose={closeGameEndModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>Game Over!</p>
            <p>{teamOneName} Points: {teamOnePoints}</p>
            <p>{teamTwoName} Points: {teamTwoPoints}</p>
            <button onClick={closeGameEndModal} className='start-round-button'>New Game</button>
          </Modal>
        </div>
          
        <div className="ff-logo">
          <img src="http://bridgtonacademy.org/wp-content/uploads/2025/04/BA_DWFF.png" alt="Logo" />
        </div>
        <div className="background">
          <div className="top-section">
              <div className='top-teamone-points'>
                <div>
                  {teamNames.teamOne ? teamNames.teamOne : "Team 1"}
                </div>
                <div>
                  {teamOnePoints}
                </div>
              </div>
              <div className="top-round-info">
                <div className="round-number-area">
                  Round {roundNumber}
                </div>
                <div>
                  {roundPoints}
                </div>
              </div>
              <div className="top-teamtwo-points">
                <div>
                  {teamNames.teamTwo ? teamNames.teamTwo : "Team 2"}
                </div>
                <div>
                  {teamTwoPoints}
                </div>
              </div>
          </div>
      
          <div className="bottom-section"> 
            <div className='left-questions-area'>
              <div onClick={()=>[setAnswerOneVisable(!answerOneVisable), PointAdder(gameQuestions[gameQuestionIndex].answeronepoints, answerOneVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answerone} assignedpoints={gameQuestions[gameQuestionIndex].answeronepoints} visible={answerOneVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerTwoVisable(!answerTwoVisable), PointAdder(gameQuestions[gameQuestionIndex].answertwopoints, answerTwoVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answertwo} assignedpoints={gameQuestions[gameQuestionIndex].answertwopoints} visible={answerTwoVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerThreeVisable(!answerThreeVisable), PointAdder(gameQuestions[gameQuestionIndex].answerthreepoints, answerThreeVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answerthree} assignedpoints={gameQuestions[gameQuestionIndex].answerthreepoints} visible={answerThreeVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerFourVisable(!answerFourVisable), PointAdder(gameQuestions[gameQuestionIndex].answerfourpoints, answerFourVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answerfour} assignedpoints={gameQuestions[gameQuestionIndex].answerfourpoints} visible={answerFourVisable}></Answer>
              </div>
            </div>
            <div className="strikes-area">
              <div onClick={()=>[strikeHandler(1)]}>
                <XPost answer={"X"} visible={firstStrikeVisable}></XPost>
              </div>
              <div onClick={()=>[strikeHandler(2)]}>
                <XPost answer={"X"} visible={secondStrikeVisable}></XPost>
              </div>
              <div onClick={()=>[strikeHandler(3)]}>
                <XPost answer={"X"} visible={thirdStrikeVisable}></XPost>
              </div>
            </div>
            <div className='right-questions-area'>
              <div onClick={()=>[setAnswerFiveVisable(!answerFiveVisable), PointAdder(gameQuestions[gameQuestionIndex].answerfivepoints, answerFiveVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answerfive} assignedpoints={gameQuestions[gameQuestionIndex].answerfivepoints} visible={answerFiveVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerSixVisable(!answerSixVisable), PointAdder(gameQuestions[gameQuestionIndex].answersixpoints, answerSixVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answersix} assignedpoints={gameQuestions[gameQuestionIndex].answersixpoints} visible={answerSixVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerSevenVisable(!answerSevenVisable), PointAdder(gameQuestions[gameQuestionIndex].answersevenpoints, answerSevenVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answerseven} assignedpoints={gameQuestions[gameQuestionIndex].answersevenpoints} visible={answerSevenVisable}></Answer>
              </div>
              <div onClick={()=>[setAnswerEightVisable(!answerEightVisable), PointAdder(gameQuestions[gameQuestionIndex].answereightpoints, answerEightVisable)]}>
                <Answer answer={gameQuestions[gameQuestionIndex].answereight} assignedpoints={gameQuestions[gameQuestionIndex].answereightpoints} visible={answerEightVisable}></Answer>
              </div>
            </div>
          </div>
        </div>
      </body>
    ); 
  }
}

export default gameBoard;