import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'
import ActiveChannel from './ActiveChannel.jsx'
import { addMessage } from '../slices/messagesSlice.js'
import socket from '../socket.js'
import { useTranslation } from 'react-i18next'
import { useRollbar } from '@rollbar/react'

const Messages = ({ currentChannelId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages.messages)
  const channels = useSelector(state => state.channels.channels)
  const username = useSelector(state => state.auth.username)
  const rollbar = useRollbar()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    try {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
    catch (error) {
      console.error('Scroll error:', error)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentChannelId])

  useEffect(() => {
    const handleNewMessage = (message) => {
      try {
        dispatch(addMessage(message))
      }
      catch (error) {
        rollbar.error('Ошибка при отправке сообщения', error, {
          channelData: message,
          component: 'Messages',
          action: 'handleNewMessage',
        })
      }
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [dispatch, rollbar])

  const channelMessages = messages.filter(
    message => message.channelId === currentChannelId,
  )
  const activeChannelData = channels.find(
    channel => channel.id === currentChannelId,
  )

  if (!activeChannelData) {
    return (
      <div className="col p-0 h-100">
        <div className="alert alert-warning">{t('chat.noFoundChannel')}</div>
      </div>
    )
  }

  if (channelMessages.length === 0) {
    return (
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <ActiveChannel
            channelName={activeChannelData.name}
            messagesCount={0}
          />
          <div
            id="messages-box"
            className="chat-messages overflow-auto px-5"
          >
            <div className="text-center text-muted py-4">
              {t('chat.zeroMessages')}
            </div>
          </div>
          <div className="mt-auto px-5 py-3">
            <MessageForm
              currentChannelId={currentChannelId}
              username={username}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ActiveChannel
          channelName={activeChannelData.name}
          messagesCount={channelMessages.length}
        />
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {channelMessages.map(message => (
            <Message
              message={message}
              key={message.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm
            currentChannelId={currentChannelId}
            username={username}
            onMessageSent={scrollToBottom}
          />
        </div>
      </div>
    </div>
  )
}

export default Messages
