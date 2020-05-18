import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Checkbox = ({ value, onChange, className }) => {
  return (
    <Container className={className}>
      <HiddenCheckbox checked={value} onChange={onChange} />
      <StyledCheckbox checked={value}>
        <StyledFontAwesome icon={['far', 'check']} />
      </StyledCheckbox>
    </Container>
  )
}

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default Checkbox

const Container = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
`

const HiddenCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  display: none;
`

const StyledFontAwesome = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 1rem;
`

const StyledCheckbox = styled.span.attrs(() => ({ tabIndex: '0' }))`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border: 2px solid ${colors.gray[700]};
  border-width: ${p => p.checked && 0};
  border-radius: 0.25rem;
  background: ${p => p.checked && colors.primary[500]};

  &:hover,
  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
  }

  ${StyledFontAwesome} {
    opacity: ${p => (p.checked ? 1 : 0)};
  }
`
