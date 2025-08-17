import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import getAuthToken from '../../getAuthToken';
import routes from '../../routes';
import * as Yup from 'yup';

const AddChannelModal = ({ show, onClose }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Название канала обязательно')
        .min(3, 'Минимум 3 символа')
        .max(30, 'Максимум 30 символов')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newChannel = {
          name: values.name,
        };
        await axios.post(routes.channelsPath(), newChannel, {
          headers: getAuthToken() // { id: '3', name: 'new name channel', removable: true }
        });
        resetForm();
        onClose();
      } catch (error) {
        console.error('Ошибка при создании канала:', error);
        if (error.response?.status === 409) {
          formik.setFieldError('name', 'Канал с таким именем уже существует');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label visuallyHidden>Название канала</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите название канала"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
            />
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              onClick={onClose} 
              className="me-2"
            >
              Отменить
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={formik.isSubmitting || !formik.values.name}
            >
              {formik.isSubmitting ? 'Создание...' : 'Создать'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;