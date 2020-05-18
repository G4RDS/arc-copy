import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Company from 'models/Company'
import { editCompany } from 'utils/api'
import { colors } from 'consts/theme'
import { isNotEmpty } from 'consts/rules'

import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const TEXT_RULES = [isNotEmpty()]

const EditCompanyModal = ({ company, onEdit, onClose }) => {
  const [inputs, setInputs] = useState({
    name: company.name,
    shortName: company.shortName,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (!isValid) return

    try {
      setIsLoading(true)
      await editCompany(
        company.id,
        new Company({
          name: inputs.name,
          shortName: inputs.shortName,
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
      <Title>グループ企業を編集</Title>

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

EditCompanyModal.propTypes = {
  company: PropTypes.instanceOf(Company).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditCompanyModal

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
