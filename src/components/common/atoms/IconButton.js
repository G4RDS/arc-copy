import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../consts/theme'

const IconButton = props => (
  <Button
    type="button"
    title={props.title}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </Button>
)

IconButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
}

export default IconButton

const Button = styled.button`
  --size: 2.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;

  transition: 0.2s;

  font-size: 1.25rem;
  color: ${colors.text.base};

  &:not(:disabled):hover {
    background: ${colors.gray[200]};
  }

  &:disabled {
    cursor: default;
    color: ${colors.gray[500]};
  }
`
