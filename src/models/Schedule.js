import { immerable } from 'immer'
import ScheduleSite from 'models/ScheduleSite'

/**
 * date: string
 * edited: boolean
 * sites: array of ScheduleSite
 */

export default class Schedule {
  constructor({ date, edited, sites }) {
    this.date = date
    this.edited = edited
    this.sites = sites

    this[immerable] = true
  }

  static fromJSON(response, date) {
    const sites = Object.keys(response.sites).map(id =>
      ScheduleSite.fromJSON(response.sites[id])
    )

    return new Schedule({
      date,
      edited: response.edited,
      sites,
    })
  }
}
