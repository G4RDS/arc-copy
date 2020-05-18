import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useValidation from '../../../hooks/useValidation'
import { colors } from '../../../consts/theme'

const TextArea = props => {
  const { value, rules } = props

  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const inputRef = useRef(null)
  const validator = useValidation(rules, value)

  // オートフォーカス
  useEffect(() => {
    if (props.autoFocus) inputRef.current.focus()
  }, [props.autoFocus])

  // props.errorが変更されたら、エラーメッセージをそれに応じて変更する
  useEffect(() => {
    setErrorMessage(props.error)
  }, [props.error])

  const validate = useCallback(() => {
    setErrorMessage(validator(rules, value))
  }, [rules, value, validator])

  // valueが変更されるたびにバリデーターを呼び、結果をエラーメッセージに格納
  // Valid -> false, Invalid -> エラーメッセージ
  const firstUpdate = useRef(true)
  useEffect(() => {
    // lazyVaridateがtrueなら、初回レンダー時にはバリデーションを行わない
    if (firstUpdate.current && props.lazyVaridate) {
      firstUpdate.current = false
      return
    }

    validate()
  }, [value, props.lazyVaridate, validate])

  return (
    <Container fullWidth={props.fullWidth}>
      <Notch
        background={props.background}
        raise={isFocused || value.length > 0}
      >
        <Label
          raise={isFocused || value.length > 0}
          isFocused={isFocused}
          hasError={!!errorMessage}
        >
          {props.label}
        </Label>
      </Notch>
      <StyledTextArea
        value={value}
        onChange={props.onChange}
        rows={props.rows}
        name={props.name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          validate()
        }}
        ref={inputRef}
        hasError={!!errorMessage}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.func),
  rows: PropTypes.number,
  lazyVaridate: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
  background: PropTypes.string,
}

TextArea.defaultProps = {
  lazyVaridate: true,
}

export default TextArea

const Container = styled.label`
  position: relative;

  display: block;

  width: ${({ fullWidth }) => fullWidth && '100%'};
`

// ラベルの背景の白部分を表示する
// ラベルを囲い、常に縮小することで、縮小時のラベルの横幅を取得する
const Notch = styled.div`
  position: absolute;
  top: 3px;
  left: 18px;
  display: inline-block;
  transform: scale(0.75);
  transform-origin: top left;

  height: 1rem;
  margin: 0 -0.25rem;
  padding: 0 0.25rem;
  background: ${({ background }) => background || '#fff'};

  cursor: text;

  /* ボーダー分とラベルの高さ分上に上がる
  transitionしないため、ラベルのがたつきが発生してしまうので、paddingを入れる */
  transform: ${({ raise }) => raise && 'scale(0.75) translate(0, -11px)'};
  padding-top: ${({ raise }) => raise && '10px'};
`

const Label = styled.span`
  display: inline-block;
  /* ノッチが常に0.75倍なので、1/0.75=1.333倍にしておく
  inputのpadding-top分下に下げる */
  transform: scale(1.333) translate(0, 15px);
  transform-origin: top left;

  height: 1.25rem;

  transition: transform 0.15s ease-in;
  user-select: none;

  color: ${({ isFocused, hasError }) =>
    hasError
      ? colors.error[500]
      : isFocused
      ? colors.primary[500]
      : colors.text.base};
  font-size: 1rem;
  line-height: 1.25em;

  /* 文字を小さくしたいため、scaleを1に戻す
  inputのpadding-top分 + ボーダー分 + ラベルのがたつき防止用のpadding分、上にあげる */
  transform: ${({ raise }) => raise && 'translate(0, -13px)'};
`

const StyledTextArea = styled.textarea`
  display: block;

  width: 100%;
  padding: 1rem;

  border: 2px solid ${colors.gray[600]};
  border-color: ${({ hasError }) => hasError && colors.error[500]};
  border-radius: 0.5rem;

  color: ${colors.text.base};
  line-height: 1.25em;

  &:focus {
    border-color: ${({ hasError }) => !hasError && colors.primary[500]};
    outline: none;
  }
`

const ErrorMessage = styled.p`
  width: 100%;
  margin: 0.5rem 0 0 18px;

  overflow: hidden;

  color: ${colors.error[500]};
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1em;
  text-overflow: ellipsis;
`
