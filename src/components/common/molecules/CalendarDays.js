import React from 'react'
import styled from 'styled-components'

import { colors } from 'consts/theme'

const CalendarDays = () => (
  <Container>
    <Day color={colors.red[600]}>日</Day>
    <Day>月</Day>
    <Day>火</Day>
    <Day>水</Day>
    <Day>木</Day>
    <Day>金</Day>
    <Day color={colors.blue[600]}>土</Day>
  </Container>
)

export default CalendarDays

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 8.5));
  grid-column-gap: calc(100% / 34);

  width: 100%;
  margin-top: 2rem;
`

const Day = styled.div`
  color: ${({ color }) => color || colors.gray[600]};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`
