'use client'

import React, { useState, useEffect } from 'react';
import './page.css';


function Answers(){
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
        const vals = await response.json();
        console.log(vals);
        console.log(vals[0]);
        console.log(vals[0].id);
        var data = JSON.stringify(vals);
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
              Current Points
            </div>
          </div>
          <div className="top-round-info">
            <div>
              Round #
            </div>
            <div>
              Pts Revealed
            </div>
          </div>
          <div className="top-teamtwo-points">
            <div>
              Team 2
            </div>
            <div>
              Current Points
            </div>
          </div>
      </div>

      <div className="bottom-section"> 
        <div className='left-questions-area'>
          <div>
            <Answers></Answers>
          </div>
          <div>
            Answer 2
          </div>
          <div>
            Answer 3
          </div>
          <div>
            Answer 4
          </div>
        </div>
        <div className="strikes-area">
          <div>
            X
          </div>
          <div>
            X
          </div>
          <div>
            X
          </div>
        </div>
        <div className='right-questions-area'>
          <div>
            Answer 5
          </div>
          <div>
            Answer 6
          </div>
          <div>
            Answer 7
          </div>
          <div>
            Answer 8
          </div>
        </div>
      </div>
    </body>
  );
}


