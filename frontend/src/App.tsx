import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from "./components/screens/LoginScreen";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./components/screens/HomeScreen";
import DocumentScreen from "./components/screens/DocumentScreen";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/signup" element={<SignupScreen/>}/>
          <Route path="/document/:documentId" element={<DocumentScreen/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
