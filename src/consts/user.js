export const userRoles = {
  ADMIN: 'ADMIN',
  SCHEDULER: 'SCHEDULER',
  ACCOUNTANT: 'ACCOUNTANT',
}

export const userRoleNames = {
  [userRoles.ADMIN]: '管理者',
  [userRoles.SCHEDULER]: '場割担当者',
  [userRoles.ACCOUNTANT]: '経理',
}

export const userRoleValues = [
  userRoles.ADMIN,
  userRoles.SCHEDULER,
  userRoles.ACCOUNTANT,
]

export const userRoleItems = [
  userRoleNames[userRoles.ADMIN],
  userRoleNames[userRoles.SCHEDULER],
  userRoleNames[userRoles.ACCOUNTANT],
]
