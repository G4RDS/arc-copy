import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { colors } from 'consts/theme'

const DateTitle = ({ date, year = true, small = false }) =>
  date != null ? (
    <Container small={small}>
      {year && (
        <>
          {date.year()}
          <DateUnit small={small}>年</DateUnit>
        </>
      )}
      {date.month() + 1}
      <DateUnit small={small}>月</DateUnit>
      {date.date()}
      <DateUnit small={small}>日</DateUnit>
    </Container>
  ) : (
    <></>
  )

DateTitle.propTypes = {
  date: PropTypes.instanceOf(moment),
  year: PropTypes.bool,
  small: PropTypes.bool,
}

export default DateTitle

const Container = styled.h2`
  color: ${colors.text.dark};
  font-size: ${p => (p.small ? '1.5rem' : '2rem')};
  font-weight: bold;
`

const DateUnit = styled.span`
  margin: 0 ${p => (p.small ? '0.25rem' : '0.5rem')};
  font-size: ${p => (p.small ? '1.25rem' : '1.5rem')};
`
