import { immerable } from 'immer'
import moment from 'moment'

/**
 * name: string
 * shortName: string
 * clientId: string
 * address: string
 * workPeriod: object
 *   from: moment
 *   to: moment
 * meal: string
 * canFareCharge: boolean
 */

export default class Site {
  constructor({
    id,
    name,
    shortName,
    clientId,
    clientName,
    address,
    workPeriod,
    meal,
    canFareCharge,
  }) {
    this.id = id
    this.name = name
    this.shortName = shortName
    this.clientId = clientId
    this.clientName = clientName
    this.address = address
    this.workPeriod = workPeriod
    this.meal = meal
    this.canFareCharge = canFareCharge

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      shortName: this.shortName,
      clientId: this.clientId,
      clientName: this.clientName,
      address: this.address,
      workPeriod: {
        from: this.workPeriod.from.format('YYYY-MM-DD'),
        to: this.workPeriod.to.format('YYYY-MM-DD'),
      },
      meal: this.meal,
      canFareCharge: this.canFareCharge,
    }
  }

  static fromJSON(obj) {
    return new Site({
      id: obj.id,
      name: obj.name,
      shortName: obj.shortName,
      clientId: obj.clientId,
      clientName: obj.clientName,
      address: obj.address,
      workPeriod: {
        from: moment(obj.workPeriod.from),
        to: moment(obj.workPeriod.to),
      },
      meal: obj.meal,
      canFareCharge: obj.canFareCharge,
    })
  }
}
