import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Member from 'models/Member'
import Company from 'models/Company'
import { editMember } from 'utils/api'

import ModalForm from './ModalForm'

const EditSiteModal = ({ member, companies, onEdit, onClose }) => {
  const [inputs, setInputs] = useState({
    faceImg: member.faceImg,
    name: member.name,
    ruby: member.ruby,
    company: member.company,
    roleName: member.role.name,
    roleType: member.role.type,
    employmentDate: member.employmentDate?.format('YYYY-MM-DD') ?? '',
    experience: member.experience,
    birth: member.birth?.format('YYYY-MM-DD') ?? '',
    age: member.age,
    contactAddress: member.contact.address,
    contactTel: member.contact.tel,
    familyContactAddress: member.familyContact.address,
    familyContactTel: member.familyContact.tel,
    medicalDate: member.medical.date?.format('YYYY-MM-DD') ?? '',
    medicalPressureLow: member.medical.pressure.low,
    medicalPressureHigh: member.medical.pressure.high,
    bloodType: member.bloodType,
    specialMedicalDate: member.specialMedical.date?.format('YYYY-MM-DD') ?? '',
    specialMedicalType: member.specialMedical.type,
    insuranceHealthType: member.insurance.health.type,
    insuranceHealthNumber: member.insurance.health.number,
    insuranceAnnuityType: member.insurance.annuity.type,
    insuranceAnnuityNumber: member.insurance.annuity.number,
    insuranceEmploymentType: member.insurance.employment.type,
    insuranceEmploymentNumber: member.insurance.employment.number,
    skillsLeader: member.skills.leader,
    skillsTechnic: member.skills.technic,
    skillsLicense: member.skills.license,
    entryDate: member.entryDate?.format('YYYY-MM-DD') ?? '',
    educateDate: member.educateDate?.format('YYYY-MM-DD') ?? '',
    residenceImg: member.residenceImg,
    licenseImg: member.licenseImg,
  })
  const [isSending, setIsSending] = useState(false)
  const showNotification = useNotification()

  const onSubmit = async () => {
    try {
      setIsSending(true)
      await editMember(
        member.id,
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
        `保存中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
      )

      console.error(err)

      return
    } finally {
      setIsSending(false)
    }

    onEdit()
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
      title="従業員を編集"
      submitLabel="保存"
      companies={companies}
      memberId={member.id}
      inputs={inputs}
      isSending={isSending}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onClose}
    />
  )
}

EditSiteModal.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
  companies: PropTypes.objectOf(PropTypes.instanceOf(Company)).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditSiteModal
