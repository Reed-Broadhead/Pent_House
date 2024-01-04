import React, { useEffect, useRef, useState } from "react";
import { v1 as uuid } from "uuid";
// import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";

export default function Room() {
    const [socket, setSocket] = useState<any>(null);
    const [userInput, setUserInput] = useState<string>(""); 
    const userVideo = useRef<any>(null);
    const remoteVideo = useRef<any>(null);
    // const [code, setCode] = useState<string>("");
    // const [peer, setPeer] = useState<any>(null);
    

    const code = uuid()
    
    const peer = new Peer(code, { 
        port: 8200,
        path: "/",
    })

    useEffect(() => {
        
        // setCode(uuid());


        console.log(peer);
        
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
            userVideo.current.srcObject = stream;
        })

        peer.on('call', (call : any) => {
            // Answer the call with an A/V stream
            call.answer(userVideo.current.srcObject);
          
            // Receive data from the caller
            call.on('stream', (remoteStream : any) => {
              // Use the remote stream in your application
                remoteVideo.current.srcObject = remoteStream;
            });
          });


        console.log(window.location.href);

        const socket = io("http://localhost:5000");
        setSocket(socket);

        socket.on("yourID", (id) => {
            console.log(`connected user id:${id}` );
        });

        // setCode(code);
        // setPeer(peer);
    }, []);

    const makeCall = (userInput : string) : void => {

        console.log(userInput);

        const call = peer.call(userInput, userVideo);

        call.on('stream', remoteStream => {
            remoteVideo.current.srcObject = remoteStream;
          });
    }

    return (
        <div>
            <h1>Room</h1>
            <h1>my code is: {code}</h1>
            <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} />
            <button onClick={() => makeCall(userInput)}>room</button>
            <video className="border" autoPlay ref={userVideo}/> 
            <video className="border" autoPlay ref={remoteVideo}/>
        </div>
    );
}