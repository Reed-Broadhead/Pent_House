import { v1 as uuid } from "uuid";
import Peer from "peerjs";

export default function NewRoom() { 

    const createRoom = (props : any) => {
        console.log("createRoom");
        const id = uuid();
        props.histroy.push(`/room/${id}`);
    };

    // const peer = new Peer("yo", { 
    //     host: "localhost",
    //     port: 5000,
    //     path: "/",
    // })

    const mediaConnection = peer.call('another-peers-id', stream);


    const conn = peer.connect('another-peers-id');


    return (

        <button onClick={() => createRoom()}> stuff</button>
    )
};



// calling peer
// Assuming you have already got a local stream somehow
const localStream = /* ... */;

const peer = new Peer();

// Call a peer, assuming you know their ID
const call = peer.call('other-peer-id', localStream);

// Handle the stream from the other peer
call.on('stream', remoteStream => {
  // Use the remote stream in your application
});


// 
// accepting call
peer.on('call', call => {
    // Answer the call with an A/V stream
    call.answer(localStream);
  
    // Receive data from the caller
    call.on('stream', remoteStream => {
      // Use the remote stream in your application
    });
  });
  