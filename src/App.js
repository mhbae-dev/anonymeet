import "./app.scss";
import Room from "./components/Room/Room";
import Landing from "./components/Landing/Landing";
import RoomSetup from "./components/RoomSetup/RoomSetup";
import RoomForm from "./components/RoomForm/RoomForm";
import * as ReactDOM from "react-dom";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import expressLink from "./helpers/expressLink.js";

function App() {
  // =====================
  // EXPRESS API STATE
  // =====================
  const initState = {
      roomData: {
        roomID: "xxxxxxxxxxx",
        startDate: "2000-01-01",
        endDate: "2000-01-02",
        friendCount: 1,
        roomFormsRatings: [[]],
      },
    },
    [apiState, setApiState] = useState(initState);

  // =====================
  // EXPRESS FUNCTIONS
  // =====================

  // Sets the current Room Data set to equal that of the passed roomID
  const setRoom = (roomID) => expressLink.getRoomData(roomID, setApiState);

  // Edits data in the Room with roomID, implementing roomState into it
  const editRoom = (roomID, roomState) =>
    expressLink.putRoomData(roomID, roomState, setApiState);

  // Creates a new Room; goes to the relevant room if goToRoom === true
  const createRoom = (roomState, navigate, goToRoom = true) =>
    expressLink.postRoomData(roomState, setApiState, goToRoom, navigate);

  const roomData = () => apiState.roomData;

  // =====================
  // RENDERING
  // =====================

  const pageContent = () => {
    const myRoomID = roomData().roomID;
    return (
      <div className="App">
        <p>
          <span>{myRoomID} - </span>
          <button onClick={() => expressLink.resetRoomData(setApiState)}>
            Reset Database
          </button>
            <span></span>
        </p>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="setup"
              element={
                <RoomSetup
                  createRoom={(rState, setCur) => createRoom(rState, setCur)}
                  getRoomId={() => myRoomID}
                />
              }
            />
            <Route
              path={`room/:roomidnum`}
              component={myRoomID}
              element={
                <Room
                  setRoom={(id) => setRoom(id)}
                  getRoom={() => roomData()}
                  getRoomId={() => myRoomID}
                />
              }
            />
            <Route
              path="room-form/:roomidnum"
              component={myRoomID}
              element={
                <RoomForm
                  setRoom={(id) => setRoom(id)}
                  getRoom={() => roomData()}
                  getRoomId={() => myRoomID}
                  editRoom={(id, state) => editRoom(id, state)}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

  return pageContent();
}

export default App;
