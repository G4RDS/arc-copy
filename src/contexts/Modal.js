import { createContext } from 'react'

const Modal = createContext({
  openModal: () => {},
  closeModal: () => {},
})

export default Modal
