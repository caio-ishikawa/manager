// VIDEO GETS CALLED TOO MANY TIMES //


import { makeStyles } from '@mui/styles';
import { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer';
import styled from "styled-components";
import io from 'socket.io-client';


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const classes = useStyles();
    const socketRef = useRef(); 
    const email = props.email;
    const roomID = props.server + "General";
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    socketRef.current = io.connect('http://localhost:3002/');


    useEffect(() => {
        console.log("CREATE")
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userVideo.current.srcObject = stream;
                socketRef.current.emit("joined video", roomID);
                socketRef.current.on("all users", users => {
                    const peers = [];
                    users.usersInTheRoom.forEach(userID => {
                        console.log('at least ths')
                        const peer = createPeer(userID, socketRef.current.id , stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push(peer);
                    })
                    setPeers(peers);
                })
                socketRef.current.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })
                    setPeers(users => [...users, peer]);
                });
                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                })
            })
            return () => {
                socketRef.current.disconnect();
              }
    },[]);

    const createPeer = (userToSig, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSig, callerID, signal });
        });
        console.log("PEER: ", peer);

        return peer;
    };

    const addPeer = (incomingSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        });

        peer.signal(incomingSignal);
        return peer;
    }

    return(
        <div className={classes.box}>
            <Container>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, idx) => (
                    <Video key={idx} peer={peer}/>
                ))}
            </Container>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "93.7vh",
        backgroundColor: "#393941",
    },
});

export default Video;