import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import User from 'models/User'
import { editUser } from 'utils/api'
import { colors } from 'consts/theme'
import { isNotEmpty, isEmail } from 'consts/rules'
import { userRoleValues, userRoleItems } from 'consts/user'

import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'
import Dropdown, { dropdownTypes } from 'components/common/atoms/Dropdown'

const TEXT_RULES = [isNotEmpty()]
const EMAIL_RULES = [isEmail()]

const EditUserModal = ({ user, onEdit, onClose }) => {
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (!isValid) return

    try {
      setIsLoading(true)
      await editUser(
        user.id,
        new User({
          name: inputs.name,
          email: inputs.email,
          role: inputs.role,
        })
      )
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `編集中にエラーが発生しました。時間をおいて、再度お試しください。${err.response.data.message}`
      )

      console.error(err)
      return
    } finally {
      setIsLoading(false)
    }

    onEdit()
    onClose()
  }

  const onChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Form onValidated={e => setIsValid(e)} onSubmit={onSubmit}>
      <Title>ユーザーを編集</Title>
      <Description>
        パスワードの変更はここで行なえません。
        <br />
        「パスワードをリセット」ボタンからパスワードをリセットできます。
      </Description>

      <Section>
        <TextField
          label="ユーザー名"
          name="name"
          rules={TEXT_RULES}
          value={inputs.name}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="メールアドレス"
          name="email"
          rules={EMAIL_RULES}
          value={inputs.email}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <SectionName>役職</SectionName>
        <Dropdown
          selected={inputs.role}
          values={userRoleValues}
          items={userRoleItems}
          type={dropdownTypes.INPUT_LIKE}
          onChange={e => setInputs({ ...inputs, role: e })}
          lazyVaridate
          disabled
        />
      </Section>

      <Trailing>
        <FlatButton onClick={onClose}>キャンセル</FlatButton>
        <RaisedButton
          type="submit"
          color={colors.primary[500]}
          loading={isLoading}
          disabled={!isValid}
          long
        >
          保存
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

EditUserModal.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditUserModal

const Form = styled(ValidatableForm)`
  min-width: 30rem;
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

const Section = styled.div`
  margin-top: 2rem;
`

const SectionName = styled.h2`
  margin-bottom: 0.5rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
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
