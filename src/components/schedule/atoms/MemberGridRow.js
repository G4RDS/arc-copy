import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ScheduleMember from 'models/ScheduleMember'
import { colors } from 'consts/theme'

import Checkbox from 'components/common/atoms/Checkbox'
import Radio from 'components/common/atoms/Radio'

const MemberGridRow = ({ faceImg, name, member, onChange }) => {
  const onInputChange = (property, value) => {
    onChange(new ScheduleMember({ ...member, [property]: value }))
  }

  return (
    <>
      <AvatorAndName>
        <Avator src={faceImg} />
        <Name>{name}</Name>
      </AvatorAndName>

      <TimesWrapper>
        <RadioWrapper>
          <Radio
            value={member.time === 1}
            onChange={e => onInputChange('time', 1)}
          />
        </RadioWrapper>
        <RadioWrapper>
          <Radio
            value={member.time === 0.5}
            onChange={e => onInputChange('time', 0.5)}
          />
        </RadioWrapper>
      </TimesWrapper>

      <CheckBoxWrapper>
        <Checkbox
          value={member.meal}
          onChange={e => onInputChange('meal', e.target.checked)}
        />
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <Checkbox
          value={member.stay}
          onChange={e => onInputChange('stay', e.target.checked)}
        />
      </CheckBoxWrapper>
    </>
  )
}

MemberGridRow.propTypes = {
  faceImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  member: PropTypes.instanceOf(ScheduleMember).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MemberGridRow

const AvatorAndName = styled.div`
  display: flex;
  align-items: center;
`

const Avator = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${colors.gray[300]};
`

const Name = styled.div`
  margin-left: 0.75rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
`

const TimesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 2rem;
`

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
