import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const Modal = props => {
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutId = useRef(null)

  // タイムアウト中にコンポーネントが破棄されたとき、タイムアウトを解除する
  useEffect(
    () => () => {
      if (timeoutId.current != null) clearTimeout(timeoutId.current)
    },
    []
  )

  const onClose = () => {
    if (props.persistent) {
      // 画面外をクリックされたとき、persistentなモーダルならアニメーションで閉じられないことを知らせる
      setIsAnimating(false)

      setTimeout(() => {
        setIsAnimating(true)

        clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
          setIsAnimating(false)
          timeoutId.current = null
        }, 1000)
      })
    } else {
      props.onClose()
    }
  }

  return (
    <Overlay isAnimating={isAnimating} onClick={onClose}>
      <Container>
        <ModalCard
          // Card内で発生したクリックイベントをここで止めることで、Overlayのクリックイベントが反応しないようにする
          onClick={e => e.stopPropagation()}
        >
          {props.children}
        </ModalCard>
      </Container>
    </Overlay>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  persistent: PropTypes.bool,
  children: PropTypes.node,
}

export default Modal

const persistentAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;

  background: rgba(0, 0, 0, 0.5);

  overflow-y: auto;

  animation: ${p =>
    p.isAnimating &&
    css`
      ${persistentAnimation} 0.15s linear
    `};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  padding: 4rem;
`

const ModalCard = styled.div`
  padding: 2.5rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.12);
`
