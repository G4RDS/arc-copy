import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, shadows } from '../../../consts/theme'

const SiteItem = ({ name, clientName, path }) => {
  return (
    <li>
      <StyledLink to={path}>
        <Name>{name}</Name>
        <Company>{clientName}</Company>
      </StyledLink>
    </li>
  )
}

SiteItem.propTypes = {
  name: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default SiteItem

const StyledLink = styled(Link)`
  display: block;

  width: 100%;
  height: 100%;
  padding: 1.5rem;

  border-radius: 0.5rem;
  background: #fff;
  box-shadow: ${shadows.rg};

  transition: 0.2s box-shadow;

  &:hover {
    box-shadow: ${shadows.md};
  }
`

const Name = styled.h2`
  color: ${colors.text.base};
  font-size: 1.25rem;
  line-height: 1.5em;
  font-weight: bold;
`

const Company = styled.h3`
  color: ${colors.text.light};
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: normal;
`
