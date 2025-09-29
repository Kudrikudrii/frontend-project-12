import * as Yup from 'yup'

const ModalSchema = (t, existingChannelNames = []) => {
  return Yup.object({
    name: Yup.string()
      .min(3, t('modal.error.length'))
      .max(20, t('modal.error.length'))
      .required(t('modal.error.required'))
      .test(
        'unique-name',
        (t('modal.error.notOneOf'),
        value => !existingChannelNames.includes(value.toLowerCase())),
      ),
  })
}

export default ModalSchema
