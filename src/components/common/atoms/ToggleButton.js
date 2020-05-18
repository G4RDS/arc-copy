import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getButtonStyle } from 'utils/style'
import { colors } from 'consts/theme'

const ToggleButton = ({
  value,
  onChange,
  color = colors.gray[200],
  icon,
  children,
}) => {
  const style = getButtonStyle(color)

  return (
    <Button active={value} onClick={() => onChange(!value)} {...style}>
      {icon}
      <TextWrapper>{children}</TextWrapper>
    </Button>
  )
}

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  icon: PropTypes.node,
}

export default ToggleButton

const Button = styled.button`
  display: inline-flex;
  align-items: center;

  padding: 0.5rem 1rem;

  border-radius: 0.25rem;
  border: 1px solid ${p => (p.active ? p.color : colors.gray[600])};
  background: ${p => p.active && p.color};

  transition: 0.2s;

  color: ${colors.text.base};
  font-size: 1rem;
`

const TextWrapper = styled.span`
  margin-left: 0.75rem;

  font-weight: 500;
`
