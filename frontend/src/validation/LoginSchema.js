import * as Yup from 'yup'

const LoginSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, t('signup.feedbacks.username'))
    .max(20, t('signup.feedbacks.username'))
    .required(t('signup.feedbacks.required')),
  password: Yup.string()
    .required(t('signup.feedbacks.required')),
})

export default LoginSchema
