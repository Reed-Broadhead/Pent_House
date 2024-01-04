import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
// import io from 'socket.io'
import Room from './components/Room'
import NewRoom from './components/NewRoom'

function App() {
 
  return (
    <>
      <div className='border'>
        hello world
      </div>
      <Room />
      {/* <NewRoom props={"hi"}/> */}
    </>
  )
}

export default App
