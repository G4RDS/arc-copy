import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const LoadingSpinner = ({ size, color, strokeWidth = '3px', className }) => {
  return (
    <StyledSVG className={className} viewBox="0 0 24 24" size={size}>
      <StyledCircle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeMiterlimit="10"
        color={color}
        strokeWidth={strokeWidth}
      />
    </StyledSVG>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string,
}

export default LoadingSpinner

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 45, 200;
    stroke-dashoffset: -17px;
  }
  100% {
    stroke-dasharray: 45, 200;
    stroke-dashoffset: -62px;
  }
`

const StyledSVG = styled.svg`
  display: inline-block;

  width: ${({ size }) => size};
  height: ${({ size }) => size};

  animation: ${rotate} 2s linear 0s infinite forwards;

  vertical-align: -0.125em;
`

const StyledCircle = styled.circle`
  stroke: ${({ color }) => color};
  stroke-width: ${({ strokeWidth }) => strokeWidth};

  animation: ${dash} 1.5s ease-in-out 0s infinite forwards;
`
