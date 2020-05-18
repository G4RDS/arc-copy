import { immerable } from 'immer'
import ScheduleMember from './ScheduleMember'

/**
 * name: string
 * note: string
 * members: array of ScheduleMember
 */

export default class ScheduleSite {
  constructor({ id, siteId, name, note, members }) {
    this.id = id
    this.siteId = siteId
    this.name = name
    this.note = note
    this.members = members

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      siteId: this.siteId,
      name: this.name,
      note: this.note,
      members: this.members.map(member => member.toJSON()),
    }
  }

  /**
   * オブジェクトをインスタンスに変換する関数
   * @param {Array} obj オブジェクト
   */
  static fromJSON(obj) {
    const members = obj.members.map(member => ScheduleMember.fromJSON(member))

    return new ScheduleSite({
      id: obj.scheduleId,
      siteId: obj.siteId,
      name: obj.siteName,
      note: obj.note,
      members,
    })
  }
}
