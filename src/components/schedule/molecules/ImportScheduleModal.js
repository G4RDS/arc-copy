import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/schedule-actions'

import ImportDateItem from '../atoms/ImportDateItem'
import FlatButton from 'components/common/atoms/FlatButton'
import RaisedButton from 'components/common/atoms/RaisedButton'
import ScheduleSite from 'models/ScheduleSite'

const SiteDetailModal = ({
  onClose,
  schedules,
  selectedDate,
  setSchedule,
  fetchSchedules,
  updateSite,
  recalcUnallocated,
}) => {
  // 選択された値（何日前か）
  const [selected, setSelected] = useState(1)

  const year = selectedDate.year()
  const month = selectedDate.month() + 1
  const date = selectedDate.date()

  const onSelect = num => {
    setSelected(num)
  }

  const onSubmit = async e => {
    e.preventDefault()

    // インポート元の日付
    const mom = selectedDate.clone().subtract(selected, 'days')
    // インポート元の場割
    let source = schedules[mom.format('YYYY-MM-DD')]
    // インポート先の場割
    const target = schedules[selectedDate.format('YYYY-MM-DD')]

    // 指定された日付のデータをまだ取得していない場合、サーバーから取得
    if (schedules[mom.format('YYYY-MM-DD')] == null) {
      const schedules = await fetchSchedules(mom.year(), mom.month() + 1)
      source = schedules[mom.format('YYYY-MM-DD')]
    }

    // 指定された日付には現場が割り当てられていない場合にnullとなってしまう
    // この場合にはインポートできないため、このままモーダルを閉じる
    if (source == null) {
      onClose()
      return
    }

    // そもそもインポート先のインスタンスがない場合はエラーを発生
    if (target == null) {
      throw new Error('インポート先にインスタンスがありません')
    }

    // インポート先に存在する現場のみインポート
    target.sites.forEach(targetSite => {
      // インポート元の対応する現場インスタンス
      const sourceSite = source.sites.find(s => s.siteId === targetSite.siteId)

      // インポート元にこの現場がない場合は更新不要
      if (sourceSite == null) return

      // 作業員情報のみをインポート
      updateSite(
        new ScheduleSite({
          ...targetSite,
          members: sourceSite.members,
        })
      )
    })

    recalcUnallocated()

    onClose()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title>場割データをインポート</Title>
      <Description>
        {`${year} 年 ${month} 月 ${date} 日はまだ場割が行われていないようです。以前の場割データをインポートできます。`}
      </Description>

      <Label>インポートする日</Label>
      <DatesGrid>
        {/* 前日以前の七日間から選べるようにする */}
        {[...new Array(7).keys()]
          .map(k => k + 1)
          .map(num => (
            <ImportDateItem
              date={selectedDate.clone().subtract(num, 'day')}
              isDayBefore={num === 1}
              isSelected={num === selected}
              onSelect={() => onSelect(num)}
              key={num}
            />
          ))}
      </DatesGrid>

      <Trailing>
        <FlatButton type="button" onClick={onClose}>
          キャンセル
        </FlatButton>
        <RaisedButton type="submit">インポート</RaisedButton>
      </Trailing>
    </Form>
  )
}

SiteDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    schedules: state.schedule.schedules,
    selectedDate: state.schedule.selectedDate,
    members: state.schedule.members,
  }),
  dispatch => ({
    setSchedule(schedule) {
      dispatch(Actions.setSchedule(schedule))
    },
    fetchSchedules(year, date) {
      return dispatch(Actions.fetchSchedules(year, date))
    },
    updateSite(site) {
      dispatch(Actions.updateSite(site))
    },
    recalcUnallocated() {
      dispatch(Actions.recalcUnallocated())
    },
  })
)(SiteDetailModal)

const Form = styled.form`
  min-width: 40rem;
`

const Title = styled.h1`
  color: ${colors.text.dark};
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: bold;
`

const Description = styled.p`
  margin-top: 1rem;

  color: ${colors.text.base};
`

const Label = styled.h2`
  margin-top: 2rem;

  color: ${colors.text.dark};
  font-size: 1rem;
  line-height: 1.2em;
  font-weight: bold;
`

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 0.5rem;

  margin-top: 0.5rem;
`

const Trailing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 2rem;

  > * {
    margin-left: 1rem;
  }
`
