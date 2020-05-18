import { immerable } from 'immer'
import WorkMember from './WorkMember'

/**
 * name: String
 * members: array of WorkMember
 */

export default class Work {
  constructor({ siteId, name, clientName, members }) {
    if (typeof siteId !== 'string')
      throw new Error(`siteIdがstringではなく${typeof siteId}です。`)
    if (typeof name !== 'string')
      throw new Error(`nameがstringではなく${typeof name}です。`)
    if (typeof clientName !== 'string')
      throw new Error(`clientNameがstringではなく${typeof clientName}です。`)
    if (typeof members !== 'object')
      throw new Error(`membersがObjectではなく${typeof members}です。`)
    if (Object.values(members).some(m => !(m instanceof WorkMember)))
      throw new Error(
        `membersのvalueのいくつかがWorkMemberインスタンスではありません。`
      )

    this.siteId = siteId
    this.name = name
    this.clientName = clientName
    this.members = members

    this[immerable] = true
  }

  toJSON() {
    return {
      siteId: this.siteId,
      name: this.name,
      clientName: this.clientName,
      members: this.members,
    }
  }

  static fromJSON(obj) {
    const members = {}

    Object.entries(obj.members).forEach(([id, member]) => {
      members[id] = WorkMember.fromJSON({ id, ...member })
    })

    return new Work({
      siteId: obj.siteId,
      name: obj.name,
      clientName: obj.clientName,
      members,
    })
  }
}
