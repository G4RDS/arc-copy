import React, { useContext } from 'react'
import styled from 'styled-components'

import useRouter from 'hooks/useRouter'
import UserContext from 'contexts/User'
import { colors } from 'consts/theme'

import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const NotAuthorized = () => {
  const userCtx = useContext(UserContext)
  const router = useRouter()

  return (
    <Container>
      <Logo src="/logo.svg" />

      <Title>ログイン中のユーザーではアクセスできません</Title>
      <Description>
        ログイン中のユーザー「{userCtx.user?.name}
        」には、アクセスしようとしている {
          router.location.state?.from.pathname
        }{' '}
        を表示する権限がありません。
        <br />
        表示するには権限のあるユーザーでログインし直す必要があります。
      </Description>

      <Buttons>
        <RaisedButton to="/logout">ログアウト</RaisedButton>
        <StyledFlatButton to="/login">アプリに戻る</StyledFlatButton>
      </Buttons>
    </Container>
  )
}

export default NotAuthorized

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
  padding: 2rem;
`

const Logo = styled.img`
  height: 2.5rem;
`

const Title = styled.h1`
  margin-top: 2rem;

  color: ${colors.text.dark};
  font-size: 2rem;
  text-align: center;
`

const Description = styled.p`
  margin-top: 1rem;

  color: ${colors.text.base};
  font-size: 1rem;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 2rem;
`

const StyledFlatButton = styled(FlatButton)`
  margin-top: 1rem;
`
