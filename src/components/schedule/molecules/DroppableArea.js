import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'

import { colors } from 'consts/theme'
import { DndTypes } from 'consts/dnd'
import ScheduleMemberInfo from 'models/ScheduleMemberInfo'

import MemberKanban from '../atoms/MemberKanban'

const COL1_AREA_WIDTH = 16 // rem
const COL2_AREA_WIDTH = 31 // rem

const DroppableArea = ({
  name,
  columns = 1,
  members,
  onDrop,
  kanbansWrapperStyle,
}) => {
  /**
   * カンバンの出現アニメーションをインデックスに応じてどの程度遅らせるかどうかを決めるステート
   * カンバンが挿入された時に既にあるカンバンの数によって出現が遅れてしまうので、
   * カンバンが出現した後移動するときにはディレイをいれないようにしたい。
   * でも、同時に二つ以上挿入されるとき（すべて解除の時）はディレイしてほしい。
   * つまり、挿入されたカンバンだけがディレイしてほしい。
   * そこで、最後にアニメーションされたときの長さを記録することで、追加されたカンバンの数がわかるようにした。
   * 現状移動時にはリストの最後に追加されるので機能するが、順序も変えられるようになったら実装を変える必要がある
   */
  const [prevLength, setPrevLength] = useState(0)
  // カンバンを持った状態でホバーされたときに背景を濃くしたい
  const [isHovered, setIsHovered] = useState(false)

  const [, dropRef] = useDrop({
    accept: DndTypes.MEMBER,
    drop(item) {
      onDrop(item)
    },
    collect(monitor) {
      const isOver = monitor.isOver()
      if (isOver !== isHovered) setIsHovered(isOver)
    },
  })

  if (columns !== 1 && columns !== 2) {
    throw new Error('columns must be 1 or 2')
  }

  return (
    <Container isHovered={isHovered} ref={dropRef} col2={columns === 2}>
      <AreaName>{name}</AreaName>

      <KanbansWrapper style={kanbansWrapperStyle}>
        {members.map((member, index) => (
          <MemberKanban
            member={member}
            index={index}
            columns={columns}
            prevLength={prevLength}
            onRest={index => {
              // 最後のカンバンが表示されたので、prevLengthを更新
              if (index === members.length - 1) {
                setPrevLength(members.length)
              }
            }}
            key={member.id}
          />
        ))}
      </KanbansWrapper>
    </Container>
  )
}

DroppableArea.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.instanceOf(ScheduleMemberInfo))
    .isRequired,
  onDrop: PropTypes.func.isRequired,
  columns: PropTypes.number,
  kanbansWrapperStyle: PropTypes.object,
}

export default DroppableArea

const Container = styled.div`
  width: ${p => (p.col2 ? COL2_AREA_WIDTH : COL1_AREA_WIDTH)}rem;
  height: 100%;
  padding: 1rem;
  background: ${p => (p.isHovered ? colors.gray[200] : colors.gray[100])};

  transition: background-color 0.2s;
`

const AreaName = styled.h2`
  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`

const KanbansWrapper = styled.div`
  position: relative;
`
