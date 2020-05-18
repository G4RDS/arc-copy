import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CalendarHeader = ({ year, month, onPrevMonth, onNextMonth }) => {
  const monthTitle = [
    <React.Fragment key="yv">{year}</React.Fragment>,
    <MonthUnit key="yu">年</MonthUnit>,
    <React.Fragment key="mv">{month + 1}</React.Fragment>,
    <MonthUnit key="mu">月</MonthUnit>,
  ]

  return (
    <Container>
      <MonthTitle>{monthTitle}</MonthTitle>
      <ButtonWrapper>
        <Button onClick={onPrevMonth}>
          <FontAwesomeIcon icon={['far', 'angle-left']} />
        </Button>
        <Button onClick={onNextMonth}>
          <FontAwesomeIcon icon={['far', 'angle-right']} />
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

CalendarHeader.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
}

export default CalendarHeader

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MonthTitle = styled.h2`
  color: ${colors.text.dark};
  font-size: 2rem;
  font-weight: bold;
`

const MonthUnit = styled.span`
  margin: 0 0.5rem;
  font-size: 1.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;

  border: 2px solid ${colors.gray[600]};
  border-radius: 1.25rem;

  color: ${colors.gray[600]};
  font-size: 1.25rem;

  &:not(:first-child) {
    margin-left: 2rem;
  }
`
