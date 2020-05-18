import { immerable } from 'immer'
import moment from 'moment'

export default class Member {
  constructor({
    id,
    faceImg,
    name,
    ruby,
    company,
    role,
    employmentDate,
    experience,
    birth,
    age,
    contact,
    familyContact,
    medical,
    bloodType,
    specialMedical,
    insurance,
    skills,
    entryDate,
    educateDate,
    residenceImg,
    licenseImg,
  }) {
    this.id = id
    this.faceImg = faceImg
    this.name = name
    this.ruby = ruby
    this.company = company
    this.role = role
    this.employmentDate = employmentDate
    this.experience = experience
    this.birth = birth
    this.age = age
    this.contact = contact
    this.familyContact = familyContact
    this.medical = medical
    this.bloodType = bloodType
    this.specialMedical = specialMedical
    this.insurance = insurance
    this.skills = skills
    this.entryDate = entryDate
    this.educateDate = educateDate
    this.residenceImg = residenceImg
    this.licenseImg = licenseImg

    this[immerable] = true
  }

  /**
   * オブジェクトから変換
   * @param {String} id ID
   * @param {Map} obj membersオブジェクト
   */
  static fromJSON(id, obj) {
    return new Member({
      id,
      faceImg: obj.faceImg,
      name: obj.name,
      ruby: obj.ruby,
      company: obj.company,
      role: {
        name: obj.role.name,
        type: obj.role.type,
      },
      employmentDate: obj.employmentDate ? moment(obj.employmentDate) : null,
      experience: obj.experience,
      birth: obj.birth ? moment(obj.birth) : null,
      age: obj.age,
      contact: {
        address: obj.contact.address,
        tel: obj.contact.tel,
      },
      familyContact: {
        address: obj.familyContact.address,
        tel: obj.familyContact.tel,
      },
      medical: {
        date: obj.medical.date ? moment(obj.medical.date) : null,
        pressure: {
          low: obj.medical.pressure.low,
          high: obj.medical.pressure.high,
        },
      },
      bloodType: obj.bloodType,
      specialMedical: {
        date: obj.specialMedical.date ? moment(obj.specialMedical.date) : null,
        type: obj.specialMedical.type,
      },
      insurance: {
        health: {
          type: obj.insurance.health.type,
          number: obj.insurance.health.number,
        },
        annuity: {
          type: obj.insurance.annuity.type,
          number: obj.insurance.annuity.number,
        },
        employment: {
          type: obj.insurance.employment.type,
          number: obj.insurance.employment.number,
        },
      },
      skills: {
        leader: obj.skills.leader,
        technic: obj.skills.technic,
        license: obj.skills.license,
      },
      entryDate: obj.entryDate ? moment(obj.entryDate) : null,
      educateDate: obj.educateDate ? moment(obj.educateDate) : null,
      residenceImg: obj.residenceImg,
      licenseImg: obj.licenseImg,
    })
  }
}
