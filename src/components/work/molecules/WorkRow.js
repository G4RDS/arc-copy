import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import useModal from 'hooks/useModal'
import { colors } from 'consts/theme'
import UIConsts from 'consts/report-ui'
import Report from 'models/Report'
import WorkMember from 'models/WorkMember'
import * as Actions from 'redux/actions/work-actions'

import ReportCell from '../atoms/ReportCell'
import ReportModal from './ReportModal'

const WorkRow = ({ member, fromDate, row, period, setReport }) => {
  const [openModal, closeModal] = useModal()

  const onCellClicked = date => {
    // 日報未入力の場合はモーダルを開かずに場割通りに報告
    if (!member.reports[date]?.isReported) {
      const oldReport = member.reports[date]
      setReport(
        member.id,
        date,
        new Report({
          ...oldReport,
          date,
          manHour: oldReport?.schedule ?? 0,
          isReported: true,
        })
      )
      return
    }

    openModal(
      <ReportModal member={member} date={date} onClose={closeModal} />,
      { persistent: true }
    )
  }

  /* 期間中の日の文字列を生成 */
  const dates = []
  const oldest = fromDate.clone().subtract(period - 1, 'days')
  const crt = fromDate.clone()

  for (; crt.isSameOrAfter(oldest); crt.subtract(1, 'day')) {
    dates.push(crt.format('YYYY-MM-DD'))
  }

  return (
    <Container>
      {dates.map((date, ind) => (
        <ReportCell
          report={member.reports[date] ?? new Report({ date })}
          column={ind}
          row={row}
          onClick={() => {
            onCellClicked(date)
          }}
          key={date}
        />
      ))}
    </Container>
  )
}

WorkRow.propTypes = {
  member: PropTypes.instanceOf(WorkMember).isRequired,
  fromDate: PropTypes.instanceOf(moment).isRequired,
  row: PropTypes.number.isRequired,
}

export default connect(
  state => ({ period: state.work.period }),
  dispatch => ({
    setReport(memberId, date, report) {
      dispatch(Actions.setReport(memberId, date, report))
    },
  })
)(WorkRow)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  min-width: min-content;
  height: ${UIConsts.ROW_HEIGHT}px;
  padding-left: 4.5rem;

  &:nth-child(2n) {
    background: ${colors.gray[100]};
  }
`
