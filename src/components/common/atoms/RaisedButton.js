import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { getButtonStyle } from 'utils/style'
import { colors } from 'consts/theme'

import LoadingSpinner from './LoadingSpinner'

const RaisedButton = props => {
  const style = getButtonStyle(props.color || colors.primary[500])

  return (
    <ButtonWrapper long={props.long} disabled={props.disabled} {...style}>
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
          <LoaderOverlay visible={props.loading} {...style}>
            <LoadingSpinner size="1rem" color="#fff" />
          </LoaderOverlay>
        </button>
      )}
    </ButtonWrapper>
  )
}

RaisedButton.propTypes = {
  color: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  href: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  long: PropTypes.bool,
  children: PropTypes.node,
}

export default RaisedButton

const ButtonWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  border-radius: 0.25rem;
  background: ${p => p.color};
  box-shadow: 0 1px 3px 0 ${p => p.shadow1}, 0 1px 2px 0 ${p => p.shadow2};

  transition: 0.2s;

  color: #fff;
  font-weight: 500;
  text-decoration: none;

  > * {
    padding: 0.5rem 1rem;
    padding-left: ${p => p.long && '1.5rem'};
    padding-right: ${p => p.long && '1.5rem'};
  }

  &:hover {
    box-shadow: ${p =>
      !p.disabled &&
      `0 4px 6px -1px ${p.shadow1},
      0 2px 4px -1px ${p.shadow2}`};
  }

  ${p =>
    p.disabled &&
    css`
      & {
        box-shadow: none;
        opacity: 0.5;
      }
      > button {
        cursor: default;
      }
    `};
`

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  display: ${p => (p.visible ? 'block' : 'none')};

  background: ${p => p.color};
`

const StyledLink = styled(Link)`
  color: #fff;
`
