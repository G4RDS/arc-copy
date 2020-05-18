import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../consts/theme'

import LoadingSpinner from '../atoms/LoadingSpinner'

const LoadingIndicator = ({ size = '2em', color }) => (
  <Container size={size}>
    <LoadingSpinner size={size} color={color || colors.gray[600]} />
  </Container>
)

LoadingIndicator.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
}

export default LoadingIndicator

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: ${({ size }) => size};
`
