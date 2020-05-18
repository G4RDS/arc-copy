import React, { useContext } from 'react'
import styled from 'styled-components'

import UserContext from 'contexts/User'
import { colors } from '../../../consts/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userRoles, userRoleNames } from 'consts/user'

const Avator = () => {
  const ctx = useContext(UserContext)

  const role = ctx.user?.role

  const roleColor =
    role === userRoles.ADMIN
      ? colors.red[500]
      : role === userRoles.SCHEDULER
      ? colors.primary[500]
      : role === userRoles.ACCOUNTANT
      ? colors.blue[500]
      : '#fff'

  const roleBgColor =
    role === userRoles.ADMIN
      ? colors.red[100]
      : role === userRoles.SCHEDULER
      ? colors.primary[100]
      : role === userRoles.ACCOUNTANT
      ? colors.blue[100]
      : '#fff'

  const roleIcon =
    role === userRoles.ADMIN
      ? 'tools'
      : role === userRoles.SCHEDULER
      ? 'calendar-alt'
      : role === userRoles.ACCOUNTANT
      ? 'calculator'
      : '#fff'

  return (
    <Contianer>
      <RoleIcon
        title={userRoleNames[role]}
        color={roleColor}
        bgColor={roleBgColor}
      >
        <FontAwesomeIcon icon={['fad', roleIcon]} />
      </RoleIcon>
      <Username>{ctx.user?.name}</Username>
    </Contianer>
  )
}

export default Avator

const Contianer = styled.div`
  display: flex;
  align-items: center;

  margin-right: -2rem;
`

const RoleIcon = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background: ${p => p.bgColor};

  color: ${p => p.color};
`

const Username = styled.span`
  flex: 1 1 0;

  margin-left: 0.75rem;

  font-size: 1rem;
  font-weight: 500;
`
