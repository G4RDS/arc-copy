import { immerable } from 'immer'

/**
 * name: string
 * shortName: string
 * address: string
 * tel: string
 * fax: string
 */

export default class Client {
  constructor({ id, name, shortName, address, tel, fax }) {
    this.id = id
    this.name = name
    this.shortName = shortName
    this.address = address
    this.tel = tel
    this.fax = fax

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      shortName: this.shortName,
      address: this.address,
      tel: this.tel,
      fax: this.fax,
    }
  }

  static fromJSON(obj) {
    return new Client({
      id: obj.id,
      name: obj.name,
      shortName: obj.shortName,
      address: obj.address,
      tel: obj.tel,
      fax: obj.fax,
    })
  }
}
