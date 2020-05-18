import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import { colors } from 'consts/theme'
import UIConsts from 'consts/report-ui'
import * as Actions from 'redux/actions/work-actions'

import DateRow from '../molecules/DateRow'
import WorkRow from '../molecules/WorkRow'

const WorkGrid = ({ members, work, period, hoveredRow, fetchWork }) => {
  const [newest, setNewest] = useState(moment().startOf('date'))

  // IDの配列に変換
  const memberIds = Object.keys(work?.members ?? {})
  // 従業員名の配列
  const memberNames = []

  memberIds.forEach(id => {
    memberNames.push({
      id,
      name: members[id].name,
    })
  })

  const backDate = () => {
    const moveTo = newest.clone().subtract(period, 'days')

    setNewest(moveTo)
    fetchWork(work.siteId, moveTo)
  }

  const forwardDate = () => {
    const today = moment().startOf('day')
    let moveTo = newest.clone().add(period, 'days')

    // 今日より未来の日には移動できない
    if (today.isBefore(moveTo)) {
      moveTo = today
    }

    setNewest(moveTo)
    fetchWork(work.siteId, moveTo)
  }

  return (
    <Container>
      <LeftSide>
        <MemberHeader>従業員名</MemberHeader>
        <MemberNamesContainer>
          {memberNames.map(({ id, name }, ind) => (
            <MemberNameCell highlight={hoveredRow === ind} key={id}>
              {name}
            </MemberNameCell>
          ))}
        </MemberNamesContainer>
      </LeftSide>
      <RightSide>
        <RightSideInner>
          <GridHeader>
            <DateRow
              newest={newest}
              onBack={backDate}
              onForward={forwardDate}
            />
          </GridHeader>
          <div>
            {memberIds.map((id, ind) => (
              <WorkRow
                member={work.members[id]}
                fromDate={newest}
                row={ind}
                key={id}
              />
            ))}
          </div>
        </RightSideInner>
      </RightSide>
    </Container>
  )
}

export default connect(
  state => ({
    members: state.work.members,
    work: state.work.work,
    period: state.work.period,
    hoveredRow: state.work.hoveredRow,
  }),
  dispatch => ({
    fetchWork(siteId, to) {
      dispatch(Actions.fetchWork(siteId, to))
    },
  })
)(WorkGrid)

const Container = styled.div`
  display: flex;
  align-items: stretch;

  width: 100%;
  max-width: ${UIConsts.MAX_WIDTH}px;
  margin-top: 1rem;
  border: 1px solid ${colors.gray[400]};
  border-radius: 1rem;

  overflow: hidden;
`

const LeftSide = styled.div`
  flex: 0 0 ${UIConsts.MEMBER_COLUMN_WIDTH}px;
  border-right: 3px solid ${colors.gray[400]};
`

const RightSide = styled.div`
  flex: 1 1 0;
  overflow-x: auto;
`

const RightSideInner = styled.div`
  width: min-content;
`

const GridHeader = styled.div`
  width: 100%;
  min-width: min-content;
  height: ${UIConsts.GRID_HEADER_HEIGHT}px;
  border-bottom: 1px solid ${colors.gray[400]};
`

const MemberHeader = styled(GridHeader)`
  padding: 1.5rem;

  color: ${colors.text.base};
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 500;
`

const MemberNamesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: ${UIConsts.ROW_HEIGHT}px;

  height: 100%;
`

const MemberNameCell = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  background: ${p => p.highlight && colors.primary[100]};

  transition: background-color 0.2s;

  color: ${colors.text.base};
  font-weight: 500;

  &:nth-child(2n) {
    background: ${p => !p.highlight && colors.gray[100]};
  }
`
