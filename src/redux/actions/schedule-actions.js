import { getSchedules, getMembers, getCompanies } from 'utils/api'
import ScheduleMemberInfo from 'models/ScheduleMemberInfo'

export const Actions = {
  RESET: 'RESET',
  SET_DATE: 'SET_DATE',
  SET_MEMBERS: 'SET_MEMBERS',
  SET_SHOULD_IMPORT: 'SET_SHOULD_IMPORT',
  SET_SCHEDULE: 'SET_SCHEDULE',
  UPDATE_SITE: 'UPDATE_SITE',
  MOVE_MEMBER: 'MOVE_MEMBER',
  UNALLOCATE_ALL: 'UNALLOCATE_ALL',
  RECALC_UNALLOCATED: 'RECALC_UNALLOCATED',
}

/**
 * ストアを初期ステートにリセット
 */
export function reset() {
  return {
    type: Actions.RESET,
  }
}

/**
 * 選択された日付を更新
 * @param {Object} date momentオブジェクト
 */
export function setDate(date) {
  return {
    type: Actions.SET_DATE,
    date,
  }
}

/**
 * Memberリストを更新
 * @param {Object} members MemberインスタンスのMap
 */
export function setMembers(members) {
  return {
    type: Actions.SET_MEMBERS,
    members,
  }
}

/**
 * Memberリストをサーバーから取得
 */
export function fetchMembers() {
  return async dispatch => {
    // 全グループ企業オブジェクト
    const companies = await getCompanies()
    // 全従業員オブジェクト
    const members = await getMembers()
    // 全従業員オブジェクトを場割専用従業員配列に変換
    const infoArr = await Promise.all(
      Object.values(members).map(member =>
        ScheduleMemberInfo.fromMember(member, companies)
      )
    )
    const infoObj = {}

    // 配列をオブジェクトに変換
    infoArr.forEach(info => {
      infoObj[info.id] = info
    })

    dispatch(setMembers(infoObj))
  }
}

/**
 * インポートモーダルを表示する
 * @param {Boolean} shouldImport インポートモーダルを表示するかどうか
 */
export function setShouldImport(shouldImport) {
  return {
    type: Actions.SET_SHOULD_IMPORT,
    shouldImport,
  }
}

/**
 * スケジュールをストアに格納
 * @param {Schedule} schedule 格納するScheduleインスタンス
 */
export function setSchedule(schedule) {
  return {
    type: Actions.SET_SCHEDULE,
    schedule,
  }
}

/**
 * 指定された月のスケジュールリストをサーバーから取得
 */
export function fetchSchedules(year, month) {
  return dispatch => {
    return getSchedules(year, month).then(schedules => {
      Object.values(schedules).forEach(schedule => {
        dispatch(setSchedule(schedule))
      })

      return schedules
    })
  }
}

/**
 * 現場を更新
 * @param {ScheduleSite} site 更新する現場インスタンス
 */
export function updateSite(site) {
  return {
    type: Actions.UPDATE_SITE,
    site,
  }
}

/**
 * Memberを移動
 * @param {string} memberId 移動するMemberのID
 * @param {?string} scheduleId 移動先スケジュールID nullなら未割り当てへ移動
 * @param {?string} timeDivision 移動先時間区分
 */
export function moveMember(memberId, scheduleId, timeDivision) {
  return {
    type: Actions.MOVE_MEMBER,
    memberId,
    scheduleId,
    timeDivision,
  }
}

/**
 * 全てのMemberの割り当てを解除
 */
export function unallocateAll() {
  return {
    type: Actions.UNALLOCATE_ALL,
  }
}

/**
 * 未割り当ての作業員リストを再計算
 * moveMemberを介さずに作業員を移動させた場合に必要
 */
export function recalcUnallocated() {
  return {
    type: Actions.RECALC_UNALLOCATED,
  }
}
