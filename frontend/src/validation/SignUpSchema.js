import * as Yup from 'yup'

const SignUpSchema = t => Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, t('signup.feedbacks.username'))
    .max(20, t('signup.feedbacks.username'))
    .required(t('signup.feedbacks.required')),
  password: Yup.string()
    .min(6, t('signup.feedbacks.password'))
    .required(t('signup.feedbacks.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('signup.feedbacks.confirmPassword'))
    .required(t('signup.feedbacks.required')),
})

export default SignUpSchema
