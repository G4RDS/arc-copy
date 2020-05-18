import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import ValidateContext from 'contexts/Validate'

/**
 * バリデーション機能を持つフォームを提供するコンポーネント
 * このフォームの子孫要素にあるインプットコンポーネントのバリデーションを自動で行い、結果をonValidatedプロパティに渡す
 */
const ValidatableForm = props => {
  // 登録済みのインプットのバリデーション結果を格納する
  const inputs = useRef({})

  // バリデーション結果が変更されたら、全てのインプットがValidかどうか確認する
  const notify = () => {
    props.onValidated(!Object.values(inputs.current).includes(false))
  }

  // インプットを登録する
  const register = (uid, isValid) => {
    inputs.current = {
      ...inputs.current,
      [uid]: isValid,
    }
    notify()
  }

  // 登録済みのインプットを取り除く
  const unregister = uid => {
    const obj = { ...inputs.current }
    delete obj[uid]
    inputs.current = obj
    notify()
  }

  // 登録済みのインプットのバリデーション結果を更新する
  const update = (uid, isValid) => {
    // 指定されたuidのインプットが登録されていなかったらエラーをスロー
    if (!(uid in inputs.current)) {
      throw new Error(
        `An input that its uid is requested uid (${uid}) is not registered.`
      )
    }

    inputs.current = {
      ...inputs.current,
      [uid]: isValid,
    }
    notify()
  }

  const [ctx] = useState({ inputs, register, unregister, update })

  return (
    <form
      className={props.className}
      onSubmit={props.onSubmit}
      autoComplete={props.autoComplete === false ? 'off' : 'on'}
    >
      <ValidateContext.Provider value={ctx}>
        {props.children}
      </ValidateContext.Provider>
    </form>
  )
}

ValidatableForm.propTypes = {
  onValidated: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default ValidatableForm
