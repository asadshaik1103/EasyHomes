import React, { useEffect, useRef, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

// import { initialize } from './peerjs-utils';
import Peer from "simple-peer";

var stompClient =null;
const ChatRoom = () => {
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState(null);


    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const userAudio = useRef();

    const connect =()=>{
        let Sock = new SockJS('http://192.168.0.7:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                // parse public chat message in JSON format and check for type offer
                if(JSON.parse(payloadData.message).type === 'offer') {
                    // create peer object
                    // initiliazePeerWithAnswer(JSON.parse(payloadData.message));


                    console.log("answer data: ", JSON.parse(payloadData.message));
                    setReceivingCall(true);
                    // setCaller(data) // TODO set when user authentication is completed
                    setCallerSignal(JSON.parse(payloadData.message).signal);
                } else if (JSON.parse(payloadData.message).type === 'answer') {
                    // set peer answer
                    // peer1.signal(JSON.parse(payloadData));
                    // console.log("answer received");

                    console.log("answer data: ", JSON.parse(payloadData.message));
                    setCallAccepted(true);
                    peerCaller.signal(JSON.parse(payloadData.message).signal);
                    
                }
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendValueFromPeer1=(msg)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: msg,
            message: msg,
            status:"MESSAGE"
          };
          console.log(chatMessage);
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
}

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }

    let peer1 = null;
    let peer = null;

    const initiliazePeerWithOffer = () => {
        peer = new Peer({
            initiator: true,
            trickle: false,
            mediaStream
        });
        peer.on('signal', data => {
            console.log(data);
            sendValueFromPeer1(data);
        });

        peer.on('data', data => {
            console.log(data);
        });

        peer.on('stream', stream => {
            console.log(stream);
        });

        peer.on('close', () => {
            console.log('peer close');
        });

        peer.on('error', err => {
            console.log(err);
        });

        peer.on('connect', () => {
            console.log('peer connect');
        });

        peer.on('disconnect', () => {
            console.log('peer disconnect');
        });
    }

    const initiliazePeerWithAnswer = (payload) => {
        peer = new Peer({
            initiator: false,
            trickle: false,
            stream: mediaStream
        });

        peer.on('signal', data => {
            console.log(data);
            // sendValueFromPeer1(data);
            // peer.signal(data);
            sendValueFromPeer1(JSON.stringify(data)); // send data to caller
        });

        peer.on('stream', stream => {
            console.log('peer 2 STREAM  ', stream);            
        })

        peer.signal(payload);

        // peer.on('data', data => {
        //     console.log(data);
        // });

        // peer.on('stream', stream => {
        //     console.log(stream);
        // });

        // peer.on('close', () => {
        //     console.log('peer 2 close');
        // });

        // peer.on('error', err => {
        //     console.log(err);
        // });

        // peer.on('connect', () => {
        //     console.log('peer 2 connect');
        // });

        // peer.on('disconnect', () => {
        //     console.log('peer 2 disconnect');
        // });
    }

    const connectToPeer = (stream) => {
        // initialize();
        // connect(); // peer 1 connects the server
        peer1 = new Peer({ initiator: true, trickle: false, stream: mediaStream });
        peer1.on('signal', data => {
            console.log('SIGNAL', JSON.stringify(data));
            onConnected();
            sendValueFromPeer1(JSON.stringify(data));
        });

        peer1.on('connect', () => {
            // wait for 'connect' event before using the data channel
            peer1.send('hey peer2, how is it going?');
        })

        // initiliazePeerWithOffer()
    }

    const connectToPeer1FromPeer2 = () => {
        // initialize();
        // connect(); // peer 2 connects the server
        const peer2 = new Peer({ initiator: false, trickle: false });
        peer2.on('signal', data => {
            console.log('SIGNAL', JSON.stringify(data));
            onConnected();
            sendValueFromPeer1(JSON.stringify(data));
        });

        peer2.on('connect', () => {
            console.log('CONNECT');
            peer2.send('hey peer1, how are you?');
        });

        peer2.on('stream', stream => {
            console.log('peer 2 STREAM  ', stream);            
        })

        // connect();
    }

    const [mediaStream, setMedaStream] = useState(null);
    const userAudioToPlay = useRef();
    useEffect(()=>{
        connect();
        // connectToPeer1FromPeer2();
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
            setMediaStream(stream);
            // initiliazePeerWithOffer();
            // if (userAudioToPlay.current) {
            //   userAudioToPlay.current.srcObject = stream;
            // }
        })
        .catch(err => {
            console.log(err);
        });

        // TODO add socket events in onMessage of sprintboot socket receiver
    },[]);

    let peerCaller;
    const callPeer = () => {
      peerCaller = new Peer({
        initiator: true,
        trickle: false,
        config: {
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302'
            }
          ]
        },
        stream: mediaStream
      });

      peerCaller.on('signal', data => {
        console.log(data);
        sendValueFromPeer1({ intent: 'call', signalData: data });
      });

      peerCaller.on('stream', stream => {
        console.log('peer caller STREAM  ', stream);
        if (userAudioToPlay.current) {
          userAudioToPlay.current.srcObject = stream;
        }
      });
    }

    const setupCall = () => {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then(stream => {
                // setUserData({...userData,"stream": stream});
                // peer.addStream(stream);
                // peer.on('stream', stream => {
                //     setUserData({...userData,"stream": stream});
                // });
                console.log(stream);
                connectToPeer(stream);
                setMedaStream(stream);
                if (userAudio.current) {
                    userAudio.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
              
        </div>}
        <div>
            <button type="button" onClick={() => { setupCall() }}>
                    connect from peer 1
            </button>

            <button type="button" onClick={() => { connectToPeer1FromPeer2() }}>
                    receive from peer 2
            </button>
        </div>
        {/* { <audio id="audio" autoPlay muted></audio>} */}
        <audio style={{'display': 'none'}} id="audio1" autoPlay ref={userAudio}></audio>
    </div>
    )
}

export default ChatRoom
