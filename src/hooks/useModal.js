import React, { useRef, useContext, useCallback } from 'react'

import ModalContext from 'contexts/Modal'
import Modal from 'components/common/organisms/Modal'

/**
 * モーダルを表示する時に使うフック
 * 引数は何も受け取らずに、モーダルを表示する関数と閉じる関数を配列で返す
 * 表示関数には表示するモーダルの中身を渡す
 *
 * @returns {Array} [openModal, closeModal]
 */
export default function useModal() {
  const modalCtx = useContext(ModalContext)
  const id = useRef(null)

  /**
   * モーダルを閉じる
   */
  const closeModal = useCallback(() => {
    modalCtx.closeModal(id.current)
  }, [modalCtx])

  /**
   * モーダルを開く
   * @params {ModalComponent} children 表示するモーダル
   * @params {Object} options オプション
   */
  const openModal = useCallback(
    (children, options) => {
      const { persistent = false } = options ?? {}

      id.current = modalCtx.openModal(
        <Modal onClose={closeModal} persistent={persistent}>
          {children}
        </Modal>
      )
    },
    [closeModal, modalCtx]
  )

  return [openModal, closeModal]
}
