
import React,{useState} from 'react';
import './App.css';
import WorkerProfile from './components/WorkerProfile';
import {Routes, Route} from 'react-router-dom'
import { Fragment } from 'react';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import HangerLineOutput from './components/HangerLineOutput';
import ViewWokersOutput from './components/ViewWokersOutput';

function App() {
  const [loadProfile, setLoadProfile] = useState(false)
  return (
    
    <Container>
      <MyNavbar setLoadProfile={setLoadProfile} />
      
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path='/profile' element={<WorkerProfile />} />
       <Route path='/hanger' element={<HangerLineOutput />} />
       <Route path="/output" element={<ViewWokersOutput />} />
      </Routes>
    </Container>
  );
}

export default App;
