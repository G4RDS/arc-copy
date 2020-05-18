import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { storage } from 'plugins/firebase'
import { colors } from 'consts/theme'
import Types from 'consts/data-table-types'

const DataTableItem = ({ type, value }) => {
  const [asyncValue, setAsyncValue] = useState(null)
  let isAsync = type === Types.AVATAR

  useEffect(() => {
    if (type === Types.AVATAR) {
      setAsyncValue(<DummyAvatar />)

      if (!value) {
        return
      }

      const ref = storage.ref(value)

      console.warn('DataTableItem.js: エラー処理が未実装')

      ref
        .getDownloadURL()
        .then(url => {
          setAsyncValue(<Avatar src={url} />)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [type, value])

  return <Container type={type}>{isAsync ? asyncValue : value}</Container>
}

DataTableItem.propTypes = {
  type: PropTypes.oneOf(Object.values(Types)).isRequired,
  value: PropTypes.any,
}

export default DataTableItem

const Container = styled.div`
  padding: 0 0.5rem;

  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
  text-align: ${p =>
    p.type === Types.TEXT_RIGHT ||
    p.type === Types.NUMBER ||
    p.type === Types.NODE_RIGHT
      ? 'right'
      : 'left'};

  ${p =>
    p.type === Types.NODE_RIGHT &&
    css`
      display: flex;
      justify-content: flex-end;
    `};

  ${p =>
    (p.type === Types.TEXT || p.type === Types.TEXT_RIGHT) &&
    css`
      overflow: hidden;
      white-space: pre;
      text-overflow: ellipsis;
    `};

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`

const Avatar = styled.img`
  display: block;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`

const DummyAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`
