import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/schedule-actions'

import Calendar from 'components/common/organisms/Calendar'
import IconButton from 'components/common/atoms/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CalendarArea = ({ selectedDate, setDate, fetchSchedules }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const onMonthChanged = mom => {
    fetchSchedules(mom.year(), mom.month() + 1)
  }

  const onDateSelected = mom => {
    setDate(mom)
  }

  const onToggleButtonClicked = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <Container isExpanded={isExpanded}>
      <ToggleButtonContainer>
        <IconButton
          title={isExpanded ? 'カレンダーを閉じる' : 'カレンダーを開く'}
          onClick={onToggleButtonClicked}
        >
          <FontAwesomeIcon icon={['far', 'calendar-day']} />
        </IconButton>
      </ToggleButtonContainer>
      <StyledCalendar
        selectedDate={selectedDate}
        onSelect={onDateSelected}
        onMonthChanged={onMonthChanged}
      />
    </Container>
  )
}

export default connect(
  state => ({ selectedDate: state.schedule.selectedDate }),
  dispatch => ({
    setDate(date) {
      dispatch(Actions.setDate(date))
    },
    fetchSchedules(year, month) {
      dispatch(Actions.fetchSchedules(year, month))
    },
  })
)(CalendarArea)

/* カレンダーエリアを縮めてカンバンエリアを表示したときに全てを使い切れる最大幅（カンバンエリアには上限あり） */
const IF_NARROW = '(max-width: 1465px)'

const ToggleButtonContainer = styled.div`
  display: none;

  width: 2.5rem;
  margin: -0.25rem 0 1rem -0.25rem;
`

const StyledCalendar = styled(Calendar)``

const Container = styled.div`
  flex: 3 3 0;

  min-width: 24rem;
  padding: 1.5rem;
  border-top-left-radius: 1rem;
  background: ${colors.gray[100]};

  @media ${IF_NARROW} {
    ${p =>
      !p.isExpanded &&
      `
      min-width: 5rem;
      max-width: 5rem;
    `}

    ${ToggleButtonContainer} {
      display: block;
    }

    ${StyledCalendar} {
      display: ${p => !p.isExpanded && 'none'};
    }
  }
`
