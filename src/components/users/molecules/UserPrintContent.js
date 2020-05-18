import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import User from 'models/User'
import { colors } from 'consts/theme'
import { userRoleNames } from 'consts/user'

export const PrintContentType = {
  ADD: 'ADD',
  RESET: 'RESET',
}

const UserPrintContent = React.forwardRef(({ type, user, password }, ref) => {
  const description =
    type === PrintContentType.ADD
      ? `あなたのアカウントが作成されました。
初回ログイン時に以下の認証情報をご入力いただき、パスワードを再設定してください。`
      : `あなたのパスワードがリセットされました。
次回ログイン時に以下の認証情報をご入力いただき、パスワードを再設定してください。`

  return (
    <HideWrapper>
      <Container ref={ref}>
        <Logo src="/logo.svg" />

        <Description>{description}</Description>

        <Card>
          <DataTitle>名前</DataTitle>
          <DataContent>{user.name}</DataContent>

          <DataTitle>役職</DataTitle>
          <DataContent>{userRoleNames[user.role]}</DataContent>

          <DataTitle>メールアドレス</DataTitle>
          <DataContent>{user.email}</DataContent>

          <DataTitle>パスワード</DataTitle>
          <DataContent isPassword>{password}</DataContent>
        </Card>
      </Container>
    </HideWrapper>
  )
})

UserPrintContent.displayName = 'UserPrintContent'

UserPrintContent.propTypes = {
  type: PropTypes.oneOf(Object.values(PrintContentType)).isRequired,
  user: PropTypes.instanceOf(User).isRequired,
  password: PropTypes.string.isRequired,
}

export default UserPrintContent

const HideWrapper = styled.div`
  display: none;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
  padding: 5rem;
`

const Logo = styled.img`
  height: 3.5rem;
`

const Description = styled.p`
  margin-top: 2rem;

  color: ${colors.text.dark};
  font-size: 1.25rem;
  white-space: pre-line;
  text-align: center;
`

const Card = styled.div`
  min-width: 32rem;
  margin-top: 2rem;
  padding: 2rem;
  border: 2px solid ${colors.gray[600]};
  border-radius: 1rem;
`

const DataTitle = styled.h2`
  color: ${colors.text.base};
  font-size: 1.25rem;
  font-weight: bold;

  &:not(:first-child) {
    margin-top: 1.5rem;
  }
`

const DataContent = styled.div`
  margin-top: 0.25rem;

  color: ${colors.text.base};
  font-size: 1.5rem;
  font-family: ${p =>
    p.isPassword &&
    "SFMono-Regular, Consolas, 'Roboto Mono', 'Courier New', 'BIZ UDGothic', Meiryo, monospace"};
`
