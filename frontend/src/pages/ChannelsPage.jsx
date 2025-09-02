import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannels } from '../slices/channelsSlice.js';
import routes from '../routes.js';
import getAuthToken from '../getAuthToken.js';
import axios from 'axios';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import { setMessages } from '../slices/messagesSlice.js';
import { useTranslation } from 'react-i18next';

const ChannelsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentChannelId, setCurrentChannelId] = useState('');
  const defaultChannelId = useSelector(state => 
    state.channels.channels.find(c => c.name === 'general')?.id || '1'
  );  
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: getAuthToken(),
        });
        const channels = responseChannels?.data;
        dispatch(setChannels(channels));

        if (!currentChannelId && channels.length > 0) {
          setCurrentChannelId(channels[0].id);
        }

        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: getAuthToken(),
        });
        const messages = responseMessages?.data;
        dispatch(setMessages(messages));

      } catch (err) {
        console.error('Ошибка при загрузке каналов:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchContent();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [dispatch, navigate, currentChannelId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='vh-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
              <div className='container'>
                <a className='navbar-brand' href='/'>
                  {t('mainHeader.hexletChat')}
                </a>
                <button type='button' className='btn btn-primary' onClick={handleLogout}>
                  {t('mainHeader.signOut')}
                </button>
              </div>
            </nav>
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                <Channels
                  currentChannelId={currentChannelId}
                  handleClick={setCurrentChannelId} 
                  defaultChannelId={defaultChannelId}
                />
                <Messages currentChannelId={currentChannelId} />
              </div>
            </div>
            <div className='Toastify'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
