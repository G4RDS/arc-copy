import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'

import useModal from 'hooks/useModal'
import { colors } from 'consts/theme'
import ScheduleSite from 'models/ScheduleSite'
import * as Actions from 'redux/actions/schedule-actions'

import RaisedButton from 'components/common/atoms/RaisedButton'
import DroppableArea from './DroppableArea'
import SiteDetailModal from './SiteDetailModal'

const AREA_DEFAULT_HEIGHT = 3.75 // rem
const KANBAN_HEIGHT = 5.5 // rem

const SiteArea = ({ site, members, moveMember }) => {
  const [openModal, closeModal] = useModal()

  const oneManHourMembers = []
  const halfManHourMembers = []

  /**
   * 全ての割り当てられられた作業員を時間区分ごとに分類し、
   * Memberインスタンスに入れ替える
   */
  site.members.forEach(mem => {
    if (mem.time === 1) {
      oneManHourMembers.push(members[mem.id])
    } else if (mem.time === 0.5) {
      halfManHourMembers.push(members[mem.id])
    }
  })

  /**
   * 時間エリアのheightをreact-springでアニメーションさせる
   * heightは時間区分の中で最も人数が多いものから計算
   */
  const maxLength = Math.max(
    Math.ceil(oneManHourMembers.length / 2),
    halfManHourMembers.length,
    1 // 最低でもカンバン一つ分の高さは確保する（ドロップしやすくするため）
  )
  const spring = useSpring({
    height: `${KANBAN_HEIGHT * maxLength + AREA_DEFAULT_HEIGHT}rem`,
    from: {
      height: `${KANBAN_HEIGHT * maxLength + AREA_DEFAULT_HEIGHT}rem`,
    },
  })

  /**
   * 詳細モーダルを表示
   */
  const showDetails = () => {
    openModal(<SiteDetailModal site={site} onClose={closeModal} />, {
      persistent: true,
    })
  }

  /**
   * カンバンがドロップされたときに呼ばれるコールバック
   * 作業員の移動処理を行う
   * @param {Object} item DnDのDragItem
   * @param {Number} manHour ドロップされた工数区分
   */
  const onDrop = (item, manHour) => {
    moveMember(item.id, site.id, manHour)
  }

  return (
    <Container>
      <Header>
        <SiteName>{site.name}</SiteName>
        <ButtonsWrapper>
          <RaisedButton color={colors.primary[500]} onClick={showDetails} long>
            詳細
          </RaisedButton>
        </ButtonsWrapper>
      </Header>

      <AreasWrapper>
        <Area style={spring}>
          <DroppableArea
            name="1 工数"
            columns={2}
            members={oneManHourMembers}
            onDrop={item => onDrop(item, 1)}
          />
        </Area>
        <Area style={spring}>
          <DroppableArea
            name="0.5 工数"
            members={halfManHourMembers}
            onDrop={item => onDrop(item, 0.5)}
          />
        </Area>
      </AreasWrapper>
    </Container>
  )
}

SiteArea.propTypes = {
  site: PropTypes.instanceOf(ScheduleSite).isRequired,
}

export default connect(
  state => ({
    members: state.schedule.members,
  }),
  dispatch => ({
    moveMember(memberId, siteId, timeDivisin) {
      dispatch(Actions.moveMember(memberId, siteId, timeDivisin))
    },
  })
)(SiteArea)

const Container = styled.div`
  max-width: 51rem;

  &:not(:first-child) {
    margin-top: 1.5rem;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SiteName = styled.h2`
  color: ${colors.text.dark};
  font-size: 1.5rem;
  font-weight: bold;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AreasWrapper = styled.div`
  display: flex;
  align-items: stretch;

  width: 100%;
  margin-top: 1rem;

  overflow-x: auto;
`

const Area = styled(animated.div)`
  flex: 0 0 auto;

  border-radius: 1rem;

  overflow: hidden;

  &:not(:first-child) {
    margin-left: 1.5rem;
  }
`
