import { useEffect, useRef, useContext, useCallback } from 'react'
import genUid from 'lodash/uniqueId'

import ValidateContext from '../contexts/Validate'

const VALID = false

/**
 * ValidatableFormの子孫要素でバリデーションを行うためのフック
 * @param {Array.<Function>} rules 値を入れて正しいかどうかを返すルール関数の配列
 * @param {*} value 値
 */
export default function useValidation(rules, value) {
  const ctx = useContext(ValidateContext)
  const uid = useRef(genUid()).current

  // Valid -> false
  // Invalid -> エラーメッセージ
  const validator = useCallback((rules, value) => {
    // ruleが配列でない場合は定義されていないと判断し、falseを返す
    if (!Array.isArray(rules)) return VALID

    return rules.reduce((crt, rule) => {
      // 既にエラーメッセージが格納されているならそのまま
      if (crt !== VALID) return crt

      const res = rule(value)
      // 結果がtrueならValid、それ以外ならInvalid
      if (res === true) return crt
      else return res
    }, VALID)
  }, [])

  // 一度だけ登録
  useEffect(() => {
    ctx.register(uid, !validator(rules, value))

    return () => ctx.unregister(uid)

    // 初回のみ登録したいため不要なdependencyを削除
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // 値が変わったら呼ぶ関数
  // バリデーションを行い、コンテキストの値を更新する
  // 返り値としてバリデーション結果を返す
  //   Valid -> false
  //   InValid -> エラーメッセージ
  const onValueChange = useCallback(
    (rules, value) => {
      const res = validator(rules, value)
      ctx.update(uid, !res)
      return res
    },
    [ctx, uid, validator]
  )

  return onValueChange
}
