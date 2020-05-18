import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Member from 'models/Member'
import { colors } from 'consts/theme'
import { deleteMember } from 'utils/api'

import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const DeleteMemberModal = ({ member, onDelete, onClose }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (isLoading || input !== member.name) return

    setIsLoading(true)

    try {
      await deleteMember(member.id)
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `削除中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
      )

      console.error(err)

      return
    } finally {
      setIsLoading(false)
    }

    onDelete()
    onClose()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title>従業員を削除</Title>
      <Description>
        <Bold>{member.name}</Bold> を削除しようとしています。
      </Description>
      <Description>
        確認のために <Bold>{member.name}</Bold> と入力してください。
      </Description>

      <TextFieldWrapper>
        <TextField
          label="従業員名の確認"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      </TextFieldWrapper>

      <Trailing>
        <FlatButton onClick={onClose}>キャンセル</FlatButton>
        <RaisedButton
          type="submit"
          color={colors.red[500]}
          disabled={input !== member.name}
          loading={isLoading}
          long
        >
          削除
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

DeleteMemberModal.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DeleteMemberModal

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
