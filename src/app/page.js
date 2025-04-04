'use client'

import React, { useState, useEffect } from 'react';
import './page.css';
import Modal from 'react-modal';



function gameBoard() { 
  
  const [gameQuestions, setGameQuestions] = useState(null);
  const [teamNameModalIsOpen, setTeamNameModalIsOpen] = useState(true);
  const [startRoundModalIsOpen, setStartRoundModalIsOpen] = useState(false);
  const [stealModalIsOpen, setStealModalIsOpen] = useState(false);
  const [roundWinnerModalIsOpen, setRoundWinnerModalIsOpen] = useState(false);
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




  function Answer(props) { 
    return <p>{props.visible === false ? "" : props.answer}</p>;
  }

  function XPost(props) {
    return <p>{props.visible === false ? "" : props.answer}</p>;
  }

  function closeTeamNameModal() {
    setTeamNameModalIsOpen(false);
    handleSetTeamNames();
    setStartRoundModalIsOpen(true);
  }

  function closeStartRoundModal() {
    setStartRoundModalIsOpen(false);
    setRoundNumber(roundNumber + 1);
  }

  function closeStealModal() {
    setStealModalIsOpen(false);
  }

  function closeRounderWinnerModal() {

  }

  function stealSuccessful() {
    const points = roundPoints
    if (defensiveTeam === teamOneName) {
      setTeamOnePoints(points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
    if (defensiveTeam === teamTwoName) {
      setTeamTwoPoints(points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
  }

  function stealUnsuccessful() {
    const points = roundPoints
    if (offensiveTeam === teamOneName) {
      setTeamOnePoints(points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
    if (offensiveTeam === teamTwoName) {
      setTeamTwoPoints(points)
      closeStealModal()
      setRoundWinnerModalIsOpen(true)
    }
  }
  

  function PointAdder(props, visible) {
    if (visible === false) {
      setRoundPoints(roundPoints + props);
    } else if (visible === true) {
      setRoundPoints(roundPoints - props);
    } 
  }

  function strikeHandler(strikeNumber) {
    switch (strikeNumber) {
      // TODO: If clicking first strike twice then second stike will be visable
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

    
  useEffect(() => {
    fetch('http://127.0.0.1:8000/question/', {headers: {'Authorization': `Basic ${base64_encoded_credentials}`}})
      .then(response => response.json())
      .then(data => setGameQuestions(data));
  } , []);

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
            <p>Start Game</p>
            <button onClick={closeTeamNameModal}>Start</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={startRoundModalIsOpen} onRequestClose={closeStartRoundModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>Start Round {roundNumber+1}</p>
            <button onClick={closeStartRoundModal}>Start</button>
          </Modal>
        </div>
        <div>
          <Modal isOpen={stealModalIsOpen} onRequestClose={closeStealModal} ariaHideApp={false} className="start-team-name-overlay">
            <p>Steal!</p>
            <p>{defensiveTeam} you get one guess to steal {offensiveTeam}'s points.</p>
            <button onClick={stealSuccessful}>Steal Successful</button> 
            <button onClick={stealUnsuccessful}>Steal Unsuccessful</button>
          </Modal>
        </div>
        
        <div className="ff-logo">
          <img src="./images/family-fued.png" alt="Family Fued Logo" />
        </div>
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
            <div onClick={()=>[setAnswerOneVisable(!answerOneVisable), PointAdder(gameQuestions[0].answeronepoints, answerOneVisable)]}>
              <Answer answer={gameQuestions[0].answerone} assignedpoints={gameQuestions[0].answeronepoints} visible={answerOneVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerTwoVisable(!answerTwoVisable), PointAdder(gameQuestions[0].answertwopoints, answerTwoVisable)]}>
              <Answer answer={gameQuestions[0].answertwo} assignedpoints={gameQuestions[0].answertwopoints} visible={answerTwoVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerThreeVisable(!answerThreeVisable), PointAdder(gameQuestions[0].answerthreepoints, answerThreeVisable)]}>
              <Answer answer={gameQuestions[0].answerthree} assignedpoints={gameQuestions[0].answerthreepoints} visible={answerThreeVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerFourVisable(!answerFourVisable), PointAdder(gameQuestions[0].answerfourpoints, answerFourVisable)]}>
              <Answer answer={gameQuestions[0].answerfour} assignedpoints={gameQuestions[0].answerfourpoints} visible={answerFourVisable}></Answer>
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
            <div onClick={()=>[setAnswerFiveVisable(!answerFiveVisable), PointAdder(gameQuestions[0].answerfivepoints, answerFiveVisable)]}>
              <Answer answer={gameQuestions[0].answerfive} assignedpoints={gameQuestions[0].answerfivepoints} visible={answerFiveVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerSixVisable(!answerSixVisable), PointAdder(gameQuestions[0].answersixpoints, answerSixVisable)]}>
              <Answer answer={gameQuestions[0].answersix} assignedpoints={gameQuestions[0].answersixpoints} visible={answerSixVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerSevenVisable(!answerSevenVisable), PointAdder(gameQuestions[0].answersevenpoints, answerSevenVisable)]}>
              <Answer answer={gameQuestions[0].answerseven} assignedpoints={gameQuestions[0].answersevenpoints} visible={answerSevenVisable}></Answer>
            </div>
            <div onClick={()=>[setAnswerEightVisable(!answerEightVisable), PointAdder(gameQuestions[0].answereightpoints, answerEightVisable)]}>
              <Answer answer={gameQuestions[0].answereight} assignedpoints={gameQuestions[0].answereightpoints} visible={answerEightVisable}></Answer>
            </div>
          </div>
        </div>
      </body>
    ); 
  }
}

export default gameBoard;