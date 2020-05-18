import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Company from 'models/Company'
import { colors } from 'consts/theme'
import { isNotEmpty, isNumeric, matchRegexp, isNotNegative } from 'consts/rules'
import {
  roleTypeValues,
  roleTypeItems,
  healthInsuranceTypeValues,
  healthInsuranceTypeItems,
  annuityInsuranceTypeValues,
  annuityInsuranceTypeItems,
} from 'consts/member'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'
import Dropdown, { dropdownTypes } from 'components/common/atoms/Dropdown'
import MultipleDropdown from 'components/common/atoms/MultipleDropdown'
import NumberInput from 'components/common/atoms/NumberInput'
import AccordionPanel from 'components/common/molecules/AccordionPanel'
import FileUploader from 'components/common/molecules/FileUploader'

const TEXT_RULES = [isNotEmpty()]
const OPTIONAL_DATE_RULES = [matchRegexp(/^(\d{4}-\d{2}-\d{2})?$/)]
const COMPANY_RULES = [
  v => {
    if (v !== '') {
      return true
    }
    return '選択してください'
  },
]

const inputTypes = {
  string: 'STRING',
  date: 'DATE',
  number: 'NUMBER',
  selection: 'SELECTION',
  multiple: 'MULTIPLE',
}

// 必須項目には所属から選択しなければならない項目があるため、コンポーネント内で宣言

const generalInputs = [
  {
    label: '雇入年月日',
    prop: 'employmentDate',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
  {
    label: '経験年数',
    prop: 'experience',
    type: inputTypes.number,
    rules: [isNotNegative()],
  },
  {
    label: '生年月日',
    prop: 'birth',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
  {
    label: '住所',
    prop: 'contactAddress',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '電話番号',
    prop: 'contactTel',
    type: inputTypes.string,
    rules: [isNumeric()],
  },
  {
    label: '家族住所',
    prop: 'familyContactAddress',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '家族電話番号',
    prop: 'familyContactTel',
    type: inputTypes.string,
    rules: [isNumeric()],
  },
  {
    label: '血液型',
    prop: 'bloodType',
    type: inputTypes.selection,
    selectValues: ['A', 'B', 'O', 'AB'],
    selectItems: ['A', 'B', 'O', 'AB'],
  },
]

const medicalInputs = [
  {
    label: '日付',
    prop: 'medicalDate',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
  {
    label: '血圧 上',
    prop: 'medicalPressureHigh',
    type: inputTypes.number,
    rules: [isNotNegative()],
  },
  {
    label: '血圧 下',
    prop: 'medicalPressureLow',
    type: inputTypes.number,
    rules: [isNotNegative()],
  },
]

const specialMedicalInputs = [
  {
    label: '日付',
    prop: 'specialMedicalDate',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
  {
    label: '種類',
    prop: 'specialMedicalType',
    type: inputTypes.string,
    rules: [],
  },
]

const insuranceInputs = [
  {
    label: '健康保険 種別',
    prop: 'insuranceHealthType',
    type: inputTypes.selection,
    selectValues: healthInsuranceTypeValues,
    selectItems: healthInsuranceTypeItems,
  },
  {
    label: '健康保険 保険番号',
    prop: 'insuranceHealthNumber',
    type: inputTypes.string,
    rules: [isNumeric()],
  },
  {
    label: '年金保険 種別',
    prop: 'insuranceAnnuityType',
    type: inputTypes.selection,
    selectValues: annuityInsuranceTypeValues,
    selectItems: annuityInsuranceTypeItems,
  },
  {
    label: '年金保険 保険番号',
    prop: 'insuranceAnnuityNumber',
    type: inputTypes.string,
    rules: [isNumeric()],
  },
  {
    label: '雇用保険 種別',
    prop: 'insuranceEmploymentType',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '雇用保険 保険番号',
    prop: 'insuranceEmploymentNumber',
    type: inputTypes.string,
    rules: [isNumeric()],
  },
]

const skillInputs = [
  {
    label: '雇入・職長 特別教育',
    prop: 'skillsLeader',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '技能講習',
    prop: 'skillsTechnic',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '免許',
    prop: 'skillsLicense',
    type: inputTypes.string,
    rules: [],
  },
  {
    label: '入場年月日',
    prop: 'entryDate',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
  {
    label: '受入教育実施年月日',
    prop: 'educateDate',
    type: inputTypes.date,
    rules: OPTIONAL_DATE_RULES,
  },
]

const ModalForm = ({
  title,
  submitLabel,
  companies,
  memberId,
  inputs,
  isSending,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const [isValid, setIsValid] = useState(true)

  const requiredInputs = useMemo(() => {
    const companyValues = ['']
    const companyItems = ['選択してください']

    Object.entries(companies ?? {}).forEach(([id, company]) => {
      companyValues.push(id)
      companyItems.push(company.name)
    })

    return [
      {
        label: '名前',
        prop: 'name',
        type: inputTypes.string,
        rules: TEXT_RULES,
      },
      {
        label: 'ふりがな',
        prop: 'ruby',
        type: inputTypes.string,
        rules: TEXT_RULES,
      },
      {
        label: '所属',
        prop: 'company',
        type: inputTypes.selection,
        rules: COMPANY_RULES,
        selectValues: companyValues,
        selectItems: companyItems,
      },
      {
        label: '職種',
        prop: 'roleName',
        type: inputTypes.string,
        rules: TEXT_RULES,
      },
      {
        label: '職種カテゴリ',
        prop: 'roleType',
        type: inputTypes.multiple,
        selectValues: roleTypeValues,
        selectItems: roleTypeItems,
      },
      {
        label: '年齢',
        prop: 'age',
        type: inputTypes.number,
        rules: [isNotNegative()],
      },
    ]
  }, [companies])

  const handleChange = useCallback(
    e => {
      if (e.target.type === 'number') {
        onChange(e.target.name, Number(e.target.value))
        return
      }

      onChange(e.target.name, e.target.value)
    },
    [onChange]
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      if (!isValid) return

      onSubmit()
    },
    [isValid, onSubmit]
  )

  /* フォームを生成 */
  const inputToEl = input => {
    switch (input.type) {
      case inputTypes.string: {
        return (
          <Section key={input.prop}>
            <TextField
              label={input.label}
              name={input.prop}
              rules={input.rules}
              value={inputs[input.prop]}
              onChange={handleChange}
              lazyVaridate
            />
          </Section>
        )
      }
      case inputTypes.date: {
        return (
          <Section key={input.prop}>
            <TextField
              label={input.label}
              name={input.prop}
              rules={input.rules}
              value={inputs[input.prop]}
              onChange={handleChange}
              lazyVaridate
            />
          </Section>
        )
      }
      case inputTypes.number: {
        return (
          <Section key={input.prop}>
            <NumberInput
              label={input.label}
              name={input.prop}
              rules={input.rules}
              value={inputs[input.prop]}
              onChange={handleChange}
              lazyVaridate
            />
          </Section>
        )
      }
      case inputTypes.selection: {
        return (
          <Section key={input.prop}>
            <SectionName>{input.label}</SectionName>
            <Dropdown
              selected={inputs[input.prop]}
              values={input.selectValues}
              items={input.selectItems}
              type={dropdownTypes.INPUT_LIKE}
              rules={input.rules}
              onChange={e => onChange(input.prop, e)}
              lazyVaridate
            />
          </Section>
        )
      }
      case inputTypes.multiple: {
        return (
          <Section key={input.prop}>
            <SectionName>{input.label}</SectionName>
            <MultipleDropdown
              selected={inputs[input.prop]}
              values={input.selectValues}
              items={input.selectItems}
              type={dropdownTypes.INPUT_LIKE}
              rules={input.rules}
              onChange={e => onChange(input.prop, e)}
              lazyVaridate
            />
          </Section>
        )
      }
      default: {
        return <></>
      }
    }
  }

  const requiredEls = requiredInputs.map(inputToEl)
  const generalEls = generalInputs.map(inputToEl)
  const medicalEls = medicalInputs.map(inputToEl)
  const specialMedicalEls = specialMedicalInputs.map(inputToEl)
  const insuranceEls = insuranceInputs.map(inputToEl)
  const skillEls = skillInputs.map(inputToEl)

  return (
    <Form onValidated={e => setIsValid(e)} onSubmit={handleSubmit}>
      <Title>{title}</Title>

      {requiredEls}

      <StyledAccordionPanel
        title="一般"
        icon={<FontAwesomeIcon icon={['far', 'user']} />}
      >
        {generalEls}

        <Section>
          <SectionName>顔写真</SectionName>
          {memberId ? (
            <FileUploader
              paths={inputs.faceImg ? [inputs.faceImg] : []}
              basePath={`member-images/${memberId}`}
              accept="image/jpeg, image/png"
              rename="face-img"
              limit={1}
              onChange={value =>
                onChange('faceImg', value.length ? value[0] : null)
              }
            />
          ) : (
            <UnavailableDescription>
              追加時には設定できません。追加後に編集画面から設定してください。
            </UnavailableDescription>
          )}
        </Section>
      </StyledAccordionPanel>

      <StyledAccordionPanel
        title="最近の健康診断"
        icon={<FontAwesomeIcon icon={['far', 'stethoscope']} />}
      >
        {medicalEls}
      </StyledAccordionPanel>

      <StyledAccordionPanel
        title="特殊健康診断"
        icon={<FontAwesomeIcon icon={['far', 'hospital-alt']} />}
      >
        {specialMedicalEls}
      </StyledAccordionPanel>

      <StyledAccordionPanel
        title="保険"
        icon={<FontAwesomeIcon icon={['far', 'shield-alt']} />}
      >
        {insuranceEls}
      </StyledAccordionPanel>

      <StyledAccordionPanel
        title="教育・資格・免許等"
        icon={<FontAwesomeIcon icon={['far', 'graduation-cap']} />}
      >
        {skillEls}

        <Section>
          <SectionName>入管証明書（在留カード）</SectionName>
          {memberId ? (
            <FileUploader
              paths={inputs.residenceImg ? [inputs.residenceImg] : []}
              basePath={`member-images/${memberId}`}
              accept="image/jpeg, image/png"
              rename="residence-img"
              limit={1}
              onChange={value =>
                onChange('residenceImg', value.length ? value[0] : null)
              }
            />
          ) : (
            <UnavailableDescription>
              追加時には設定できません。追加後に編集画面から設定してください。
            </UnavailableDescription>
          )}
        </Section>

        <Section>
          <SectionName>各種免許証写しなど</SectionName>
          {memberId ? (
            <FileUploader
              paths={inputs.licenseImg}
              basePath={`member_images/${memberId}`}
              accept="image/jpeg, image/png"
              onChange={value => onChange('licenseImg', value)}
            />
          ) : (
            <UnavailableDescription>
              追加時には設定できません。追加後に編集画面から設定してください。
            </UnavailableDescription>
          )}
        </Section>
      </StyledAccordionPanel>

      <Trailing>
        <FlatButton onClick={onCancel}>キャンセル</FlatButton>
        <RaisedButton
          type="submit"
          color={colors.primary[500]}
          loading={isSending}
          disabled={!isValid}
          long
        >
          {submitLabel}
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  companies: PropTypes.objectOf(PropTypes.instanceOf(Company)).isRequired,
  memberId: PropTypes.string,
  inputs: PropTypes.object.isRequired,
  isSending: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ModalForm

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

const UnavailableDescription = styled.p`
  color: ${colors.text.light};
  font-size: 0.875rem;
  font-weight: 500;
`

const StyledAccordionPanel = styled(AccordionPanel)`
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
