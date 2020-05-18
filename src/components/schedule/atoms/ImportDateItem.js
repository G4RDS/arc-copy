import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { colors } from 'consts/theme'

const ImportDateItem = ({ date: mom, onSelect, isDayBefore, isSelected }) => {
  const month = mom.month() + 1
  const date = mom.date()
  const day = mom.day()
  let dayString = ['日', '月', '火', '水', '木', '金', '土'][day]

  return (
    <Container isSelected={isSelected} onClick={onSelect}>
      <Text>
        {`${month} 月 ${date} 日`}
        <DayText isSat={day === 6} isSun={day === 0}>
          （{dayString}）
        </DayText>
      </Text>
      {isDayBefore && <Text>前日</Text>}
    </Container>
  )
}

ImportDateItem.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  onSelect: PropTypes.func.isRequired,
  isDayBefore: PropTypes.bool,
  isSelected: PropTypes.bool,
}

export default ImportDateItem

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 1.5rem;

  border: 2px solid
    ${p => (p.isSelected ? colors.primary[500] : colors.gray[500])};
  border-radius: 0.5rem;
  background: ${p => p.isSelected && colors.primary[100]};

  transition: 0.15s;

  cursor: pointer;
`

const Text = styled.span`
  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`

const DayText = styled(Text)`
  color: ${p =>
    p.isSat ? colors.blue[600] : p.isSun ? colors.red[600] : colors.text.base};
`
