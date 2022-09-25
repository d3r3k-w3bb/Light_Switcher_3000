import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
// import { Button } from './components/Button';
import { Toggle } from './components/Toggle';
import React from 'react';
import { Widget } from './components/Widget';
import { ButtonArray } from './components/ButtonArray';
import io from 'socket.io-client';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import {Tabs, Tab} from '@mui/material';


const roomList = [
  {
    name: 'Kitchen',
    inputs: []
  },
  {
    name: 'Living Room'
  },
  {
    name: 'Bedroom'
  }
];

// Create socketio connection to websocket server on port 5000
const socket = io('http://192.168.254.75:5000');

// Listen for 'connect' event from websocket server
socket.on('connect', () => {
  console.log('Connected to websocket server');
});

// send fetchRoomList websocket event
const fetchRoomList = () => {
  console.log("Fetching room list");
  socket.emit('fetchRoomList');
}

function App() {
  const [rooms, setRooms] = React.useState([]);
  const [activeRoom, setActiveRoom] = React.useState(0);
  const [isOn, setIsOn] = React.useState(false);
  
  useEffect(() => {
    socket.on('roomsInfo', (data) => {
      console.log(data);
      setRooms(data);
    });
    fetchRoomList();
  }, []);


  return (
    <Wrapper>
      <Title>PyHome</Title>
      <Tabs value={activeRoom} aria-label="basic tabs example" textColor='#FFFFFF'>
        {rooms.map((room, i) => <Tab label={room.name} onClick={() => setActiveRoom(i)} />)}
      </Tabs>
      <Button variant="contained" onClick={fetchRoomList}>Fetch Room List</Button>
      
      
      
      <Widget title="Light Switch">
        <Toggle isOn={isOn} handleToggle={() => setIsOn(!isOn)}>TEST</Toggle>
      </Widget>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  text-align: center;
  background: linear-gradient(0deg, rgba(15,24,24,1) 0%, rgba(24,52,45,1) 100%);
  height: 100vh;
  color: #FFFFFF;
  padding: 16px;
  
  grid-template-columns: repeat(1, auto);
  display: flex;
  flex-direction: column;
  > * {
    margin: 8px 0;
  }
`;

const Title = styled.div`
  font-family: 'Secular One', sans-serif;
  font-size: 24px;
  color: #FFFFFF;
  display: flex;
  justify-content: start;
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

