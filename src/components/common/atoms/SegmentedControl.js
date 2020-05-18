import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { colors, shadows } from 'consts/theme'

const SegmentedControl = ({ items, selected, onChange }) => {
  const itemEls = useRef([])
  const [props, set] = useSpring(() => ({
    width: 0,
    transform: 'translate(0px, 0)',
    config: {
      tension: 350,
      friction: 30,
    },
  }))

  useEffect(() => {
    const el = itemEls.current[selected]

    set({
      width: el.offsetWidth - 8,
      transform: `translate(${el.offsetLeft}px, 0)`,
    })
  }, [selected, itemEls, set])

  return (
    <Container>
      <SelectedBox style={props} />
      {items.map((item, index) => (
        <Item
          active={index === selected}
          onClick={() => onChange(index)}
          ref={el => (itemEls.current[index] = el)}
          key={item}
        >
          {item}
        </Item>
      ))}
    </Container>
  )
}

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SegmentedControl

const Container = styled.div`
  position: relative;
  display: inline-flex;

  background: ${colors.gray[200]};
  border-radius: 0.5rem;
`

const Item = styled.div`
  position: relative;
  z-index: 2;
  padding: 0.75rem 1.5rem;

  cursor: pointer;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: ${p => (p.active ? 'bold' : '500')};
  text-align: center;
`

const SelectedBox = styled(animated.div)`
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 1;

  height: calc(100% - 8px);
  border-radius: 0.5rem;
  background: #fff;

  box-shadow: ${shadows.md};
`
