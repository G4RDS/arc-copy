import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ScheduleSite from 'models/ScheduleSite'
import ScheduleMember from 'models/ScheduleMember'
import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/schedule-actions'

import DateTitle from '../../common/atoms/DateTitle'
import MemberGridRow from '../atoms/MemberGridRow'
import TextArea from 'components/common/atoms/TextArea'
import RaisedButton from 'components/common/atoms/RaisedButton'

const SiteDetailModal = ({
  site,
  selectedDate,
  members,
  updateSite,
  onClose,
}) => {
  const [input, setInput] = useState({
    members: site.members.map(member => new ScheduleMember(member)),
    note: site.note,
  })

  const onMemberChange = (index, member) => {
    const members = [...input.members]

    members.splice(index, 1, member)

    setInput({
      ...input,
      members,
    })
  }

  const onNoteChange = e => {
    setInput({ ...input, note: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    // 入力内容を反映した新しいScheduleSiteインスタンスを生成し、Reducerに渡す
    updateSite(new ScheduleSite({ ...site, ...input }))

    onClose()
  }

  return (
    <Form onSubmit={onSubmit}>
      <SiteName>{site.name}</SiteName>
      <DateTitle date={selectedDate} small />

      <MembersGrid>
        {/* 左上は空欄 */}
        <div />
        <GridHeading>
          <div>工数</div>
          <TimeSubHeadings>
            <TimeName>1</TimeName>
            <TimeName>0.5</TimeName>
          </TimeSubHeadings>
        </GridHeading>
        <GridHeading>弁当</GridHeading>
        <GridHeading>宿泊</GridHeading>

        {input.members.map((mem, ind) => (
          <MemberGridRow
            faceImg={members[mem.id].pic}
            name={members[mem.id].name}
            member={mem}
            onChange={member => onMemberChange(ind, member)}
            key={mem.id}
          />
        ))}
      </MembersGrid>

      <Section>
        <TextArea
          label="メモ（配車情報など）"
          value={input.note}
          onChange={onNoteChange}
          rows={3}
          fullWidth
        />
      </Section>

      <Trailing>
        <RaisedButton type="submit" long>
          保存
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

SiteDetailModal.propTypes = {
  site: PropTypes.instanceOf(ScheduleSite).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    selectedDate: state.schedule.selectedDate,
    members: state.schedule.members,
  }),
  dispatch => ({
    updateSite(site) {
      dispatch(Actions.updateSite(site))
    },
  })
)(SiteDetailModal)

const Form = styled.form`
  min-width: 40rem;
`

const SiteName = styled.h1`
  margin-bottom: 0.5rem;

  color: ${colors.text.dark};
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: bold;
`

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  grid-column-gap: 3rem;
  grid-row-gap: 1rem;

  margin-top: 2rem;
`

const GridHeading = styled.div`
  height: 100%;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`

const TimeSubHeadings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const TimeName = styled.div`
  width: 2rem;
  font-size: 0.75rem;
`

const Section = styled.div`
  margin-top: 2rem;
`

const Trailing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 2rem;
`
