import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccordionPanel = ({ title, icon, children, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Container className={className}>
      <Trigger
        tabIndex={0}
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        {icon && <Icon>{icon}</Icon>}
        <Title>{title}</Title>
        <FontAwesomeIcon
          icon={['far', 'angle-down']}
          transform={{ rotate: isExpanded ? 180 : 0 }}
        />
      </Trigger>
      <Content style={{ display: isExpanded ? 'block' : 'none' }}>
        {children}
      </Content>
    </Container>
  )
}

AccordionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default AccordionPanel

const Container = styled.div``

const Trigger = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  padding: 0.25rem 0;

  color: ${colors.text.dark};
`

const Icon = styled.div`
  display: flex;
  justify-content: center;

  width: 1.5rem;
  margin-right: 0.75rem;

  font-size: 1.25rem;
  text-align: center;
`

const Title = styled.h2`
  flex: 1;

  font-size: 1.125rem;
  font-weight: bold;
`

const Content = styled.div`
  padding: 0 1rem;
`
