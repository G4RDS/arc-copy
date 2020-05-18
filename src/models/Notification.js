export default class Notification {
  constructor({ id, type, title, description }) {
    this.id = id
    this.type = type
    this.title = title
    this.description = description
  }

  setId(id) {
    this.id = id
  }

  close() {
    this.isClosing = true
  }
}
