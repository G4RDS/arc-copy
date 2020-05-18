import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../consts/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const GnavItem = ({ title, icon, path, isActive }) => {
  return (
    <StyledLink to={path}>
      <Container isActive={isActive}>
        <IconWrapper>
          <FontAwesomeIcon icon={icon} />
        </IconWrapper>
        <Text>{title}</Text>
      </Container>
    </StyledLink>
  )
}

GnavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default GnavItem

/**
 * Linkコンポーネントにスタイル用のpropsを渡したら、
 * そのpropsをDOMのa要素にLinkが渡してしまってWarningが出てしまったので、
 * Containerとコンポーネントを分ける必要があった */
const StyledLink = styled(Link)`
  flex: 1;
  display: block;
`

const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;
  border-radius: 1.5rem;

  transition: 0.15s;

  color: ${colors.text.base};

  background: ${({ isActive }) => isActive && colors.primary[100]};
  color: ${({ isActive }) => isActive && colors.primary[600]};

  &:hover {
    background: ${colors.primary[100]};
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  font-size: 1.5rem;
`

const Text = styled.span`
  margin-left: 0.75rem;

  font-size: 1rem;
  font-weight: 500;
`
