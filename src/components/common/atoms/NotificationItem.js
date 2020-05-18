import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Measure from 'react-measure'
import { useSpring, animated } from 'react-spring'

import {
  notificationTypes as Types,
  NOTIFICATION_CLOSE_DURATION,
  NOTIFICATION_WIDTH,
  NOTIFICATION_SCREEN_MARGIN,
} from 'consts/notification'
import Notification from 'models/Notification'
import { colors, shadows } from 'consts/theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NotificationItem = ({ notification, position, onRemove, setHeight }) => {
  // falseで画面外、trueで画面内に表示されるようにアニメーションするためのステート
  const [isShown, setIsShown] = useState(false)
  // trueで通知を閉じるアニメーションを実行するステート
  const [isClosing, setIsClosing] = useState(false)
  // 現在登録されている通知要素の高さ
  const crtHeight = useRef()
  // 通知を閉じるアニメーションが完了するのを待つタイムアウトのID
  const closeTimeout = useRef()
  // アニメーションプロパティ
  const style = useSpring({
    transform: `translate(${
      isShown ? 0 : -NOTIFICATION_WIDTH + NOTIFICATION_SCREEN_MARGIN
    }px, -${position + (isClosing ? crtHeight.current * 0.2 : 0)}px) scale(${
      isClosing ? 0.8 : 1
    })`,
    opacity: isClosing ? 0 : 1,
  })

  /**
   * マウント後すぐに左からスライドしてくるようにする
   */
  useEffect(() => {
    setIsShown(true)
  }, [])

  /**
   * 通知インスタンスのisClosingフラグが立ったら、閉じるアニメーションを開始する
   * 直接react-springに入れずにステートを噛ますことで、onRemoveを呼べるようにする
   */
  useEffect(() => {
    if (notification.isClosing && closeTimeout.current == null) {
      setIsClosing(true)

      // アニメーション終了後にonRemoveを呼び、コンポーネントを破棄する
      closeTimeout.current = setTimeout(() => {
        onRemove(notification.id)
      }, NOTIFICATION_CLOSE_DURATION)
    }
  }, [notification.id, notification.isClosing, onRemove])

  /**
   * 高さが取得できたときに実行されるコールバック
   * 親コンポーネントに高さを伝える
   */
  const onResize = useCallback(
    rect => {
      // onResizeの呼び出しが無限ループした場合でもここで食い止めるようにする
      if (crtHeight.current === rect.client.height) {
        return
      }

      crtHeight.current = rect.client.height
      setHeight(notification.id, rect.client.height)
    },
    [notification.id, setHeight]
  )

  return (
    <Measure onResize={onResize} client>
      {({ measureRef }) => (
        <Container style={style} ref={measureRef}>
          <TitleWrapper>
            <StyledFontAwesomeIcon
              icon={[
                'far',
                notification.type === Types.INFO
                  ? 'info-circle'
                  : notification.type === Types.ERROR
                  ? 'times-circle'
                  : 'question-square',
              ]}
              type={notification.type}
            />
            <Title>{notification.title}</Title>
          </TitleWrapper>

          <Description>{notification.description}</Description>
        </Container>
      )}
    </Measure>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.instanceOf(Notification).isRequired,
  position: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
}

export default NotificationItem

const Container = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;

  width: ${NOTIFICATION_WIDTH}px;
  padding: 1rem;

  border: 1px solid ${colors.gray[100]};
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: ${shadows.lg};
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  display: block;

  color: ${p =>
    p.type === Types.INFO
      ? colors.blue[500]
      : p.type === Types.ERROR
      ? colors.error[500]
      : colors.gray[600]};
  font-size: 2rem;
`

const Title = styled.h3`
  flex: 1 0 0;

  margin-left: 1rem;

  color: ${colors.text.base};
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`

const Description = styled.p`
  margin: 0.5rem 0 0 3rem;

  color: ${colors.text.light};
  font-size: 0.75rem;
  opacity: 0.8;
`
