import React from 'react';
import ComponentOne from './components/ComponentOne/ComponentOne';
import EventsDemo from './components/EventsDemo/EventsDemo';
import ListDemo from './components/ListDemo/ListDemo';
import ParentComponent from './components/Props/ParentComponent/ParentComponent';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Hook from './components/Hook/Hooks';
import MyClassComponent from './components/ClassComponent/MyClassComponent';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<ComponentOne/>}/>
        <Route path="/props" element={<ParentComponent/>}/>
        <Route path="/events" element={<EventsDemo/>}/>
        <Route path="/lists" element={<ListDemo/>}/>
        <Route path="/hooks" element={<Hook/>}/>
        <Route path="/class" element={<MyClassComponent/>}/>

      </Routes>
    </div>
  );
}

export default App;
