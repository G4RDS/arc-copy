import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Client from 'models/Client'
import { editClient } from 'utils/api'
import { colors } from 'consts/theme'
import { isNotEmpty, isLengthLowerThan, matchRegexp } from 'consts/rules'

import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const TEXT_RULES = [isNotEmpty()]
const TEL_RULES = [matchRegexp(/^[\d-]+$/), isLengthLowerThan(14)]

const EditClientModal = ({ client, onEdit, onClose }) => {
  const [inputs, setInputs] = useState({
    name: client.name,
    shortName: client.shortName,
    address: client.address,
    tel: client.tel,
    fax: client.fax,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (!isValid) return

    try {
      setIsLoading(true)
      await editClient(
        client.id,
        new Client({
          name: inputs.name,
          shortName: inputs.shortName,
          address: inputs.address,
          tel: inputs.tel,
          fax: inputs.fax,
        })
      )
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `保存中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
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
      <Title>取引先企業を編集</Title>

      <Section>
        <TextField
          label="企業名"
          name="name"
          rules={TEXT_RULES}
          value={inputs.name}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="略称"
          name="shortName"
          rules={TEXT_RULES}
          value={inputs.shortName}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="住所"
          name="address"
          rules={TEXT_RULES}
          value={inputs.address}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="電話番号"
          name="tel"
          rules={TEL_RULES}
          value={inputs.tel}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="FAX"
          name="fax"
          rules={TEL_RULES}
          value={inputs.fax}
          onChange={onChange}
          lazyVaridate
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

EditClientModal.propTypes = {
  client: PropTypes.instanceOf(Client).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditClientModal

const Form = styled(ValidatableForm)`
  min-width: 30rem;
`

const Title = styled.h1`
  color: ${colors.text.dark};
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: bold;
`

const Section = styled.div`
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
