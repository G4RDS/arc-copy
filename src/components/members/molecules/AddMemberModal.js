import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Member from 'models/Member'
import Company from 'models/Company'
import { addMember } from 'utils/api'
import {
  bloodTypes,
  healthInsuranceTypes,
  annuityInsuranceTypes,
} from 'consts/member'

import ModalForm from './ModalForm'

const AddSiteModal = ({ companies, onAdd, onClose }) => {
  const [inputs, setInputs] = useState({
    faceImg: null,
    name: '',
    ruby: '',
    company: '',
    roleName: '',
    roleType: [],
    employmentDate: '',
    experience: 0,
    birth: '',
    age: 20,
    contactAddress: '',
    contactTel: '',
    familyContactAddress: '',
    familyContactTel: '',
    medicalDate: '',
    medicalPressureLow: 0,
    medicalPressureHigh: 0,
    bloodType: bloodTypes.A,
    specialMedicalDate: '',
    specialMedicalType: '',
    insuranceHealthType: healthInsuranceTypes.none,
    insuranceHealthNumber: '',
    insuranceAnnuityType: annuityInsuranceTypes.none,
    insuranceAnnuityNumber: '',
    insuranceEmploymentType: '',
    insuranceEmploymentNumber: '',
    skillsLeader: '',
    skillsTechnic: '',
    skillsLicense: '',
    entryDate: '',
    educateDate: '',
    residenceImg: null,
    licenseImg: [],
  })
  const [isSending, setIsSending] = useState(false)
  const showNotification = useNotification()

  const onSubmit = async () => {
    try {
      setIsSending(true)
      await addMember(
        new Member({
          faceImg: inputs.faceImg,
          name: inputs.name,
          ruby: inputs.ruby,
          company: inputs.company,
          role: {
            name: inputs.roleName,
            type: inputs.roleType,
          },
          employmentDate: moment(inputs.employmentDate),
          experience: inputs.experience,
          birth: moment(inputs.birth),
          age: inputs.age,
          contact: {
            address: inputs.contactAddress,
            tel: inputs.contactTel,
          },
          familyContact: {
            address: inputs.familyContactAddress,
            tel: inputs.familyContactTel,
          },
          medical: {
            date: moment(inputs.medicalDate),
            pressure: {
              low: inputs.medicalPressureLow,
              high: inputs.medicalPressureHigh,
            },
          },
          bloodType: inputs.bloodType,
          specialMedical: {
            date: moment(inputs.specialMedicalDate),
            type: inputs.specialMedicalType,
          },
          insurance: {
            health: {
              type: inputs.insuranceHealthType,
              number: inputs.insuranceHealthNumber,
            },
            annuity: {
              type: inputs.insuranceAnnuityType,
              number: inputs.insuranceAnnuityNumber,
            },
            employment: {
              type: inputs.insuranceEmploymentType,
              number: inputs.insuranceEmploymentNumber,
            },
          },
          skills: {
            leader: inputs.skillsLeader,
            technic: inputs.skillsTechnic,
            license: inputs.skillsLicense,
          },
          entryDate: moment(inputs.entryDate),
          educateDate: moment(inputs.educateDate),
          residenceImg: inputs.residenceImg,
          licenseImg: inputs.licenseImg,
        })
      )
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `追加中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
      )

      console.error(err)

      return
    } finally {
      setIsSending(false)
    }

    onAdd()
    onClose()
  }

  const onChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  return (
    <ModalForm
      title="従業員を追加"
      submitLabel="追加"
      companies={companies}
      inputs={inputs}
      isSending={isSending}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onClose}
    />
  )
}

AddSiteModal.propTypes = {
  companies: PropTypes.objectOf(PropTypes.instanceOf(Company)).isRequired,
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddSiteModal
