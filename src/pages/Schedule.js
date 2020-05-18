import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import useModal from 'hooks/useModal'
import useNotification, { notificationTypes } from 'hooks/useNotification'
import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/schedule-actions'

import AppLayout from 'layouts/AppLayout'
import CalendarArea from 'components/schedule/organisms/CalendarArea'
import KanbanArea from 'components/schedule/organisms/KanbanArea'
import ImportScheduleModal from 'components/schedule/molecules/ImportScheduleModal'
import LoadingSpinner from 'components/common/atoms/LoadingSpinner'

const Schedule = ({
  selectedDate,
  shouldImport,
  reset,
  setDate,
  fetchMembers,
  fetchSchedules,
  setShouldImport,
}) => {
  const [openModal, closeModal] = useModal()
  const showNotification = useNotification()

  /**
   * 初期処理
   * 以前のReduxデータをレセットしたあと、翌日のデータを取得する
   */
  useEffect(() => {
    // 現在のストアのデータをリセット
    reset()

    // async/awaitを使いたい
    ;(async () => {
      // 明日のmoment
      const mom = moment().add(1, 'day').startOf('day')

      try {
        // 全ての作業員データを事前に取得
        await fetchMembers()

        // 明日の月のデータを取得
        await fetchSchedules(mom.year(), mom.month() + 1)
      } catch (err) {
        showNotification(
          notificationTypes.ERROR,
          'エラーが発生しました',
          `データの取得中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
        )

        console.error(err)
      }

      // 明日を選択する
      setDate(mom)
    })()
  }, [fetchMembers, fetchSchedules, reset, setDate, showNotification])

  /**
   * インポートモーダルを表示もしくは非表示にする処理
   */
  useEffect(() => {
    if (shouldImport) {
      openModal(
        <ImportScheduleModal
          onClose={() => {
            closeModal()
            setShouldImport(false)
          }}
        />
      )
    }
  }, [closeModal, openModal, setShouldImport, shouldImport])

  /**
   * selectedDateがnullだということは、まだ初回ロードが完了していないということなので、
   * LoadingSpinnerを表示する
   */
  const isLoading = selectedDate == null

  return (
    <AppLayout title="場割">
      <Container>
        {isLoading && (
          <LoadingContainer>
            <LoadingSpinner color={colors.gray[600]} size="4rem" />
          </LoadingContainer>
        )}
        <CalendarArea />
        <KanbanArea />
      </Container>
    </AppLayout>
  )
}

export default connect(
  state => ({
    selectedDate: state.schedule.selectedDate,
    shouldImport: state.schedule.shouldImport,
  }),
  dispatch => ({
    reset() {
      dispatch(Actions.reset())
    },
    setDate(date) {
      dispatch(Actions.setDate(date))
    },
    fetchMembers() {
      return dispatch(Actions.fetchMembers())
    },
    fetchSchedules(year, month) {
      return dispatch(Actions.fetchSchedules(year, month))
    },
    setShouldImport(shouldImport) {
      dispatch(Actions.setShouldImport(shouldImport))
    },
  })
)(Schedule)

const Container = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;

  width: 100%;
  border: 1px solid ${colors.gray[400]};
  border-bottom: none;
  border-right: none;
  border-top-left-radius: 1rem;
  background: #fff;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`
