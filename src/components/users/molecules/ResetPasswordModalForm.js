import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import User from 'models/User'
import { colors } from 'consts/theme'
import { resetPassword } from 'utils/api'

import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const ResetPasswordModalForm = ({ user, onComplete, onCancel }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (isLoading || input !== user.name) return

    let password
    try {
      setIsLoading(true)
      const res = await resetPassword(user.id)

      password = res.data.password
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `パスワードのリセット中にエラーが発生しました。時間をおいて、再度お試しください。${err.response.data.message}`
      )

      console.error(err)
      return
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)

    onComplete({ user, password })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title>パスワードをリセット</Title>
      <Description>
        <Bold>{user.name}</Bold> のパスワードをリセットしようとしています。
      </Description>
      <Description>
        パスワードをリセットすると、現在設定されているパスワードでログインできなくなります。
        確認のために <Bold>{user.name}</Bold> と入力してください。
      </Description>

      <TextFieldWrapper>
        <TextField
          label="ユーザー名の確認"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      </TextFieldWrapper>

      <Trailing>
        <FlatButton onClick={onCancel}>キャンセル</FlatButton>
        <RaisedButton
          type="submit"
          color={colors.red[500]}
          disabled={input !== user.name}
          loading={isLoading}
          long
        >
          リセット
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

ResetPasswordModalForm.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ResetPasswordModalForm

const Form = styled.form`
  max-width: 40rem;
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

const Bold = styled.span`
  font-weight: bold;
`

const TextFieldWrapper = styled.div`
  margin-top: 2rem;
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
