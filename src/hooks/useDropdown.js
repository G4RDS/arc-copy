import { useEffect } from 'react'

/**
 * refsに渡したノード以外の場所がクリックされたらハンドラを実行するフック
 * @param {Array.<Ref> || Ref} refs
 * @param {Function} handler
 */
export default function useDropdown(refs, handler) {
  useEffect(() => {
    const listener = event => {
      if (Array.isArray(refs)) {
        if (refs.some(ref => ref.current?.contains(event.target))) {
          return
        }
      } else if (refs.current?.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
