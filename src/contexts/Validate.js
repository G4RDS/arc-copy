import { createContext } from 'react'

const Validate = createContext({
  inputs: {},
  register: () => {},
  unregister: () => {},
  update: () => {},
})

export default Validate
