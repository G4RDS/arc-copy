import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'

import RaisedButton from 'components/common/atoms/RaisedButton'

const RequireReLoginModal = ({ router, onClose }) => {
  const doLogout = () => {
    onClose()
    router.push('/logout')
  }

  return (
    <Container>
      <Title>再ログインが必要です</Title>

      <Description>
        ログイン状態が長いこと続いているため、パスワードを変更するには一度ログアウトする必要があります。
      </Description>

      <Trailing>
        <RaisedButton onClick={doLogout}>ログアウト</RaisedButton>
      </Trailing>
    </Container>
  )
}

RequireReLoginModal.propTypes = {
  router: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RequireReLoginModal

const Container = styled.div`
  width: 30rem;
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
