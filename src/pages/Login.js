import React, { useState, useEffect, useContext, useCallback } from 'react'
import styled from 'styled-components'

import UserContext from 'contexts/User'
import useRouter from 'hooks/useRouter'
import { colors } from 'consts/theme'
import { isNotEmpty } from 'consts/rules'

import ValidatableForm from 'components/common/atoms/ValidatableForm'
import TextField from 'components/common/atoms/TextField'
import Checkbox from 'components/common/atoms/Checkbox'
import RaisedButton from 'components/common/atoms/RaisedButton'
import { userRoles } from 'consts/user'

const TEXT_RULES = [isNotEmpty()]

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [shouldRemember, setShouldRemember] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const ctx = useContext(UserContext)
  const router = useRouter()

  // ログインしたら、もしくは既にログインしていたら遷移する
  useEffect(() => {
    if (!ctx.user) {
      return
    }

    // 遷移元が指定されている場合はそこへ遷移する
    // それ以外の場合はユーザーのロールのデフォルト遷移先へ遷移する
    if (router.location.state?.from) {
      router.push(router.location.state?.from)
    } else {
      switch (ctx.user.role) {
        case userRoles.ADMIN:
          router.push('/sites')
          break
        case userRoles.SCHEDULER:
          router.push('/schedule')
          break
        case userRoles.ACCOUNTANT:
          router.push('/work')
          break
        default:
          router.push('/members')
      }
    }
  }, [ctx.user, router])

  /**
   * メールアドレス、パスワードの入力処理
   */
  const onInputsChange = useCallback(
    e => {
      if (errorMessage) setErrorMessage(null)
      if (e.target.name === 'email') setEmailError(null)

      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    },
    [errorMessage, inputs]
  )

  /**
   * ログイン状態の保存チェックボックスの入力処理
   */
  const onShouldRememberChange = useCallback(e => {
    setShouldRemember(e.target.checked)
  }, [])

  /**
   * ValidatableFormのバリデーション反映処理
   * @param {bool} isValid
   */
  const onValidated = useCallback(isValid => {
    setIsValid(isValid)
  }, [])

  /**
   * ログイン処理
   * @param {Event} e
   */
  const onSubmit = useCallback(
    async e => {
      e.preventDefault()

      if (!isValid) {
        return
      }

      setIsLoading(true)

      // ログイン処理
      try {
        ctx.login()
      } catch (e) {
        if (e.code === 'auth/invalid-email') {
          setEmailError('無効な形式のメールアドレスです')
        } else if (
          e.code === 'auth/user-not-found' ||
          e.code === 'auth/wrong-password'
        ) {
          setErrorMessage(
            '指定されたメールアドレスとパスワードに一致するユーザーが見つかりませんでした。'
          )
        } else if (e.code === 'auth/user-disabled') {
          setEmailError(
            '指定されたメールアドレスのユーザーは無効化されています。'
          )
        }
      } finally {
        setIsLoading(false)
      }
    },
    [ctx, isValid]
  )

  return (
    <Container>
      <Card>
        <Logo src="/logo.svg" />
        <Title>ログイン</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <StyledValidatableForm onValidated={onValidated} onSubmit={onSubmit}>
          <StyledTextField
            label="メールアドレス"
            name="email"
            rules={TEXT_RULES}
            error={emailError}
            value={inputs.email}
            onChange={onInputsChange}
            lazyVaridate
            fullWidth
            autoFocus
          />
          <StyledTextField
            label="パスワード"
            name="password"
            type="password"
            rules={TEXT_RULES}
            value={inputs.password}
            onChange={onInputsChange}
            lazyVaridate
            fullWidth
          />

          <CheckboxWrapper>
            <Checkbox
              value={shouldRemember}
              onChange={onShouldRememberChange}
            />
            <CheckboxText>ログインを記録する</CheckboxText>
          </CheckboxWrapper>

          <Buttons>
            <ForgotPassword href="#">パスワードを忘れた場合</ForgotPassword>

            <RaisedButton type="submit" loading={isLoading} disabled={!isValid}>
              ログイン
            </RaisedButton>
          </Buttons>
        </StyledValidatableForm>
      </Card>
    </Container>
  )
}

Login.propTypes = {}

export default Login

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 28rem;
  padding: 4rem 2rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 1rem;
`

const Logo = styled.img`
  height: 2.5rem;
`

const Title = styled.h1`
  margin-top: 1rem;

  color: ${colors.text.dark};
  font-size: 1.5rem;
  font-weight: 500;
`

const ErrorMessage = styled.p`
  margin-top: 1rem;
  margin-bottom: -2rem;

  color: ${colors.error[600]};
  font-size: 1rem;
  font-weight: 500;
`

const StyledValidatableForm = styled(ValidatableForm)`
  width: 100%;
  margin-top: 3rem;
`

const StyledTextField = styled(TextField)`
  margin-top: 1.5rem;
`

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;

  margin-top: 1.5rem;

  cursor: pointer;
`

const CheckboxText = styled.span`
  margin-left: 0.75rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1.5rem;
`

const ForgotPassword = styled.a`
  color: ${colors.blue[600]};
  font-size: 1rem;
  text-decoration: none;
`
