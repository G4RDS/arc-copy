import { immerable } from 'immer'

/**
 * time: TimeDivision
 * meal: bool
 * stay: bool
 */

export default class ScheduleMember {
  constructor({ id, time, meal = false, stay = false }) {
    this.id = id
    this.time = time
    this.meal = meal
    this.stay = stay

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      time: this.time,
      meal: this.meal,
      stay: this.stay,
    }
  }

  /**
   * オブジェクトをインスタンスに変換
   * @param {Object} obj オブジェクト
   */
  static fromJSON(obj) {
    return new ScheduleMember(obj)
  }
}
