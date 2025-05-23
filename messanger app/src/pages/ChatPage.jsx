import { useState } from 'react';
import Chat from '../components/Chat.jsx';
import VideoCall from '../components/VideoCall.jsx';

function ChatPage() {
  const [showVideoCall, setShowVideoCall] = useState(false);

  return (
    <div>
      <Chat />
      <button onClick={() => setShowVideoCall(!showVideoCall)}>
        {showVideoCall ? 'End Video Call' : 'Start Video Call'}
      </button>
      {showVideoCall && <VideoCall />}
    </div>
  );
}

export default ChatPage