import Member from 'models/Member'
import Company from 'models/Company'
import Schedule from 'models/Schedule'

/*******************************
 * common
 *******************************/

export async function getCurrentUser() {
  return {
    id: '0',
    name: 'tester',
    email: 'test@test.com',
    role: 'SCHEDULER',
  }
}

/**
 * 全ての作業員を取得
 * @returns {Array.<Member>} 取得したMemberインスタンスの配列
 */
export async function getMembers() {
  return [
    new Member({ id: '0', name: 'tester', company: 0, role: { name: 'role' } }),
  ]
}

/**
 * 全てのグループ企業を取得
 * @returns {Object<id, Company>} 取得したCompanyインスタンスのオブジェクト（IDがkey）
 */
export async function getCompanies() {
  return {
    0: new Company({ id: 0, name: 'test company', shortName: 'test' }),
  }
}

/*******************************
 * schedule
 *******************************/

/**
 * スケジュールを取得
 * @param {Number} year
 * @param {Number} month
 * @returns {Object} 取得したScheduleインスタンスを日付でインデックスしたObjectに変換したもの
 */
export async function getSchedules(year, month) {
  const data = JSON.parse(
    '{"2020-05-01":{"sites":{},"edited":false},"2020-05-02":{"sites":{},"edited":false},"2020-05-03":{"sites":{},"edited":false},"2020-05-04":{"sites":{},"edited":false},"2020-05-05":{"sites":{},"edited":false},"2020-05-06":{"sites":{},"edited":false},"2020-05-07":{"sites":{},"edited":false},"2020-05-08":{"sites":{},"edited":false},"2020-05-09":{"sites":{},"edited":false},"2020-05-10":{"sites":{},"edited":false},"2020-05-11":{"sites":{},"edited":false},"2020-05-12":{"sites":{},"edited":false},"2020-05-13":{"sites":{},"edited":false},"2020-05-14":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-15":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-16":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-17":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-18":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-19":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-20":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-21":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-22":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-23":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-24":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-25":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":false},"2020-05-26":{"sites":{"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[{"id":"vdpSXlWPwfyMV2QIMluT","time":1,"meal":false,"stay":false}]}},"edited":true},"2020-05-27":{"sites":{"MmefSPHwZrHvFpL8cKIt":{"scheduleId":"MmefSPHwZrHvFpL8cKIt","siteId":"MmefSPHwZrHvFpL8cKIt","siteName":"現場X","note":"","members":[]},"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[{"id":"vdpSXlWPwfyMV2QIMluT","time":1,"meal":false,"stay":false}]}},"edited":true},"2020-05-28":{"sites":{"MmefSPHwZrHvFpL8cKIt":{"scheduleId":"MmefSPHwZrHvFpL8cKIt","siteId":"MmefSPHwZrHvFpL8cKIt","siteName":"現場X","note":"","members":[{"id":"vdpSXlWPwfyMV2QIMluT","time":1,"meal":false,"stay":false}]},"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[]}},"edited":true},"2020-05-29":{"sites":{"MmefSPHwZrHvFpL8cKIt":{"scheduleId":"MmefSPHwZrHvFpL8cKIt","siteId":"MmefSPHwZrHvFpL8cKIt","siteName":"現場X","note":"","members":[{"id":"01ywztV239axh4EkIFlh","time":0.5,"meal":false,"stay":false},{"id":"vdpSXlWPwfyMV2QIMluT","time":1,"meal":false,"stay":false}]},"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[{"id":"GkRoFRPvj4Pujv1keSPe","time":1,"meal":false,"stay":false},{"id":"q5DPkk54zZPgYlUI7B3U","time":0.5,"meal":false,"stay":false}]}},"edited":true},"2020-05-30":{"sites":{"MmefSPHwZrHvFpL8cKIt":{"scheduleId":"MmefSPHwZrHvFpL8cKIt","siteId":"MmefSPHwZrHvFpL8cKIt","siteName":"現場X","note":"","members":[]},"R8u2dLUJIdEz4452YETS":{"scheduleId":"R8u2dLUJIdEz4452YETS","siteId":"R8u2dLUJIdEz4452YETS","siteName":"現場Y","note":"","members":[{"id":"vdpSXlWPwfyMV2QIMluT","time":1,"meal":false,"stay":false}]}},"edited":true}}'
  )
  const schedules = {}

  // 取得できた全ての日付に対して、それぞれScheduleインスタンスを生成
  Object.entries(data).forEach(([date, schedule]) => {
    schedules[date] = Schedule.fromJSON(schedule, date)
  })

  return schedules
}

/**
 * スケジュールを更新
 * @param {moment} date
 * @param {ScheduleSite} site
 */
export async function updateSchedule(date, site) {
  return
}
