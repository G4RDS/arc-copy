import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import Site from 'models/Site'
import { colors } from 'consts/theme'
import { deleteSite } from 'utils/api'

import TextField from 'components/common/atoms/TextField'
import RaisedButton from 'components/common/atoms/RaisedButton'
import FlatButton from 'components/common/atoms/FlatButton'

const DeleteSiteModal = ({ site, onDelete, onClose }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const showNotification = useNotification()

  const onSubmit = async e => {
    e.preventDefault()

    if (isLoading || input !== site.name) return

    setIsLoading(true)

    try {
      await deleteSite(site.id)
    } catch (err) {
      showNotification(
        notificationTypes.ERROR,
        'エラーが発生しました',
        `削除中にエラーが発生しました。時間をおいて、再度お試しください。${err.message}`
      )

      console.error(err)

      return
    } finally {
      setIsLoading(false)
    }

    onDelete()
    onClose()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Title>現場を削除</Title>
      <Description>
        <Bold>{site.name}</Bold> を削除しようとしています。
      </Description>
      <Description>
        工期を終えた現場は残しておくことをおすすめしますが、どうしても削除したい場合は確認のために
        <Bold>{site.name}</Bold> と入力してください。
      </Description>

      <TextFieldWrapper>
        <TextField
          label="現場名の確認"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      </TextFieldWrapper>

      <Trailing>
        <FlatButton onClick={onClose}>キャンセル</FlatButton>
        <RaisedButton
          type="submit"
          color={colors.red[500]}
          disabled={input !== site.name}
          loading={isLoading}
          long
        >
          削除
        </RaisedButton>
      </Trailing>
    </Form>
  )
}

DeleteSiteModal.propTypes = {
  site: PropTypes.instanceOf(Site).isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DeleteSiteModal

const Form = styled.form`
  max-width: 40rem;
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

const Bold = styled.span`
  font-weight: bold;
`

const TextFieldWrapper = styled.div`
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
