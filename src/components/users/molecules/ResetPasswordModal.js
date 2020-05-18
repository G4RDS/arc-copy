import React, { useState } from 'react'
import PropTypes from 'prop-types'

import User from 'models/User'

import ResetPasswordModalForm from './ResetPasswordModalForm'
import ResetPasswordModalPrint from './ResetPasswordModalPrint'

const sections = {
  FORM: 'FORM',
  PRINT: 'PRINT',
}

const ResetPasswordModal = ({ user, onClose }) => {
  const [crtSection, setCrtSection] = useState(sections.FORM)
  const [result, setResult] = useState({})

  const onFormCompleted = result => {
    setResult(result)
    setCrtSection(sections.PRINT)
  }

  const onPrintCompleted = () => {
    onClose()
  }

  return crtSection === sections.FORM ? (
    <ResetPasswordModalForm
      user={user}
      onCancel={onClose}
      onComplete={onFormCompleted}
    />
  ) : (
    <ResetPasswordModalPrint
      user={result.user}
      password={result.password}
      onComplete={onPrintCompleted}
    />
  )
}

ResetPasswordModal.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResetPasswordModal
