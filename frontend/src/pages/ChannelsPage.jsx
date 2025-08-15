import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannels } from '../slices/chatSlice.js';
// import routes from '../routes.js';
import getAuthToken from '../getAuthToken.js';
import axios from 'axios';
import Channels from '../components/Channels.jsx';

const ChannelsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullState = useSelector((state) => state);
  console.log('Full Redux state:', fullState);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: getAuthToken(),
        });
        const channels = response.data;
        console.log('API Response:', response.data);
        dispatch(setChannels(channels));
        setCurrentChannel(channels[0].id);
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
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const channels = useSelector((state) => state.channels.channels);
  console.log(channels);
  const [currentChannel, setCurrentChannel] = useState('');
  const activeChannelData = channels.find((channel) => channel.id === currentChannel);

  return (
    <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
              <div className='container'>
                <a className='navbar-brand' href='/'>
                  Hexlet Chat
                </a>
                <button type='button' className='btn btn-primary' onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            </nav>
        
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                <Channels currentChannel={currentChannel}  handleClick={setCurrentChannel} />
                <div className='col p-0 h-100'>
                  <div className='d-flex flex-column h-100'>
                    {activeChannelData && (
                      <div className='bg-light mb-4 p-3 shadow-sm small'>
                        <p className='m-0'>
                          <b># {activeChannelData.name}</b>
                        </p>
                        <span className='text-muted'>0 сообщений</span>
                      </div>
                    )}

                    <div id='messages-box' className='chat-messages overflow-auto px-5'></div>

                    <div className='mt-auto px-5 py-3'>
                      <form noValidate className='py-1 border rounded-2'>
                        <div className='input-group has-validation'>
                          <input name='body' aria-label='Новое сообщение' placeholder='Введите сообщение...' className='border-0 p-0 ps-2 form-control' value='' />
                          <button type='submit' disabled className='btn btn-group-vertical'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-arrow-right-square'>
                              <path
                                fillRule='evenodd'
                                d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'
                              />
                            </svg>
                            <span className='visually-hidden'>Отправить</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
