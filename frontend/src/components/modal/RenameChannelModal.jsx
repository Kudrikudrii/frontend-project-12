import { useFormik } from 'formik';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import getAuthToken from '../../getAuthToken';
import routes from '../../routes';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../../slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';

const RenameChannelModal = ({ show, onClose, channelId, currentName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channels);
  const existingChannelNames = channels.map((channel) =>
    channel.name.toLowerCase()
  );

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  const formik = useFormik({
    initialValues: {
      name: currentName,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('modal.error.required'))
        .min(3, t('modal.error.length'))
        .max(30, t('modal.error.length'))
        .test(
          t('modal.error.notOneOf'),
          (value) => !existingChannelNames.includes(value.toLowerCase())
        ),
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch(
          routes.channelsPath(channelId),
          { name: values.name },
          { headers: getAuthToken() }
        );
        dispatch(renameChannel({ id: channelId, name: values.name }));
        toast.success(t('toast.renamedChannel'));
        onClose();
      } catch (error) {
        console.error('Ошибка при переименовании канала:', error);
        rollbar.error('Ошибка при переименовании канала:', error, {
          endpoint: routes.channelsPath(channelId),
          method: 'PATCH',
          timestamp: new Date().toISOString(),
          component: 'RenameChannelModal',
          action: 'formik',
        });
        if (error.response?.status === 409) {
          formik.setFieldError(t('modal.error.notOneOf'));
        }
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toast.fetchError'));
        }
      }
    },
  });

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
              aria-label='Имя канала'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-end mt-3'>
            <Button
              variant='secondary'
              onClick={onClose}
              className='me-2'>
              {t('modal.cancelBtn')}
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={
                !formik.dirty || !formik.isValid || formik.isSubmitting
              }>
              {t('modal.confirmBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
