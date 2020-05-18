import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddUserModalForm from './AddUserModalForm'
import AddUserModalPrint from './AddUserModalPrint'

const sections = {
  FORM: 'FORM',
  PRINT: 'PRINT',
}

const AddUserModal = ({ onAdd, onClose }) => {
  const [crtSection, setCrtSection] = useState(sections.FORM)
  const [result, setResult] = useState({})

  const onFormCompleted = result => {
    setResult(result)
    setCrtSection(sections.PRINT)
  }

  const onPrintCompleted = () => {
    onAdd()
    onClose()
  }

  return crtSection === sections.FORM ? (
    <AddUserModalForm onClose={onClose} onComplete={onFormCompleted} />
  ) : (
    <AddUserModalPrint
      user={result.user}
      password={result.password}
      onComplete={onPrintCompleted}
    />
  )
}

AddUserModal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddUserModal
