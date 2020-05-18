import { useContext, useCallback } from 'react'

import NotificationContext from 'contexts/Notification'
import Notification from 'models/Notification'

/**
 * 通知を表示する時に使うフック
 * 引数は何も受け取らずに、通知を表示する関数を返す
 * 表示関数には表示する通知のインスタンスを渡す
 *
 * @returns {Function} showNotification
 */
export default function useNotification() {
  const notificationCtx = useContext(NotificationContext)

  /**
   * モーダルを開く
   * @params {String} type 表示する通知のタイプ
   * @params {String} title 表示する通知のタイトル
   * @params {String} description 表示する通知の説明
   * @params {Object} options オプション
   */
  const showNotification = useCallback(
    (type, title, description, options) => {
      const { duration = 7000 } = options ?? {}

      notificationCtx.showNotification(
        new Notification({ type, title, description }),
        duration
      )
    },
    [notificationCtx]
  )

  return showNotification
}

export { notificationTypes } from 'consts/notification'
