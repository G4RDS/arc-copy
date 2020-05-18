import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from 'consts/theme'

const FlatButton = props => {
  const color = props.color || colors.gray[700]

  return (
    <ButtonWrapper
      long={props.long}
      style={{ color }}
      className={props.className}
    >
      {props.to ? (
        <StyledLink to={props.to}>{props.children}</StyledLink>
      ) : props.href ? (
        <a href={props.href}>{props.children}</a>
      ) : (
        <button
          type={props.type || 'button'}
          disabled={props.disabled}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </ButtonWrapper>
  )
}

FlatButton.propTypes = {
  color: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  href: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  long: PropTypes.bool,
  children: PropTypes.node,
}

export default FlatButton

const ButtonWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  border-radius: 0.25rem;

  transition: 0.2s;

  font-weight: 500;
  text-decoration: none;

  > * {
    padding: 0.5rem 1rem;
    padding-left: ${p => p.long && '1.5rem'};
    padding-right: ${p => p.long && '1.5rem'};
  }

  &:hover {
    background: ${p => !p.disabled && colors.gray[100]};
  }

  ${p =>
    p.disabled &&
    css`
      & {
        opacity: 0.5;
      }

      > button {
        cursor: default;
      }
    `};
`

const StyledLink = styled(Link)`
  color: ${colors.blue[600]};
`
