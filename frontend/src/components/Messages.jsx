import { useSelector } from 'react-redux';
import Message from './Message';
import MessageForm from './MessageForm';
import ActiveChannel from './ActiveChannel.jsx';

const Messages = ({ currentChannelId }) =>  {
    const messages = useSelector((state) => state.messages.messages)
    const channelMessages = messages.filter((message) => message.channelId === currentChannelId)

    const channels = useSelector((state) => state.channels.channels)
    const activeChannelData = channels.find((channel) => channel.id === currentChannelId);

    const username = useSelector((state) => state.auth.username);

    return (
      <div className='col p-0 h-100'>
        <div className='d-flex flex-column h-100'>
          <ActiveChannel
            activeChannelData={activeChannelData}
            channelMessages={channelMessages}
          />         
          <div id='messages-box' className='chat-messages overflow-auto px-5'>
            {channelMessages.map((message) => (
              <Message 
                message={message}
                key={message.id}
              />
            ))}
            <div className='mt-auto px-5 py-3'>
              <MessageForm currentChannelId={currentChannelId} username={username}/>
            </div>                      
          </div>
        </div>
      </div>
    )
}

export default Messages

// GET /api/v1/messages

// axios.get('/api/v1/messages', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// }).then((response) => {
//   console.log(response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
// });