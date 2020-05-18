import React from 'react'
import styled from 'styled-components'

import { colors } from 'consts/theme'

import RaisedButton from 'components/common/atoms/RaisedButton'

const NotFound = () => {
  return (
    <Container>
      <Card>
        <Title>ページは存在しません</Title>
        <Description>指定されたページは見つかりませんでした。</Description>
        <RaisedButton to="/login">アプリに戻る</RaisedButton>
      </Card>
    </Container>
  )
}

export default NotFound

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  padding: 2rem;
`

const Card = styled.div`
  padding: 2rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 1rem;

  text-align: center;
`

const Title = styled.h1`
  color: ${colors.text.dark};
  font-size: 1.5rem;
  font-weight: bold;
`

const Description = styled.p`
  margin: 1rem 0;

  color: ${colors.text.light};
  font-size: 1rem;
`
