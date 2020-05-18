import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import UserContext from 'contexts/User'
import { userRoleValues } from 'consts/user'

const ProtectedRoute = ({ children, roles, ...rest }) => {
  const userCtx = useContext(UserContext)

  let isAuthed = !!userCtx.user

  // rolesに一つ以上の役職が入っていて、それらにログインユーザーの役職が一致しない場合、不認可
  if (roles && roles.length > 0 && !roles.includes(userCtx.user?.role)) {
    isAuthed = false
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          children
        ) : userCtx.user ? (
          <Redirect
            to={{ pathname: '/not-authorized', state: { from: location } }}
          />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.oneOf(userRoleValues)),
}

export default ProtectedRoute
