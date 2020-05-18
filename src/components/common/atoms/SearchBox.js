import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../consts/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <Container>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      <IconWrapper>
        <FontAwesomeIcon icon={['far', 'search']} />
      </IconWrapper>
    </Container>
  )
}

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default SearchBox

const Input = styled.input`
  display: block;

  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.5rem;
  background: ${colors.gray[200]};

  color: ${colors.text.base};
  font-size: 1rem;
  line-height: 1em;

  &:focus {
    outline: none;
    background: #fff;
    border-color: ${colors.primary[500]};
  }
  &::placeholder {
    color: ${colors.text.light};
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1rem;
  height: 1rem;

  color: ${colors.gray[600]};
  font-size: 1rem;
`

const Container = styled.div`
  position: relative;

  ${Input}:focus + ${IconWrapper} {
    color: ${colors.primary[600]};
  }
`
