import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { colors } from 'consts/theme'

const CalendarBody = ({ crtMonthFirstDate, selectedDate, onSelect }) => {
  const firstDate = crtMonthFirstDate.clone()
  const dates = []

  // 最初の日まで空欄で埋める
  const firstDay = firstDate.day()
  for (let i = 0; i < firstDay; i++) {
    dates.push(<div key={`emp-${i}`} />)
  }

  // 日付部分を埋めていく
  const crt = firstDate.clone()
  const lastDate = firstDate.endOf('month').date()
  for (let i = 1; i <= lastDate; i++) {
    dates.push(
      <Date
        selected={crt.isSame(selectedDate, 'day')}
        data-date={i}
        onClick={() => onSelect(i)}
        key={i}
      />
    )
    crt.add(1, 'day')
  }

  return <Container>{dates}</Container>
}

CalendarBody.propTypes = {
  crtMonthFirstDate: PropTypes.instanceOf(moment).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(moment),
}

export default CalendarBody

const Container = styled.div`
  display: grid;
  /* セル横幅:gap横幅 = 4:1 */
  grid-template-columns: repeat(7, calc(100% / 8.5));
  grid-column-gap: calc(100% / 34);
  /* 6%がちょうどよかった。 */
  grid-row-gap: 6%;

  width: 100%;
  margin-top: 1rem;
`

const Date = styled.button`
  position: relative;
  display: block;

  padding-top: 100%;
  background: transparent;
  border: none;

  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: 50%;
    background: ${({ selected }) => selected && colors.primary[500]};
  }
  &:hover::before {
    background: ${({ selected }) => !selected && colors.primary[100]};
  }

  &::after {
    content: attr(data-date) '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: ${({ selected }) => (selected ? '#fff' : colors.text.base)};
    font-size: 1.25rem;
    font-weight: 500;
  }
`
