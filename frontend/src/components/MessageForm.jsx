import { useFormik } from 'formik';
import getAuthToken from '../getAuthToken';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import routes from '../routes';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ currentChannelId, username }) => {
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const newMessage = {
        body: values.body,
        channelId: currentChannelId,
        username,
      }
      try {
        await axios.post(routes.messagesPath(), newMessage, {
          headers: getAuthToken()
        });
        formik.resetForm();
        inputRef.current.focus();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className='py-1 border rounded-2'>
      <div className='input-group has-validation'>
        <input
          id="body"
          name="body"
          type="text"
          aria-label='Новое сообщение'
          placeholder={t('chat.messageForm.placeholder')}
          className='border-0 p-0 ps-2 form-control'
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputRef}
        />
        <button 
          type='submit' 
          disabled={!formik.values.body} 
          className='btn btn-group-vertical'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-arrow-right-square'>
            <path
              fillRule='evenodd'
              d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'
            />
          </svg>
          <span className='visually-hidden'>{t('chat.messageForm.submit')}</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;