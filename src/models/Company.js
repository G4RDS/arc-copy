import { immerable } from 'immer'

export default class Company {
  constructor({ id, name, shortName }) {
    this.id = id
    this.name = name
    this.shortName = shortName

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      shortName: this.shortName,
    }
  }

  static fromJSON(obj) {
    return new Company({
      id: obj.id,
      name: obj.name,
      shortName: obj.shortName,
    })
  }
}
