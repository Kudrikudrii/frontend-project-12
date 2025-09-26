import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setChannels } from '../slices/channelsSlice.js'
import routes from '../routes.js'
import getAuthToken from '../getAuthToken.js'
import axios from 'axios'
import Channels from '../components/Channels.jsx'
import Messages from '../components/Messages.jsx'
import { setMessages } from '../slices/messagesSlice.js'
import { useTranslation } from 'react-i18next'
import { useRollbar } from '@rollbar/react'
import { toast } from 'react-toastify'

const ChannelsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rollbar = useRollbar()
  const [currentChannelId, setCurrentChannelId] = useState('')
  const defaultChannelId = useSelector(
    state => state.channels.channels.find(c => c.name === 'general')?.id || '1'
  )

  const handleChannelClick = useCallback(channelId => {
    setCurrentChannelId(channelId)
  }, [])

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get(routes.channelsPath(), { headers: getAuthToken() }),
          axios.get(routes.messagesPath(), { headers: getAuthToken() }),
        ])

        const channels = channelsResponse?.data
        const messages = messagesResponse?.data

        dispatch(setChannels(channels))
        dispatch(setMessages(messages))

        if (!currentChannelId && channels.length > 0) {
          setCurrentChannelId(channels[0].id)
        }
      } catch (error) {
        let errorContext = {
          endpoint: `${routes.channelsPath()} and ${routes.messagesPath()}`,
          method: 'GET',
          timestamp: new Date().toISOString(),
          component: 'ChannelsPage',
          action: 'fetchContent',
        }

        if (error.response.status === 401) {
          rollbar.warning('Неавторизованный доступ', error, errorContext)
          localStorage.removeItem('token')
          navigate('/login')
          return
        } else if (error.response.status >= 500) {
          rollbar.critical('Ошибка сервера', error, errorContext)
        } else {
          rollbar.error('Ошибка клиента', error, errorContext)
        }

        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toast.fetchError'))
        }

        console.error('Ошибка при загрузке каналов:', error)
      }
    }

    fetchContent()
  }, [dispatch, navigate, currentChannelId, rollbar, t])

  const handleLogout = () => {
    try {
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      rollbar.error('Ошибка при выходе из системы', error, {
        component: 'ChannelsPage',
        action: 'handleLogout',
      })
    }
  }

  return (
    <div className="vh-100 bg-light">
      <div className="h-100">
        <div
          className="h-100"
          id="chat"
        >
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a
                  className="navbar-brand"
                  href="/"
                >
                  {t('mainHeader.hexletChat')}
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  {t('mainHeader.signOut')}
                </button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <Channels
                  currentChannelId={currentChannelId}
                  handleClick={handleChannelClick}
                  defaultChannelId={defaultChannelId}
                />
                <Messages currentChannelId={currentChannelId} />
              </div>
            </div>
            <div className="Toastify"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelsPage
