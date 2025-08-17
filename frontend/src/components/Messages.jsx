import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import ActiveChannel from './ActiveChannel.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import socket from '../socket.js';

const Messages = ({ currentChannelId }) =>  {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages)
  const channels = useSelector((state) => state.channels.channels)
  const username = useSelector((state) => state.auth.username);
  
  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [dispatch]);
  
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId)
  console.log(messages)
  const activeChannelData = channels.find((channel) => channel.id === currentChannelId);
  console.log(channels)

  if (!activeChannelData) {
    return (
      <div className="col p-0 h-100">
        <div className="alert alert-warning">Канал не найден</div>
      </div>
    );
  }

  if (channelMessages.length === 0) {
    return (
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <ActiveChannel
            channelName={activeChannelData.name}
            messagesCount={0}
          />
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            <div className="text-center text-muted py-4">Нет сообщений в этом канале</div>
          </div>
          <div className="mt-auto px-5 py-3">
            <MessageForm currentChannelId={currentChannelId} username={username} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ActiveChannel
          channelName={activeChannelData.name}
          messagesCount={channelMessages.length}
        />
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {channelMessages.map((message) => (
            <Message 
              message={message}
              key={message.id}
            />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm currentChannelId={currentChannelId} username={username} />
        </div>
      </div>
    </div>
  );
};

export default Messages
