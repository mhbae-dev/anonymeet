import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState } from 'react'
import DateSelector from './dateSelector';

const RoomSetup = (props) => {
  let navigate = useNavigate();
  
  // ---------------
  // STATE HANDLING
  // ---------------

  const dateSelector = <DateSelector/>

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  today = dd + '/' + mm + '/' + yyyy;

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [friendCount, setFriendCount] = useState(3);

  const handleStartDate = (event) => {
    setStartDate(event.target.value)
  }
  const handleEndDate = (event) => {
    setEndDate(event.target.value)
  }
  const handleFriendCount = (event) => {
    setFriendCount(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const intFriendCount = Number(friendCount)

    const ratings = new Array(intFriendCount).fill([])

    // let state = {
    //   roomID: 1,
    //   startDate: startDate,
    //   endDate: endDate,
    //   friendCount: intFriendCount,
    //   friendCurrent: -1,
    //   roomFormsRatings: ratings,
    //   }

    props.createRoom({startDate: startDate, endDate: endDate, friendCount: intFriendCount, roomFormsRatings: ratings},navigate)

    // console.log(state);
    // proceedToRoom(state)
  }

  // ---------------
  // NAV HANDLING
  // ---------------
  


  const proceedToRoom = (stateParams) => {
    navigate(`../room/${props.getRoomId()}`, { state: stateParams });
  }

  return (
    <div className="roomsetup">
      <div className="roomsetup_form">
        <form onSubmit={handleSubmit}>
          <DateSelector/> 
          {/* <label>Start Dates
            <input 
              type='date' 
              placeholder='dd/mm/yyyy'
              name="startDate"
              value={startDate}
              onChange={handleStartDate}
            ></input>
          </label>
          <label>End Date
            <input 
              type='date' 
              placeholder='dd/mm/yyyy'
              name="endDate"
              value={endDate}
              onChange={handleEndDate}>
            </input>
          </label> */}
          <label>Number of Attendees
            <input
              type='number'
              name="friendCount"
              value={friendCount}
              onChange={handleFriendCount}>  
            </input>
          </label>
          <button type='submit' 
          // onClick={() => { navigate("../room");}}
          >
            Submit Preferences
          </button>
        </form>   
      </div>
    </div>
  )
}

export default RoomSetup
