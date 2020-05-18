import { createContext } from 'react'

const Notification = createContext({
  showNotification: () => {},
  hideNotification: () => {},
})

export default Notification
