import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { useSpring, animated } from 'react-spring'

import { colors, shadows } from 'consts/theme'
import { DndTypes } from 'consts/dnd'
import ScheduleMemberInfo from 'models/ScheduleMemberInfo'

const KANBAN_WIDTH = 14 // rem
const KANBAN_HEIGHT = 5.5 // rem
const KANBAN_X_OFFSET = KANBAN_WIDTH + 1 // rem

const MemberKanban = ({ member, index, columns = 1, prevLength, onRest }) => {
  const [, dragRef] = useDrag({
    item: {
      type: DndTypes.MEMBER,
      id: member.id,
    },
  })

  /**
   * 位置をreact-springでアニメーションさせる
   * y座標はKANBAN_HEIGHT * yだが、出現時に1rem下からふわっと浮き上がるようにする
   * また、同時出現数に応じてディレイを与える
   */
  const x = index % columns ? KANBAN_X_OFFSET : 0
  const y = Math.floor(index / columns)
  const spring = useSpring({
    transform: `translate(${x}rem, ${KANBAN_HEIGHT * y}rem)`,
    opacity: 1,
    from: {
      transform: `translate(${x}rem, ${KANBAN_HEIGHT * y + 1}rem)`,
      opacity: 0,
    },
    delay: 100 * (index - prevLength),
    onRest() {
      // 出現アニメーションが完了したらディレイを無効化したいために行う処理
      // 詳しくはDroppableArea参照
      onRest(index)
    },
  })

  return (
    <Container style={spring} ref={dragRef}>
      {member.faceImg ? <Avator src={member.faceImg} /> : <DummyAvator />}
      <TextWrapper>
        <Name>{member.name}</Name>
        <Detail>{`${member.role}（${member.companyShort}）`}</Detail>
      </TextWrapper>
    </Container>
  )
}

MemberKanban.propTypes = {
  member: PropTypes.instanceOf(ScheduleMemberInfo).isRequired,
  index: PropTypes.number.isRequired,
  columns: PropTypes.number,
  prevLength: PropTypes.number,
  onRest: PropTypes.func,
}

export default MemberKanban

const Container = styled(animated.div)`
  position: absolute;
  display: flex;
  align-items: center;

  width: 14rem;
  height: 4.5rem;
  margin-top: 1rem;
  padding: 1rem;

  border-radius: 0.5rem;
  background: #fff;
  box-shadow: ${shadows.rg};

  overflow: hidden;
  user-select: none;
  cursor: pointer;
`

const Avator = styled.img`
  flex: 0 0 auto;

  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;

  border-radius: 50%;
`

const DummyAvator = styled.div`
  flex: 0 0 auto;

  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;

  border-radius: 50%;
  background: ${colors.gray[300]};
`

const TextWrapper = styled.div`
  flex: 0 0 auto;

  width: 8.75rem;
`

const Name = styled.h3`
  color: ${colors.text.dark};
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Detail = styled.h4`
  margin-top: 0.25rem;

  color: ${colors.text.base};
  font-size: 0.75rem;
  line-height: 1em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
