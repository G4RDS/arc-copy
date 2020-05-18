import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import Report from 'models/Report'
import WorkMember from 'models/WorkMember'
import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/work-actions'

import DateTitle from 'components/common/atoms/DateTitle'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'
import TextArea from 'components/common/atoms/TextArea'

const ReportModal = ({ member, date, onClose, setReport, deleteReport }) => {
  const [input, setInput] = useState(member.reports[date] ?? new Report({}))

  const onChange = e => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'manHour' || name === 'overtime') {
      value = Number(value)
    }

    setInput({
      ...input,
      [name]: value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    setReport(member.id, date, new Report({ ...input, isReported: true }))
    onClose()
  }

  const handleDeleteReport = () => {
    deleteReport(member.id, date, input.schedule)
    onClose()
  }

  return (
    <Form onSubmit={onSubmit}>
      <AvatorAndName>
        <Avator src="/test_person.jpg" />
        <Name>萩本</Name>
      </AvatorAndName>

      <DateTitle date={moment(date)} small />

      <InputSection>
        <SectionLabel>作業工数</SectionLabel>
        <InputWrapper>
          <NumberInput
            name="manHour"
            step={0.25}
            value={input.manHour}
            onChange={onChange}
          />
          <Unit>工数</Unit>
        </InputWrapper>
      </InputSection>

      <InputSection>
        <SectionLabel>残業時間</SectionLabel>
        <InputWrapper>
          <NumberInput
            name="overtime"
            value={input.overtime}
            onChange={onChange}
          />
          <Unit>時間</Unit>
        </InputWrapper>
      </InputSection>

      <InputSection>
        <TextArea
          label="作業内容"
          rows={3}
          name="detail"
          value={input.detail}
          onChange={onChange}
          fullWidth
        />
      </InputSection>

      <InputSection>
        <TextArea
          label="摘要"
          rows={3}
          name="summary"
          value={input.summary}
          onChange={onChange}
          fullWidth
        />
      </InputSection>

      <Trailing>
        <TrailingLeft>
          <RaisedButton
            type="button"
            color={colors.red[500]}
            onClick={handleDeleteReport}
            long
          >
            削除
          </RaisedButton>
        </TrailingLeft>
        <TrailingRight>
          <FlatButton type="button" onClick={onClose}>
            キャンセル
          </FlatButton>
          <RaisedButton type="submit" color={colors.primary[500]} long>
            保存
          </RaisedButton>
        </TrailingRight>
      </Trailing>
    </Form>
  )
}

ReportModal.propTypes = {
  member: PropTypes.instanceOf(WorkMember).isRequired,
  date: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default connect(
  () => ({}),
  dispatch => ({
    setReport(memberId, date, report) {
      dispatch(Actions.setReport(memberId, date, report))
    },
    deleteReport(memberId, date, schedule) {
      dispatch(Actions.deleteReport(memberId, date, schedule))
    },
  })
)(ReportModal)

const Form = styled.form`
  min-width: 40rem;
`

const AvatorAndName = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 2rem;
`

const Avator = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${colors.gray[300]};
`

const Name = styled.h1`
  margin-left: 2rem;

  color: ${colors.text.dark};
  font-size: 2rem;
  font-weight: bold;
`

const InputSection = styled.div`
  margin-top: 2rem;
`

const SectionLabel = styled.h2`
  color: ${colors.text.dark};
  font-size: 1rem;
  font-weight: bold;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`

const NumberInput = styled.input.attrs(p => ({ type: 'number' }))`
  width: 4rem;
  padding: 0.75rem 1rem;
  border: 2px solid ${colors.gray[600]};
  border-radius: 0.5rem;

  text-align: right;

  color: ${colors.text.base};

  &:focus {
    border-color: ${colors.primary[500]};
    outline: none;
  }

  /* スピンボタンを非表示 */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Unit = styled.span`
  margin-left: 0.75rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
`

const Trailing = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 2rem;
`

const TrailingLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

const TrailingRight = styled.div`
  display: flex;
  justify-content: flex-end;

  *:not(:first-child) {
    margin-left: 1rem;
  }
`
