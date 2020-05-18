import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Report from 'models/Report'
import UIConsts from 'consts/report-ui'
import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/work-actions'

const ReportCell = ({
  report,
  column,
  row,
  onClick,
  hoveredCol,
  hoveredRow,
  setHovered,
}) => {
  /**
   * Containerがホバーされたら、行、列をハイライトする
   */
  const onMouseEnter = () => {
    setHovered(column, row)
  }

  /**
   * Containerのホバーが外れたら、行、列のハイライトを解除する
   */
  const onMouseLeave = () => {
    setHovered(null, null)
  }

  let hovered = false
  if (column === hoveredCol && row === hoveredRow) {
    hovered = true
  }

  let indicator
  if (report.isReported && report.manHour > 0) {
    // 日報入力あり＆勤務あり
    indicator = <Filled widthRatio={report.manHour} />
  } else if (report.isReported && report.manHour === 0) {
    // 日報入力あり＆勤務なし
    indicator = <LightFilled />
  } else if (!report.isReported && report.schedule > 0) {
    // 日報入力なし＆予定あり
    indicator = <Border widthRatio={report.schedule} />
  } else {
    // 日報入力なし＆予定なし
    indicator = <Base />
  }

  return (
    <Container
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={0}
    >
      {indicator}
    </Container>
  )
}

ReportCell.propTypes = {
  report: PropTypes.instanceOf(Report).isRequired,
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    hoveredCol: state.work.hoveredCol,
    hoveredRow: state.work.hoveredRow,
  }),
  dispatch => ({
    setHovered(col, row) {
      dispatch(Actions.setHovered(col, row))
    },
  })
)(ReportCell)

const Container = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: ${UIConsts.COLUMN_WIDTH}px;
  height: ${UIConsts.ROW_HEIGHT}px;
  padding: 0 0.5rem;
  background: ${p => p.hovered && colors.primary[100]};

  transition: background-color 0.2s;

  cursor: pointer;
`

const Base = styled.div`
  width: ${p => UIConsts.REPORT_BUTTON_WIDTH * (p.widthRatio ?? 1)}px;
  height: ${UIConsts.REPORT_BUTTON_HEIGHT}px;

  border: none;
  border-radius: 0.25rem;
  background: transparent;
`

const Filled = styled(Base)`
  background: ${colors.primary[500]};
`

const LightFilled = styled(Base)`
  background: ${colors.primary[200]};
`

const Border = styled(Base)`
  border: 2px solid ${colors.primary[500]};
  background: #fff;
`
