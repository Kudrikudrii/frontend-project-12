import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getAuthToken from '../../getAuthToken';
import routes from '../../routes';

const RemoveChannelModal = ({
  show,
  onClose,
  channelId,
  channelName,
  defaultChannelId,
  currentChannelId,
  handleSwitchChannel
}) => {
  const handleRemove = async () => {
    try {
      await axios.delete(routes.channelsPath(channelId), {
        headers: getAuthToken()
      });
      
      if (currentChannelId === channelId) {
        handleSwitchChannel(defaultChannelId);
      }
      
      onClose();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены, что хотите удалить канал {channelName}?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Отменить
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;