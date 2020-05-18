import { immerable } from 'immer'
import Report from './Report'

/**
 * schedule: one of TimeDivisions
 * reports: Object<日付, Report>
 */

export default class WorkMember {
  constructor({ id, reports }) {
    if (typeof id !== 'string')
      throw new Error(`idがstringではなく${typeof id}です。`)
    if (typeof reports !== 'object')
      throw new Error(`reportsがObjectではなく${typeof reports}です。`)
    if (Object.values(reports).some(r => !(r instanceof Report)))
      throw new Error(
        `reportsのvalueのいくつかがReportインスタンスではありません。`
      )

    this.id = id
    this.reports = reports

    this[immerable] = true
  }

  toJSON() {
    return {
      id: this.id,
      reports: this.reports,
    }
  }

  static fromJSON(obj) {
    const reports = {}

    Object.entries(obj.reports).forEach(([date, report]) => {
      reports[date] = Report.fromJSON(report)
    })

    return new WorkMember({
      id: obj.id,
      reports,
    })
  }
}
