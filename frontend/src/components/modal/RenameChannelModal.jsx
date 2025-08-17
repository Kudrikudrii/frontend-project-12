import { useFormik } from 'formik';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import getAuthToken from '../../getAuthToken';
import routes from '../../routes';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../slices/channelsSlice';

const RenameChannelModal = ({ show, onClose, channelId, currentName }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: currentName,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Название канала обязательно')
        .min(3, 'Минимум 3 символа')
        .max(30, 'Максимум 30 символов')
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch(
          routes.channelsPath(channelId),
          { name: values.name },
          { headers: getAuthToken() }
        );
        dispatch(renameChannel({ id: channelId, name: values.name }));
        onClose();
      } catch (error) {
        console.error('Ошибка при переименовании канала:', error);
        if (error.response?.status === 409) {
          formik.setFieldError('name', 'Канал с таким именем уже существует');
        }
      }
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Отменить
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;