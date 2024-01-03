import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
// import io from 'socket.io'
import { io } from 'socket.io-client';

function App() {
 
  
  useEffect (() => {
 
    const socket = io('http://localhost:3000/');

    axios.get('http://localhost:3000/')
    .then(res => {
      console.log(res)
    })
    
    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])

  return (
    <>
      <div className='border'>
        hello world
      </div>
    </>
  )
}

export default App
