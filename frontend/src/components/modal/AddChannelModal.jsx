import { useFormik } from 'formik'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import getAuthToken from '../../getAuthToken'
import routes from '../../routes'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { useRollbar } from '@rollbar/react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AddChannelModal = ({ show, onClose, onChannelCreated }) => {
  const { t } = useTranslation()
  const rollbar = useRollbar()

  const inputRef = useRef()

  const channels = useSelector(state => state.channels.channels)
  const existingChannelNames = channels.map(channel =>
    channel.name.toLowerCase(),
  )

  const englishBadWords = ['boobs'] // по другому не работает
  leoProfanity.add(englishBadWords)

  useEffect(() => {
    if (show) {
      inputRef.current?.focus()
    }
  }, [show])

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('modal.error.required'))
        .min(3, t('modal.error.length'))
        .max(20, t('modal.error.length'))
        .test(
          t('modal.error.notOneOf'),
          value => !existingChannelNames.includes(value.toLowerCase()),
        ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const filteredChannelName = leoProfanity.clean(values.name)
        const newChannel = {
          name: filteredChannelName,
        }
        const response = await axios.post(routes.channelsPath(), newChannel, {
          headers: getAuthToken(),
        })
        toast.success(t('toast.createdChannel'))
        resetForm()
        onClose()

        if (onChannelCreated && response.data) {
          onChannelCreated(response.data.id)
        }
      }
      catch (error) {
        rollbar.error('Ошибка при создании канала:', error, {
          endpoint: routes.channelsPath(),
          method: 'POST',
          timestamp: new Date().toISOString(),
          component: 'AddChannelModal',
        })
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toast.fetchError'))
        }
        if (error.response?.status === 409) {
          formik.setFieldError('name', t('modal.error.notOneOf'))
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Form.Group
            controlId="name"
            className="mb-3"
          >
            <Form.Label visuallyHidden>
              {t('modal.addChannel.label')}
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={t('modal.addChannel.placeholder')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={onClose}
              className="me-2"
            >
              {t('modal.cancelBtn')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting || !formik.values.name}
            >
              {t('modal.addChannel.createBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal
