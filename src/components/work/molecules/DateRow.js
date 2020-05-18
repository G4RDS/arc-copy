import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import { colors } from 'consts/theme'
import UIConsts from 'consts/report-ui'
import IconButton from 'components/common/atoms/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DAYS = ['日', '月', '火', '水', '木', '金', '土']

const DateRow = ({ newest, onBack, onForward, period, hoveredInd }) => {
  // 表示する日付を計算
  const dates = useMemo(() => {
    const dates = []
    const oldest = newest.clone().subtract(period - 1, 'days')
    const crt = newest.clone()

    for (; crt.isSameOrAfter(oldest); crt.subtract(1, 'day')) {
      dates.push({
        date: `${crt.month() + 1}/${crt.date()}`,
        day: crt.day(),
      })
    }

    return dates
  }, [newest, period])

  // 今日より未来の日には移動できないように
  const canForward = useMemo(() => {
    const today = moment().startOf('day')
    const forwarded = newest.clone().add(period, 'days')
    return today.isBefore(forwarded)
  }, [newest, period])

  return (
    <Container>
      <ButtonCell>
        <IconButton
          title="前の期間へ"
          onClick={onForward}
          disabled={canForward}
        >
          <FontAwesomeIcon icon={['far', 'angle-left']} />
        </IconButton>
      </ButtonCell>
      {dates.map(({ date, day }, ind) => (
        <DateCell key={date} highlight={hoveredInd === ind} day={day}>
          <div>{date}</div>
          <DateDay>（{DAYS[day]}）</DateDay>
        </DateCell>
      ))}
      <ButtonCell>
        <IconButton title="次の期間へ" onClick={onBack}>
          <FontAwesomeIcon icon={['far', 'angle-right']} />
        </IconButton>
      </ButtonCell>
    </Container>
  )
}

DateRow.propTypes = {
  newest: PropTypes.objectOf(moment).isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
}

export default connect(state => ({
  period: state.work.period,
  hoveredInd: state.work.hoveredCol,
}))(DateRow)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  min-width: min-content;
  height: ${UIConsts.GRID_HEADER_HEIGHT}px;
  padding: 0 0.5rem;
  border-bottom: 1px solid ${colors.gray[400]};
`

const ButtonCell = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 4rem;
  padding: 0 1rem;
`

const DateCell = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: ${UIConsts.COLUMN_WIDTH}px;
  /* ボーダー分1px減らす */
  height: ${UIConsts.GRID_HEADER_HEIGHT - 1}px;
  background: ${p => p.highlight && colors.primary[100]};

  transition: background-color 0.2s;

  font-size: 1rem;
  color: ${p =>
    p.day === 0
      ? colors.red[700]
      : p.day === 6
      ? colors.blue[700]
      : colors.text.base};
  font-weight: 500;
`

const DateDay = styled.div`
  font-size: 0.75rem;
`
