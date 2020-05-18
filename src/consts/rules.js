/**
 * 文字列が空かどうかを判断します
 * エラーメッセージ:「入力してください」
 */
export function isNotEmpty() {
  return value => {
    if (value.length > 0) {
      return true
    }
    return '入力してください'
  }
}

/**
 * 文字列の文字数が与えられた値より小さいかどうかを判断します
 * エラーメッセージ例:「10文字未満である必要があります」
 */
export function isLengthLowerThan(max) {
  return value => {
    if (value.length < max) {
      return true
    }
    return `${max}文字以下である必要があります`
  }
}

/**
 * 文字列の文字数が与えられた値より大きいかどうかを判断します
 * エラーメッセージ例:「10文字以上である必要があります」
 */
export function isLengthGreaterThanOrEqual(min) {
  return value => {
    if (value.length >= min) {
      return true
    }
    return `${min}文字以上である必要があります`
  }
}

/**
 * 文字列が数字のみで構成されているかどうかを判断します
 * エラーメッセージ:「数字で入力してください」
 */
export function isNumeric() {
  return value => {
    if (/^\d*$/.test(value)) {
      return true
    }
    return '数字で入力してください'
  }
}

/**
 * 文字列がメールアドレスの形式であるかどうかを判定します
 * エラーメッセージ:「有効なメールアドレスを入力してください」
 */
export function isEmail() {
  return value => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      return true
    }
    return '有効なメールアドレスを入力してください'
  }
}

/**
 * 正規表現にマッチするかどうかを判断します
 * エラーメッセージ:「形式が正しくありません」
 * @param {RegExp} reg テストする正規表現
 */
export function matchRegexp(reg) {
  return value => {
    if (reg.test(value)) {
      return true
    }
    return '形式が正しくありません'
  }
}

/**
 * 整数かどうかを判断します
 * エラーメッセージ:「整数で入力してください」
 */
export function isInteger() {
  return value => {
    if (Number.isInteger(value)) {
      return true
    }
    return '整数で入力してください'
  }
}

/**
 * ０を含む正の数どうかを判断します
 * エラーメッセージ:「0以上の数で入力してください」
 */
export function isNotNegative() {
  return value => {
    if (value >= 0) {
      return true
    }
    return '0以上の数で入力してください'
  }
}

/**
 * ０を含む負の数どうかを判断します
 * エラーメッセージ:「0以下の数で入力してください」
 */
export function isNotPositive() {
  return value => {
    if (value <= 0) {
      return true
    }
    return '0以下の数で入力してください'
  }
}

/**
 * 0以外の数かどうかを判断します
 * エラーメッセージ:「0以外の数で入力してください」
 */
export function isNotZero() {
  return value => {
    if (value !== 0) {
      return true
    }
    return '0以外の数で入力してください'
  }
}

/**
 * 範囲内の数かどうかを判断します
 * エラーメッセージ例:「0から10までの数で入力してください」
 * @param {Number} from
 * @param {Number} to
 */
export function isInRange(from, to) {
  return value => {
    if (value >= from && value <= to) {
      return true
    }
    return `${from}から${to}までの数で入力してください`
  }
}
