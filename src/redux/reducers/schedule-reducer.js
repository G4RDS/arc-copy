import produce from 'immer'

import { Actions } from '../actions/schedule-actions'

import ScheduleMember from 'models/ScheduleMember'
import { updateSchedule } from 'utils/api'

const initialState = {
  selectedDate: null,
  members: {},
  schedules: {},
  sites: [],
  unallocated: [],
  shouldImport: false,
}

/**
 * 指定した日付のschedules用プロパティを取得
 * @param {moment} mom 日付のモーメント
 */
function getScheduleProp(mom) {
  return mom.format('YYYY-MM-DD')
}

/**
 * 未割り当ての作業員リストを取得
 */
function getUnallocated(members, sites) {
  const allocatedIds = []

  for (let site of sites) {
    for (let member of site.members) {
      allocatedIds.push(member.id)
    }
  }

  return Object.keys(members)
    .filter(id => {
      return !allocatedIds.includes(id)
    })
    .map(id => new ScheduleMember({ id }))
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.RESET: {
      return initialState
    }
    case Actions.SET_DATE: {
      return produce(state, draft => {
        const schedule = draft.schedules[getScheduleProp(action.date)]
        const sites = schedule?.sites ?? []

        /* インポートモーダルを表示するかどうかを判断する処理 */
        if (schedule == null) {
          // 指定された日の場割インスタンスが存在しない場合、場割りする現場がないということなので、インポートは不要
          draft.shouldImport = false
        } else {
          // 既に作業済みの場合はインポートしない
          draft.shouldImport = !schedule.edited
        }

        // 現在選択されている日付の編集データをschedulesに反映
        if (draft.sites.length > 0) {
          draft.schedules[draft.selectedDate.format('YYYY-MM-DD')].sites =
            draft.sites
        }

        // 日付を更新
        draft.selectedDate = action.date
        // 未割り当て作業員リストを更新
        draft.unallocated = getUnallocated(draft.members, sites)
        // 表示する現場リストを更新
        draft.sites = sites
      })
    }
    case Actions.SET_MEMBERS: {
      return {
        ...state,
        members: action.members,
      }
    }
    case Actions.SET_SHOULD_IMPORT: {
      return {
        ...state,
        shouldImport: action.shouldImport,
      }
    }
    case Actions.SET_SCHEDULE: {
      return produce(state, draft => {
        // Scheduleの日付に対応するところに格納
        draft.schedules[action.schedule.date] = action.schedule
      })
    }
    case Actions.UPDATE_SITE: {
      return produce(state, draft => {
        // 新しい現場インスタンスのIDと同じIDのインスタンスのインデックスを取得
        const index = draft.sites.findIndex(site => site.id === action.site.id)
        // 置き換える
        draft.sites.splice(index, 1, action.site)

        // 編集済みフラグを立てる
        draft.schedules[draft.selectedDate.format('YYYY-MM-DD')].edited = true

        /* サーバーに更新リクエストを送る */
        updateSchedule(state.selectedDate, action.site)
      })
    }
    case Actions.MOVE_MEMBER: {
      return produce(state, draft => {
        // 更新した現場リスト
        const changedSchedules = []

        /**
         * 今割り当てられている現場から取り除く関数
         * まだ割り当てられていない場合はunallocatedから取り除く
         * @returns {ScheduleMember} 取り除いたScheduleMemberインスタンス
         */
        const removeFromSite = () => {
          for (let site of draft.sites) {
            const index = site.members.findIndex(
              mem => mem.id === action.memberId
            )

            if (index >= 0) {
              const [removedMember] = site.members.splice(index, 1)

              changedSchedules.push(site.id)

              return removedMember
            }
          }

          const index = draft.unallocated.findIndex(
            mem => mem.id === action.memberId
          )

          if (index >= 0) {
            return draft.unallocated.splice(index, 1)[0]
          }

          throw new Error(
            `指定されたIDのScheduleMemberは見つかりませんでした: ${action.memberId}`
          )
        }

        if (action.scheduleId == null) {
          // action.scheduleIdがnullなら、未割り当てへ移動

          const member = removeFromSite()

          draft.unallocated.push(member)
        } else {
          // 他の現場、時間区分へ移動

          // 現在割り当てられている現場から取り除く
          const member = removeFromSite()

          // 割り当て先の現場を取得
          const targetSite = draft.sites.find(
            site => site.id === action.scheduleId
          )

          // 取り除いたインスタンスの時間区分を更新
          member.time = action.timeDivision

          // 割り当て先の現場にインスタンスを追加
          if (targetSite != null) {
            targetSite.members.push(member)
            changedSchedules.push(targetSite.id)
          } else {
            throw new Error(
              `指定されたIDのScheduleSiteは見つかりませんでした: ${action.scheduleId}`
            )
          }
        }

        // changedSchedulesに含まれているスケジュールを更新リクエスト
        changedSchedules.forEach(id => {
          const site = draft.sites.find(site => site.id === id)

          // サーバーに更新リクエストを送る
          updateSchedule(state.selectedDate, site)
        })
      })
    }
    case Actions.UNALLOCATE_ALL: {
      return produce(state, draft => {
        // 全ての現場について、割り当てられている作業員を未割り当て配列へ移動
        for (let site of draft.sites) {
          draft.unallocated.push(...site.members)
          site.members = []

          // サーバーに更新リクエストを送る
          updateSchedule(state.selectedDate, site)
        }
      })
    }
    case Actions.RECALC_UNALLOCATED: {
      return {
        ...state,
        unallocated: getUnallocated(state.members, state.sites),
      }
    }
    default:
      return state
  }
}

export default reducer
