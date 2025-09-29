import ModalSchema from './ModalSchema.js'
import LoginSchema from './LoginSchema.js'
import SignUpSchema from './SignUpSchema.js'

const createSchemas = (t, existingChannelNames = []) => ({
  modal: ModalSchema(t, existingChannelNames),
  login: LoginSchema(t),
  signup: SignUpSchema(t),
})

export default createSchemas
