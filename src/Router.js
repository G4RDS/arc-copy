import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { userRoles } from 'consts/user'

import ProtectedRoute from './ProtectedRoute'

import SchedulePage from 'pages/Schedule'
import LoginPage from 'pages/Login'
import LogoutPage from 'pages/Logout'
import NotAuthorizedPage from 'pages/NotAuthorized'
import NotFoundPage from 'pages/NotFound'

const Router = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />

      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/logout">
        <LogoutPage />
      </Route>
      <Route exact path="/not-authorized">
        <NotAuthorizedPage />
      </Route>

      <ProtectedRoute exact path="/schedule" roles={[userRoles.SCHEDULER]}>
        <SchedulePage />
      </ProtectedRoute>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}

export default Router
