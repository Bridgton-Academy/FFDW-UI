'use client'

import React, { useState, useEffect, Component } from 'react';
import './page.css';


class TeamOnePoints extends React.Component {
  render() {
    return <p>Current Points</p>
    
  }
}

class TeamTwoPoints extends React.Component {
  render() {
    return <p>Current Points</p>
    
  }
}

class RoundNumber extends React.Component {
  render() {
    return <p>#</p>

  }
}

class RoundPoints extends React.Component {
  render() {
    return <p>Pts Revealed</p>
    
  }
}

class AnswerOne extends React.Component {
  render() {
    return <p>Answer One</p>
    
  }
}

class AnswerTwo extends React.Component {
  render() {
    return <p>Answer Two</p>
    
  }
}

class AnswerThree extends React.Component {
  render() {
    return <p>Answer Three</p>
    
  }
}

class AnswerFour extends React.Component {
  render() {
    return <p>Answer Four</p>
    
  }
}

class AnswerFive extends React.Component {
  render() {
    return <p>Answer Five</p>
    
  }
}

class AnswerSix extends React.Component {
  render() {
    return <p>Answer Six</p>
    
  }
}

class AnswerSeven extends React.Component {
  render() {
    return <p>Answer Seven</p>
    
  }
}

class AnswerEight extends React.Component {
  render() {
    return <p>Answer Eight</p>
    
  }
}

class FirstStrike extends React.Component {
  render() {
    return <p>X</p>
    
  }
}

class SecondStrike extends React.Component {
  render() {
    return <p>X</p>
    
  }
}

class ThirdStrike extends React.Component {
  render() {
    return <p>X</p>
    
  }
}

function dataGrab(){
  const [data, setData] = useState(null);
  const username = 'drew';
  const password = 'Dv27232723';
  const base64_encoded_credentials = btoa(`${username}:${password}`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/question/', {
        headers: {
          'Authorization': `Basic ${base64_encoded_credentials}`
        }
      });   
        const vals = await response.text();

        // To Do: Parse vals into json and map over it to get the question and answers

        console.log(vals);
        console.log(typeof(vals))
        console.log(vals[0]);
        console.log(vals[0].id);
        var data = JSON.parse();
        console.log("data: ", data);
        setData(data);
    };

    fetchData();
  }, []);
  
  return (

    <div>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>

  );
}


export default function Page() {
  return (
    <body>
      <div className="ff-logo">
        <img src="./images/family-fued.png" alt="Family Fued Logo" />
      </div>

      <div className="top-section">
          <div className='top-teamone-points'>
            <div>
              Team 1
            </div>
            <div>
              <TeamOnePoints></TeamOnePoints>
            </div>
          </div>
          <div className="top-round-info">
            <div className="round-number-area">
              Round <RoundNumber></RoundNumber>
            </div>
            <div>
              <RoundPoints></RoundPoints>
            </div>
          </div>
          <div className="top-teamtwo-points">
            <div>
              Team 2
            </div>
            <div>
            <TeamTwoPoints></TeamTwoPoints>
            </div>
          </div>
      </div>

      <div className="bottom-section"> 
        <div className='left-questions-area'>
          <div>
            <AnswerOne></AnswerOne>
          </div>
          <div>
            <AnswerTwo></AnswerTwo>
          </div>
          <div>
            <AnswerThree></AnswerThree>
          </div>
          <div>
            <AnswerFour></AnswerFour>
          </div>
        </div>
        <div className="strikes-area">
          <div>
            <FirstStrike></FirstStrike>
          </div>
          <div>
            <SecondStrike></SecondStrike>
          </div>
          <div>
            <ThirdStrike></ThirdStrike>
          </div>
        </div>
        <div className='right-questions-area'>
          <div>
            <AnswerFive></AnswerFive>
          </div>
          <div>
            <AnswerSix></AnswerSix>
          </div>
          <div>
            <AnswerSeven></AnswerSeven>
          </div>
          <div>
            <AnswerEight></AnswerEight>
          </div>
        </div>
      </div>
    </body>
  );
}


