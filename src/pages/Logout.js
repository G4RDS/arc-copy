import React, { useEffect, useContext } from 'react'

import UserContext from 'contexts/User'
import useRouter from 'hooks/useRouter'

const Logout = () => {
  const ctx = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    ctx.logout()
    router.replace('/login')
  }, [ctx, router])

  return <div></div>
}

export default Logout
