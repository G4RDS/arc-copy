import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { colors } from 'consts/theme'
import * as Actions from 'redux/actions/schedule-actions'

import DateTitle from '../../common/atoms/DateTitle'
import UnallocatedArea from '../molecules/UnallocatedArea'
import SiteArea from '../molecules/SiteArea'
import RaisedButton from 'components/common/atoms/RaisedButton'

const KanbanArea = ({ selectedDate, sites, unallocateAll }) => {
  return (
    <Container>
      <Header>
        <DateTitle date={selectedDate} year={false} />
        <RaisedButton color={colors.primary[500]} onClick={unallocateAll}>
          すべて解除
        </RaisedButton>
      </Header>

      <Main>
        <DndProvider backend={Backend}>
          <AllocatedWrapper>
            {sites.map(site => (
              <SiteArea site={site} key={site.id} />
            ))}
          </AllocatedWrapper>
          <UnallocatedArea />
        </DndProvider>
      </Main>
    </Container>
  )
}

export default connect(
  state => ({
    selectedDate: state.schedule.selectedDate,
    isLoading: state.schedule.isLoading,
    sites: state.schedule.sites,
  }),
  dispatch => ({
    unallocateAll() {
      dispatch(Actions.unallocateAll())
    },
  })
)(KanbanArea)

const Container = styled.div`
  flex: 10 10 0;
  display: flex;
  flex-direction: column;

  max-width: 70rem;
  min-width: 0;
  min-height: 100%;
  padding: 1.5rem 0 0 1.5rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 1.5rem;
`

const Main = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: flex-start;

  height: 100%;
  margin-top: 1.5rem;
`

const AllocatedWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;

  padding-bottom: 1.5rem;
`
