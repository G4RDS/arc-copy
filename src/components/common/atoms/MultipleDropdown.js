import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useDropdown from 'hooks/useDropdown'
import useValidation from 'hooks/useValidation'
import { getButtonStyle } from 'utils/style'
import { colors } from 'consts/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Checkbox from './Checkbox'

export const dropdownTypes = { SLIM: 'SLIM', INPUT_LIKE: 'INPUT_LIKE' }

const MultipleDropdown = ({
  selected,
  values,
  items,
  onChange,
  type = dropdownTypes.SLIM,
  rules,
  error,
  lazyVaridate = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const validator = useValidation(rules, selected)

  // ドロップダウンリスト以外をクリックしたら閉じるようにする
  const buttonRef = useRef()
  const dropdownRef = useRef()
  useDropdown([buttonRef, dropdownRef], () => setIsExpanded(false))

  // errorが変更されたら、エラーメッセージをそれに応じて変更する
  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  const validate = useCallback(() => {
    setErrorMessage(validator(rules, selected))
  }, [rules, selected, validator])

  // valueが変更されるたび、およびドロップダウンが閉じられるたびにバリデーターを呼び、結果をエラーメッセージに格納
  // Valid -> false, Invalid -> エラーメッセージ
  const firstUpdate = useRef(true)
  useEffect(() => {
    // lazyVaridateがtrueなら、初回レンダー時にはバリデーションを行わない
    if (firstUpdate.current && lazyVaridate) {
      firstUpdate.current = false
      return
    }

    // ドロップダウンを開いたときにはバリデーションを行わない
    if (isExpanded) {
      return
    }

    validate()
  }, [selected, lazyVaridate, validate, isExpanded])

  // ドロップダウンのbox-shadowに利用
  const style = getButtonStyle(colors.gray[600])

  // トグルボタンのイベントハンドラ
  const onButtonClicked = e => {
    setIsExpanded(!isExpanded)
  }

  // ドロップダウン項目のイベントハンドラ
  const onItemClicked = value => {
    const newSelected = [...selected]

    if (selected.includes(value)) {
      const index = selected.findIndex(v => v === value)

      newSelected.splice(index, 1)
    } else {
      newSelected.push(value)
    }

    onChange(newSelected)
  }

  // 現在選択されている項目の名前を全て取得し、カンマ区切りで表示
  const selectedItems =
    selected
      .map(val => {
        return items[values.findIndex(v => v === val)]
      })
      .join(', ') || '選択されていません'

  return (
    <Container className={className}>
      <Button
        type="button"
        styleType={type}
        hasError={!!errorMessage}
        onClick={onButtonClicked}
        ref={buttonRef}
      >
        <span>{selectedItems}</span>
        <StyledFontAwesomeIcon
          icon={['far', 'angle-down']}
          transform={{ rotate: isExpanded ? 180 : 0 }}
        />
      </Button>
      <ItemsWrapper isShown={isExpanded} ref={dropdownRef} {...style}>
        {values.map((value, ind) => (
          <li key={value}>
            <Item
              isActive={value === selected}
              onClick={() => onItemClicked(value)}
            >
              {/* CheckboxのonChangeは使わずに、ItemのonClickを使います */}
              <StyledCheckbox
                value={selected.includes(value)}
                onChange={() => {}}
              />
              {items[ind]}
            </Item>
          </li>
        ))}
      </ItemsWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}

const valueType = PropTypes.oneOfType([PropTypes.number, PropTypes.string])
MultipleDropdown.propTypes = {
  selected: PropTypes.arrayOf(valueType),
  values: PropTypes.arrayOf(valueType).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(dropdownTypes)),
  closeOnSelect: PropTypes.bool,
  dynamicWidth: PropTypes.bool,
  className: PropTypes.string,
}

export default MultipleDropdown

const Container = styled.div`
  position: relative;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)``

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-width: 0;
  padding: ${p => (p.styleType === dropdownTypes.SLIM ? 0.5 : 0.75)}rem 1rem;

  border-radius: ${p => (p.styleType === dropdownTypes.SLIM ? 0.25 : 0.5)}rem;
  border-width: ${p => (p.styleType === dropdownTypes.SLIM ? 1 : 2)}px;
  border-style: solid;
  border-color: ${p =>
    p.hasError ? colors.error[500] : p.active ? p.color : colors.gray[600]};
  background: ${p => p.active && p.color};

  overflow: hidden;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;

  > span {
    text-overflow: ellipsis;
    white-space: pre;
  }

  ${StyledFontAwesomeIcon} {
    color: ${p => (p.hasError ? colors.error[500] : colors.text.base)};
  }
`

const ItemsWrapper = styled.ul`
  position: absolute;
  z-index: 10;
  display: ${p => (p.isShown ? 'block' : 'none')};

  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0;

  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 1px 3px 0 ${p => p.shadow1}, 0 1px 2px 0 ${p => p.shadow2};

  list-style: none;
`

const Item = styled.a`
  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;

  cursor: pointer;

  color: ${p => (p.isActive ? colors.primary[600] : colors.text.base)};
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    background: ${colors.gray[200]};
  }
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: 0.75rem;
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
