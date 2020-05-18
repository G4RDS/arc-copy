import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'

const Radio = ({ value, onChange }) => {
  return (
    <Container>
      <HiddenRadio checked={value} onChange={onChange} />
      <StyledRadio checked={value} />
    </Container>
  )
}

Radio.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Radio

const Container = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
`

const HiddenRadio = styled.input.attrs(() => ({ type: 'radio' }))`
  display: none;
`

const StyledRadio = styled.span.attrs(() => ({ tabIndex: '0' }))`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-width: ${p => (p.checked ? '6px' : '2px')};
  border-style: solid;
  border-color: ${p => (p.checked ? colors.primary[500] : colors.gray[700])};
  border-radius: 50%;

  &:hover,
  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }
`
