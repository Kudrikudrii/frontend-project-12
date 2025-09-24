import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getAuthToken from '../../getAuthToken';
import routes from '../../routes';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

const RemoveChannelModal = ({ show, onClose, channelId, defaultChannelId, currentChannelId, handleSwitchChannel }) => {
  const rollbar = useRollbar();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await axios.delete(routes.channelsPath(channelId), {
        headers: getAuthToken(),
      });

      if (currentChannelId === channelId) {
        handleSwitchChannel(defaultChannelId);
      }
      toast.success(t('toast.removedChannel'));
      onClose();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
      rollbar.error('Ошибка при удалении канала:', error, {
        endpoint: routes.channelsPath(channelId),
        method: 'DELETE',
        timestamp: new Date().toISOString(),
        component: 'RemoveChannelModal',
        action: 'handleRemove',
      });
      if (error.status === 'FETCH_ERROR') {
        toast.error(t('toast.fetchError'));
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('modal.removeChannel.body')}</p>
        <div className='d-flex justify-content-end'>
          <Button
            variant='secondary'
            onClick={onClose}
            className='me-2'
          >
            {t('modal.cancelBtn')}
          </Button>
          <Button
            variant='danger'
            onClick={handleRemove}
          >
            {t('modal.removeChannel.deleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
