import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as Actions from 'redux/actions/schedule-actions'

import DroppableArea from './DroppableArea'

const UnallocatedArea = ({ members, unallocated, moveMember }) => {
  /**
   * unallocatedにはScheduleMemberインスタンス配列が入っているため、
   * それらをMemberインスタンスの配列に変換する
   */
  const unallocatedMembers = unallocated.map(mem => members[mem.id])

  const onDrop = item => {
    moveMember(item.id, null, null)
  }

  return (
    <Area>
      <DroppableArea
        name="未割り当て"
        members={unallocatedMembers}
        onDrop={onDrop}
      />
    </Area>
  )
}

export default connect(
  state => ({
    members: state.schedule.members,
    unallocated: state.schedule.unallocated,
  }),
  dispatch => ({
    moveMember(memberId, siteId, timeDivision) {
      dispatch(Actions.moveMember(memberId, siteId, timeDivision))
    },
  })
)(UnallocatedArea)

const Area = styled.div`
  flex: 0 0 auto;

  height: 100%;
  margin-left: 1.5rem;
  border-top-left-radius: 1rem;

  overflow: hidden;
`
