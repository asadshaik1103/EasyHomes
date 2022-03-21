
import Button from '@mui/material/Button';

const VideoCallWebRTC = (props) => {
  //////////////////////////
  const peerConnection = null;
  const dataChannel = null;
  const callSocket = (event) => {
    if (event) {
      event.preventDefault()
    }
    console.log("calling socket");
    const signaling = new WebSocket('ws://127.0.0.1:8080');

    const configuration = null;
    // const configuration = {
    //   iceServers: [
    //     {
    //       urls: 'stun:stun.l.google.com:19302'
    //     }
    //   ]
    // };
    // peerConnection = new RTCPeerConnection(configuration);

    // dataChannel = peerConnection.createDataChannel("dataChannel", { reliable: true });

    // dataChannel.onerror = function(error) {
    //   console.log("Error:", error);
    // };
    // dataChannel.onclose = function() {
    //     console.log("Data channel is closed");
    // };

    // peerConnection.createOffer(function(offer) {
    //   send({
    //       event : "offer",
    //       data : offer
    //   });
    //   peerConnection.setLocalDescription(offer);
    //   }, function(error) {
    //       // Handle error here
    //   }
    // );

    // peerConnection.onicecandidate = function(event) {
    //   if (event.candidate) {
    //       send({
    //           event : "candidate",
    //           data : event.candidate
    //       });
    //   }
    // };

    // peerConnection.addIceCandidate(new RTCIceCandidate(candidate));

    // peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // peerConnection.createAnswer(function(answer) {
    //   peerConnection.setLocalDescription(answer);
    //     send({
    //         event : "answer",
    //         data : answer
    //     });
    // }, function(error) {
    //     // Handle error here
    //     console.error("Error when creating an answer: ", error);
    // });

  }

  const answerCall = (event) => {
    if (event) {
      event.preventDefault()
    }
    console.log("answering call");
  }

  const sendMessage = (event) => {
    if (event) {
      event.preventDefault()
    }
    console.log("sending message");
  }

  // const handleAnswer = (answer) => {
  //   peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  // }

  // const sendMessage = (message) => {
  //   dataChannel.send(message);
  // }

  // // dataChannel.send(“message”);

  // dataChannel.onmessage = (event) => {
  //   console.log("Message:", event.data);
  // };

  //////////////////////////
  return (
    <div>
      <div>
        <h1>VideoCallWebRTC</h1>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={callSocket}
          sx={{ mt: 3, mb: 2 }}
        >
          Call
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={answerCall}
          sx={{ mt: 3, mb: 2 }}
        >
          Answer
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={sendMessage}
          sx={{ mt: 3, mb: 2 }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default VideoCallWebRTC;