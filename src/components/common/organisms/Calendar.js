import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import CalendarHeader from '../molecules/CalendarHeader'
import CalendarDays from '../molecules/CalendarDays'
import CalendarBody from '../molecules/CalendarBody'

const Calendar = ({
  selectedDate,
  onSelect,
  onMonthChanged = () => {},
  className,
}) => {
  /**
   * 現在表示されている月の初めの日
   * 初期値はselectedDateが指定されている場合はその日の月、
   * 指定されていない場合は今月
   */
  const [crtMonthFirstDate, setCrtMonthFirstDate] = useState(
    selectedDate != null
      ? selectedDate.clone().startOf('month')
      : moment().startOf('month')
  )

  /**
   * ひとつ前の月のカレンダーに移動
   */
  const goPrevMonth = () => {
    const prev = crtMonthFirstDate.clone().subtract(1, 'month')
    setCrtMonthFirstDate(prev)
    onMonthChanged(prev)
  }

  /**
   * ひとつ先の月のカレンダーに移動
   */
  const goNextMonth = () => {
    const next = crtMonthFirstDate.clone().add(1, 'month')
    setCrtMonthFirstDate(next)
    onMonthChanged(next)
  }

  /**
   * 日付が選択されたら、リスナーに選択された日付のmomentを渡す
   */
  const onDateSelected = date => {
    onSelect(crtMonthFirstDate.clone().date(date))
  }

  return (
    <Container className={className}>
      {/* カレンダーのヘッダー部分 */}
      <CalendarHeader
        year={crtMonthFirstDate.year()}
        month={crtMonthFirstDate.month()}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />
      {/* カレンダーの曜日部分 */}
      <CalendarDays />
      {/* カレンダーの日付部分 */}
      <CalendarBody
        crtMonthFirstDate={crtMonthFirstDate}
        selectedDate={selectedDate}
        onSelect={onDateSelected}
      />
    </Container>
  )
}

Calendar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(moment),
  onMonthChanged: PropTypes.func,
  className: PropTypes.string,
}

export default Calendar

const Container = styled.div`
  width: 100%;
`
