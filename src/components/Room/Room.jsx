import "./room.scss";
import ResponseForm from "./ResponseForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import finalResult from "../../helpers/calculation.js"
import day from "../../helpers/day.js";

const Room = (props) => {
  // -------------------
  // HANDLING ROOM DATA
  // -------------------
  
  const urlRoomID = useParams().roomidnum.slice(1)
  if (props.getRoomId() !== urlRoomID) props.setRoom(urlRoomID)

  const state = props.getRoom()

  const [buttonStatus, setButtonStatus] = useState(true);
  const [buttonClass, setButtonClass] = useState("");

  // ---------------
  // NAV HANDLING
  // ---------------

  let navigate = useNavigate();

  const proceedToRoomForm = (stateParams) => {
    navigate(`../room-form/:${state.roomID}`, { state: stateParams });
  };


  // GREY BUTTON OUT AFTER ROOMFORM IS SUBMITTED

  const determineClass = (index) => { 
    if (state.roomFormsRatings[index].length > 0) {
      return 'clickDiddyClick'
    } else {
      return 'button'
    }
  }

  const handleSubmit = (e, index) => {           

    setButtonClass("buttonOnClick");

    let params = {
      roomID: state.roomID,
      startDate: state.startDate,
      endDate: state.endDate,
      friendCount: state.friendCount,
      friendCurrent: index,
      roomFormsRatings: state.roomFormsRatings,
    };

    // DISABLES LINK TO ROOM IF FORM HAS BEEN SUBMITTED
    if(determineClass(index) === 'clickDiddyClick') {
      console.log("Form has been submitted, form is not accessible")
    } else {
      proceedToRoomForm(params);
    }
  };

  const setResult = () => {
    const roomForms = state.roomFormsRatings
    if(!finalResult.isReady(roomForms)) return <h2>Waiting for results...</h2>
    const results = finalResult.getFinalResult(roomForms);
    return (
      <div>
        <h2>SUCCESS!</h2>
        <p>The best day for everyone:</p>
        <p className="result">{day.toCalDate(state.startDate, results.best)}</p>
        <p>Gold: {results.bestMedals[0]}, Silver: {results.bestMedals[1]}, Bronze: {results.bestMedals[2]}, Unavailable: {results.bestMedals[3]}</p>
      </div>
    );
  };

  console.log('Room.jsx state: ', state);

  console.log(
    `Friend count: ${state.friendCount}, array: [${state.roomFormsRatings}]`
  );
  
  return (
    <div className="room">
      <h1>Welcome to your Room!</h1>
      <div className="clickableLink">
        <button value={`localhost:3000/room/:${urlRoomID}`} onClick={() => {navigator.clipboard.writeText(`localhost:3000/room/:${urlRoomID}`)}}>Copy Shareable Link</button>
      </div>
      <div className="dataContainer">
        <h3>You'll be meeting up between:</h3>
        <p>
          {state.startDate} - {state.endDate}
        </p>
      </div>
      <div className="responseFormContainer">
        <h3>Choose a response to fill out:</h3>
        <div className="container">
          {Array.from(Array(Number(state.friendCount)).keys()).map( 
            (user, index) => (
              <ResponseForm
                className={determineClass(index)} 
                id={index}
                user={user}
                onClick={(e) => handleSubmit(e, index)}
              />
            )
          )} 
        </div>
      </div>
      <div className="resultContainer">{setResult()}</div>
    </div>
    
  );
};

export default Room;
