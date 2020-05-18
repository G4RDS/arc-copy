import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../consts/theme'

import Gnav from '../components/common/organisms/Gnav'

const AppLayout = ({ title, children }) => {
  return (
    <Container>
      <Gnav />
      <Hero>
        <Title>{title}</Title>
      </Hero>
      {children}
    </Container>
  )
}

AppLayout.propTypes = {
  title: PropTypes.string,
}

export default AppLayout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  min-height: 100vh;
  padding: 4rem 0 0 19rem;
`

const Hero = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  margin-bottom: 2rem;
`

const Title = styled.h1`
  height: 1.2em;

  color: ${colors.text.dark};
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: bold;
`
