import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket.js';

function VideoCall() {
  const { contactId } = useParams();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const startCall = async () => {
      try {
        const pc = new RTCPeerConnection();
        setPeerConnection(pc);

        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream;
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('iceCandidate', { candidate: event.candidate, to: contactId });
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { offer, to: contactId });

        socket.on('answer', async (answer) => {
          await pc.setRemoteDescription(answer);
        });

        socket.on('iceCandidate', async (candidate) => {
          await pc.addIceCandidate(candidate);
        });
      } catch (err) {
        console.error('WebRTC error:', err);
      }
    };

    startCall();

    return () => {
      if (peerConnection) peerConnection.close();
      socket.off('answer');
      socket.off('iceCandidate');
    };
  }, [contactId]);

  return (
    <div>
      <h2>Video Call</h2>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
}

export default VideoCall