import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Notification from 'models/Notification'
import {
  NOTIFICATION_WIDTH,
  NOTIFICATION_MARGIN,
  NOTIFICATION_SCREEN_MARGIN,
} from 'consts/notification'

import NotificationItem from '../atoms/NotificationItem'

const NotificationContainer = ({ notifications, onRemove }) => {
  // 通知の高さを保存するオブジェクト
  const [heights, setHeights] = useState({})

  /**
   * 通知リストが変化したとき、消えた通知をheightsからも消す
   */
  useEffect(() => {
    setHeights(heights => {
      const newHeights = { ...heights }
      const ids = notifications.map(notif => notif.id)
      const deletes = Object.keys(heights).filter(id => !ids.includes(id))

      deletes.forEach(id => {
        newHeights[id] = undefined
      })
      return newHeights
    })

    // 無限ループ防止のためにESLintを除外
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  /**
   * 高さが変化したら呼んで、登録する関数
   * @param {String} id
   * @param {Number} height
   */
  const setHeight = useCallback((id, height) => {
    setHeights(heights => {
      const newHeights = { ...heights }

      newHeights[id] = height

      return newHeights
    })
  }, [])

  /**
   * 各通知のY座標を示す配列
   * それぞれ正の数で入っていて、その分上にずらす
   */
  const positions = useMemo(() => {
    const positions = []
    let crt = 0

    notifications.forEach(notif => {
      positions.push(crt)

      crt += (heights[notif.id] ?? 0) + NOTIFICATION_MARGIN
    })

    return positions
  }, [heights, notifications])

  return (
    <Container>
      {
        notifications
          .map((notif, ind) => (
            <NotificationItem
              notification={notif}
              position={positions[ind] ?? 0}
              onRemove={onRemove}
              setHeight={setHeight}
              key={notif.id}
            />
          ))
          .reverse() // reverseすることで、新しい通知を古い通知よりも上に重ねられる
      }
    </Container>
  )
}

NotificationContainer.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.instanceOf(Notification))
    .isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default NotificationContainer

const Container = styled.div`
  position: fixed;
  bottom: ${NOTIFICATION_SCREEN_MARGIN}px;
  left: ${NOTIFICATION_SCREEN_MARGIN}px;
  z-index: 1000;

  width: ${NOTIFICATION_WIDTH}px;
  height: calc(100vh - ${NOTIFICATION_SCREEN_MARGIN}px);
  padding: 0 0 1rem 1rem;

  pointer-events: none;
`
