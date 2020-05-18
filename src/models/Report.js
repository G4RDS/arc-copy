import { immerable } from 'immer'

/**
 * schedule: Number 場割で入力された工数
 * isReported: Boolean 日報が入力されたか
 * manHour: Number 日報工数
 * overtime: Number 残業時間数
 * detail: String 作業内容
 * summary: String 摘要
 */

export default class Report {
  constructor({
    date,
    schedule = 0,
    isReported = false,
    manHour = 0,
    overtime = 0,
    detail = '',
    summary = '',
  }) {
    if (typeof date !== 'string')
      throw new Error(`dateがstringではなく${typeof date}です。`)

    this.date = date
    this.schedule = schedule
    this.isReported = isReported
    this.manHour = manHour
    this.overtime = overtime
    this.detail = detail
    this.summary = summary

    this[immerable] = true
  }

  toJSON() {
    return {
      date: this.date,
      schedule: this.schedule,
      isReported: this.isReported,
      manHour: this.manHour,
      overtime: this.overtime,
      detail: this.detail,
      summary: this.summary,
    }
  }

  static fromJSON(obj) {
    return new Report({
      date: obj.date,
      schedule: obj.schedule,
      isReported: obj.isReported,
      manHour: obj.manHour,
      overtime: obj.overtime,
      detail: obj.detail,
      summary: obj.summary,
    })
  }
}
