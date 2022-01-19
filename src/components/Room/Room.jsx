import "./room.scss";
import ResponseForm from "./ResponseForm";
import Results from "./Results";
import Modal from "./Modal";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import finalResult from "../../helpers/calculation.js";
import day from "../../helpers/day.js";
import { Link } from "react-scroll";

const Room = (props) => {
  // -------------------
  // HANDLING ROOM DATA
  // -------------------

  const urlRoomID = useParams().roomidnum.slice(1);
  if (props.getRoomId() !== urlRoomID) props.setRoom(urlRoomID);

  const state = props.getRoom();

  const [isOpen, setIsOpen] = useState(false);

    console.log(`this is trying to see what system is pulling ${ props }`)
  // ---------------
  // NAV HANDLING
  // ---------------

  let navigate = useNavigate();

  const proceedToRoomForm = (stateParams) => {
    navigate(`../room-form/:${state.roomID}`, { state: stateParams });
  };

  // -------------------
  // HANDLING CLICKS
  // -------------------

  const handleCopySharableLink = (e) => {
    navigator.clipboard.writeText(`localhost:3000/room/:${urlRoomID}`)
    .then(() => {
      alert(`Your shareable link\n localhost:3000/room/:${urlRoomID}\n has been copied to the clipboard.`)
    })
    e.preventDefault();
  };

  const handleResponseFormClick = (e, index) => {
    let params = {friendCurrent: index};
    if (responseFormClass(index) === "clickDiddyClick") {
      console.log("Form has been submitted, form is not accessible");
    } else {
      proceedToRoomForm(params);
    }
  };

  // -------------------
  // FORMATTING
  // -------------------

  const responseFormClass = (index) => (state.roomFormsRatings[index].length > 0) ? "clickDiddyClick" : "button";

  // -------------------
  // RENDER ELEMENTS
  // -------------------

  const renderBackground = () => (
      <>
        <div className="wave1Container"><img src="/assets/Room/wave1.png" alt="background wave" /></div>
        <div className="wave2Container"><img src="/assets/Room/wave2.png" alt="background wave" /></div>
        <div className="calImg"><img src="/assets/Room/Saly-42.png" alt="Calendar" /></div>
      </>
    )

  // Include the Home button, Hamburger and Down arrows
  const renderIcons = () => (
      <>
      <div
          className="homebtnContainer"
          onClick={() => {
            navigate("../");
          }}
        >
        <img src="/assets/Home.png" alt="Home Button" />
      </div>
      <div className="hambtnContainer">
        <img src="/assets/Hamburger_menu.png" alt="Hamburger Menu Button" />
      </div>
      <div className="downarrContainer">
        <Link to="results" spy={true} smooth={true}>
          <img src="/assets/Expand_down_double.png" alt="Home Button" />
        </Link>
      </div>
      </>
    )

  const renderTopButtons = () => (
      <>
        <div className="btnContainer">
          <button
            value={`localhost:3000/room/:${urlRoomID}`}
            onClick={() => {
              handleCopySharableLink();
            }}
          >Copy Shareable Link</button>
          <button onClick={() => setIsOpen(true)}>Edit Room set-up</button>
        </div>
      </>
    )
  
  const renderMainContent = () => (
    <>
      <h1>Welcome to your Room!</h1>
      {renderTopButtons()}
      <div className="MainContent">
        <div className="dataContainer">
          <h3>When are you available for a meetup between:</h3>
          <p>{day.display(state.startDate)} - {day.display(state.endDate)}</p>
        </div>
        <div className="responseFormContainer">
          <h3>Please complete one of the available Response Forms below.</h3>
          {renderResponseForms()}
        </div>
      </div>
      <p className="waiting">Waiting for results ...</p>
    </>
    )

  const renderResponseForms = () => (
      <>
        <div className="container">
          {Array.from(Array(Number(state.friendCount)).keys()).map(
            (user, index) => (
              <ResponseForm
                className={responseFormClass(index)}
                key={`responseForm${index}`}
                id={index}
                user={user}
                onClick={(e) => handleResponseFormClick(e, index)}
              />
            )
          )}
        </div>
      </>
    )

  // -------------------
  // RENDER
  // -------------------

  const mOCKaRRAY01 = [[2,0,1],[1,0,3],[2,0,1]] // No secondary
  const mOCKaRRAY02 = [[0,3,1],[1,0,1],[2,3,1]] // High score, secondary is free score
  const mOCKaRRAY03 = [[0,3,1],[1,0,1],[2,1,1]] // Free score, secondary is high score
  const mOCKaRRAY04 = [[0,0,0],[0,0,0],[0,0,0]] // Nothing

  return (
    <>
      <div id="room" className="room">
        {renderBackground()}
        {renderIcons()}
        {renderMainContent()}
        <Modal
          className="modal"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
      <Results id="results" formRatings={mOCKaRRAY02} date={state.startDate} />
    </>
  );
};

export default Room;

// const [buttonStatus, setButtonStatus] = useState(true);
// const [buttonClass, setButtonClass] = useState("");
// setButtonClass("buttonOnClick");

// const handleSubmit = (e, index) => {
//   setButtonClass("buttonOnClick");

//   let params = {
//     roomID: state.roomID,
//     startDate: state.startDate,
//     endDate: state.endDate,
//     friendCount: state.friendCount,
//     friendCurrent: index,
//     roomFormsRatings: state.roomFormsRatings,
//   };

//   if (determineClass(index) === "clickDiddyClick") {
//     console.log("Form has been submitted, form is not accessible");
//   } else {
//     proceedToRoomForm(params);
//   }
// };

// const setResult = () => {
  //   const roomForms = state.roomFormsRatings;
  //   if (!finalResult.isReady(roomForms))
  //     return <h2 className="waiting">Waiting for results...</h2>;
  //   const bestDay = finalResult.getBestDay(roomForms);
  //   const medalCounts = finalResult.medalCounts(roomForms, bestDay);
  //   if (bestDay < 0)
  //     return (
  //       <h2>
  //         No one is available on any date! <br></br> Perhaps try different
  //         dates?
  //       </h2>
  //     );
  //   return (
  //     <div>
  //       <h2>SUCCESS!</h2>
  //       <p>The best day for everyone:</p>
  //       <p className="result">{day.toCalDate(state.startDate, bestDay)}</p>
  //       <p>Gold: {medalCounts[0]}</p>
  //       <p>Silver: {medalCounts[1]}</p>
  //       <p>Bronze: {medalCounts[2]}</p>
  //     </div>
  //   );
  // };

  // console.log("Room.jsx state: ", state);

  // console.log(
  //   `Friend count: ${state.friendCount}, array: [${state.roomFormsRatings}]`
  // );