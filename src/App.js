import React, { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider as ReduxProvider } from 'react-redux'
import reducer from 'redux/reducers/reducer'
import { uid } from 'react-uid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

import User from 'models/User'
import UserContext from 'contexts/User'
import ModalContext from 'contexts/Modal'
import NotificationContext from 'contexts/Notification'

import Router from './Router'
import NotificationContainer from 'components/common/molecules/NotificationContainer'

// 全てのFontAwesomeアイコンをライブラリに追加
library.add(fas, far, fal, fad)

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

const App = () => {
  const [userContextValue, setUserContextValue] = useState({
    user: null,
    /**
     * 現在ログインしているユーザーの情報を取得し、コンテキストに保存する
     */
    async login() {
      const user = await User.getCurrentUser()
      setUserContextValue({ ...userContextValue, user })
    },
    /**
     * コンテキストからユーザー情報を削除
     */
    logout() {
      setUserContextValue({ ...userContextValue, user: null })
    },
  })

  /**
   * モーダル関連
   */
  const [modals, setModals] = useState([])
  const [modalContextValue] = useState({
    /**
     * モーダルコンポーネントを開く
     * @param {ModalComponent} modal 表示するモーダルコンポーネント
     * @returns {Number} 表示したコンポーネントのID（これをcloseModalに渡すことで、モーダルを消すことができる）
     */
    openModal(modal) {
      let newModals = []

      setModals(modals => {
        newModals = [...modals]

        // キーを付与したFragmentで囲んでモーダルを追加
        newModals.push(
          <React.Fragment key={newModals.length}>{modal}</React.Fragment>
        )

        return newModals
      })

      return newModals.length - 1
    },
    /**
     * モーダルコンポーネントを閉じる
     * @param {Number} id 閉じるコンポーネントのID
     */
    closeModal(id) {
      setModals(modals => {
        const newModals = [...modals]

        // 指定されたIDのインデックスのモーダルを削除
        newModals.splice(id, 1)

        return newModals
      })
    },
  })

  /**
   * 通知関連
   */
  const [notifications, setNotifications] = useState([])

  /**
   * 通知を消去する
   * @param {String} id
   */
  const removeNotification = useCallback(id => {
    setNotifications(notifications => {
      const newNotifs = [...notifications]
      const targetInd = newNotifs.findIndex(notif => notif.id === id)

      newNotifs.splice(targetInd, 1)

      return newNotifs
    })
  }, [])

  /**
   * 通知を閉じるアニメーションを開始する
   * @param {String} id
   */
  const hideNotification = useCallback(id => {
    // useStateに関数をわたすことで、現在の値を取得できる
    setNotifications(notifications => {
      const newNotifs = [...notifications]
      const targetInd = newNotifs.findIndex(notif => notif.id === id)

      if (targetInd === -1) {
        throw new Error(
          '指定されたIDの通知が見つからなかったため、閉じることができませんでした'
        )
      }

      newNotifs[targetInd].close()

      return newNotifs
    })
  }, [])

  const [notificationContextValue] = useState({
    /**
     * 通知を開く
     * @param {Notification} notification 表示する通知インスタンス
     * @param {Number} duration 表示する時間
     * @returns {Number} 表示した通知のID（これをhideNotificationに渡すことで、通知を消すことができる）
     */
    showNotification(notif, duration) {
      setNotifications(notifications => {
        const newNotifs = [...notifications]
        const id = uid(notif)

        // 通知を追加
        notif.setId(id)
        newNotifs.unshift(notif)

        setTimeout(() => {
          // 通知を消す
          hideNotification(id)
        }, duration)

        return setNotifications(newNotifs)
      })
    },
  })

  return (
    <ReduxProvider store={store}>
      <UserContext.Provider value={userContextValue}>
        <ModalContext.Provider value={modalContextValue}>
          <NotificationContext.Provider value={notificationContextValue}>
            {modals}
            <NotificationContainer
              notifications={notifications}
              onRemove={removeNotification}
            />
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </NotificationContext.Provider>
        </ModalContext.Provider>
      </UserContext.Provider>
    </ReduxProvider>
  )
}

export default App
