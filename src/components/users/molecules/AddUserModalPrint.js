import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactToPrint from 'react-to-print'

import useNotification, { notificationTypes } from 'hooks/useNotification'
import User from 'models/User'
import { colors } from 'consts/theme'

import UserPrintContent, { PrintContentType } from './UserPrintContent'
import RaisedButton from 'components/common/atoms/RaisedButton'

const AddUserModalPrint = ({ onComplete, user, password }) => {
  const [isPrinting, setIsPrinting] = useState(false)
  const printRef = useRef()
  const showNotification = useNotification()

  const onBeforeGetContent = useCallback(() => {
    setIsPrinting(true)
  }, [])

  const onPrintError = useCallback(
    (errLocation, err) => {
      showNotification(
        notificationTypes.ERROR,
        '印刷に失敗しました',
        '何らかの理由で印刷が中断されました。再度お試しください。'
      )

      console.error(err, errLocation)

      setIsPrinting(false)
    },
    [showNotification]
  )

  return (
    <Container>
      <Title>ユーザーを作成</Title>
      <Description>
        ユーザーを作成しました。
        <br />
        生成された認証情報を印刷し、利用者に伝えてください。
      </Description>
      <Description>
        一度印刷画面を開くとパスワードは確認できなくなります。
      </Description>

      <Trailing>
        <ReactToPrint
          trigger={() => (
            <RaisedButton loading={isPrinting} long>
              印刷
            </RaisedButton>
          )}
          content={() => printRef.current}
          onBeforeGetContent={onBeforeGetContent}
          onAfterPrint={onComplete}
          onPrintError={onPrintError}
        />
        <UserPrintContent
          type={PrintContentType.ADD}
          user={user}
          password={password}
          ref={printRef}
        />
      </Trailing>
    </Container>
  )
}

AddUserModalPrint.propTypes = {
  onComplete: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
  password: PropTypes.string,
}

export default AddUserModalPrint

const Container = styled.div`
  min-width: 30rem;
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

const Trailing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 2rem;

  > * {
    margin-left: 1rem;
  }
`
