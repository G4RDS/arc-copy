import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Site from 'models/Site'
import Client from 'models/Client'
import { editSite } from 'utils/api'
import { colors } from 'consts/theme'
import { isNotEmpty, matchRegexp } from 'consts/rules'

import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'
import Dropdown, { dropdownTypes } from 'components/common/atoms/Dropdown'
import Checkbox from 'components/common/atoms/Checkbox'

const TEXT_RULES = [isNotEmpty()]
const DATE_RULES = [isNotEmpty(), matchRegexp(/^\d{4}-\d{2}-\d{2}$/)]

const mealValues = ['支給あり', '実費負担', '支給なし']

const clientRules = [
  v => {
    if (v !== '') {
      return true
    }
    return '選択してください'
  },
]

const EditSiteModal = ({ site, clients, onEdit, onClose }) => {
  const [inputs, setInputs] = useState({
    name: site.name,
    shortName: site.shortName,
    clientId: site.clientId,
    address: site.address,
    periodFrom: site.workPeriod.from.format('YYYY-MM-DD'),
    periodTo: site.workPeriod.to.format('YYYY-MM-DD'),
    meal: site.meal,
    canFareCharge: site.canFareCharge,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const showNotification = useNotification()

  const [clientValues, clientItems] = useMemo(() => {
    const values = ['']
    const items = ['選択してください']

    Object.entries(clients ?? {}).forEach(([id, client]) => {
      values.push(id)
      items.push(client.name)
    })

    return [values, items]
  }, [clients])

  const onSubmit = async e => {
    e.preventDefault()

    if (!isValid) return

    try {
      setIsLoading(true)
      await editSite(
        site.id,
        new Site({
          name: inputs.name,
          shortName: inputs.shortName,
          clientId: inputs.clientId,
          address: inputs.address,
          workPeriod: {
            from: moment(inputs.periodFrom),
            to: moment(inputs.periodTo),
          },
          meal: inputs.meal,
          canFareCharge: inputs.canFareCharge,
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
      <Title>現場を編集</Title>

      <Section>
        <TextField
          label="現場名"
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
        <SectionName>クライアント企業</SectionName>
        <Dropdown
          selected={inputs.clientId}
          values={clientValues}
          items={clientItems}
          type={dropdownTypes.INPUT_LIKE}
          rules={clientRules}
          onChange={e => setInputs({ ...inputs, clientId: e })}
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
          label="開始日（YYYY-MM-DD）"
          name="periodFrom"
          rules={DATE_RULES}
          value={inputs.periodFrom}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <TextField
          label="終了日（YYYY-MM-DD）"
          name="periodTo"
          rules={DATE_RULES}
          value={inputs.periodTo}
          onChange={onChange}
          lazyVaridate
        />
      </Section>

      <Section>
        <SectionName>弁当</SectionName>
        <Dropdown
          selected={inputs.meal}
          values={mealValues}
          items={mealValues}
          type={dropdownTypes.INPUT_LIKE}
          onChange={e => setInputs({ ...inputs, meal: e })}
        />
      </Section>

      <Section>
        <CheckboxWrapper>
          <Checkbox
            value={inputs.canFareCharge}
            onChange={e =>
              setInputs({ ...inputs, canFareCharge: e.target.checked })
            }
          />
          <CheckboxLabel>交通費を請求する</CheckboxLabel>
        </CheckboxWrapper>
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

EditSiteModal.propTypes = {
  site: PropTypes.instanceOf(Site).isRequired,
  clients: PropTypes.objectOf(PropTypes.instanceOf(Client)).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditSiteModal

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

const SectionName = styled.h2`
  margin-bottom: 0.5rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
`

const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;

  cursor: pointer;
`

const CheckboxLabel = styled.span`
  margin-left: 0.75rem;

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
