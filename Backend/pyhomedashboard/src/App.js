import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Button } from './components/Button';
import { Toggle } from './components/Toggle';
import React from 'react';
import { Widget } from './components/Widget';
import { ButtonArray } from './components/ButtonArray';

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



function App() {
  const [activeRoom, setActiveRoom] = React.useState(0);
  const [isOn, setIsOn] = React.useState(false);
  return (
    <Wrapper>
      <Title>PyHome</Title>
      <RoomWrapper>
        {roomList.map((room, i) => <Button onClick={() => setActiveRoom(i)} pressed={i === activeRoom}>{room.name}</Button>)}
      </RoomWrapper>
      {/* <ButtonArray>
        <Button>Morning</Button>
        <Button>Night</Button>
      </ButtonArray> */}
      <Widget title="Light Switch">
        <Toggle isOn={isOn} handleToggle={() => setIsOn(!isOn)}>TEST</Toggle>
      </Widget>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  text-align: center;
  background: rgb(15,24,24);
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

