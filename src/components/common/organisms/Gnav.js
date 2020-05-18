import React, { useContext } from 'react'
import styled from 'styled-components'

import useRouter from 'hooks/useRouter'
import UserContext from 'contexts/User'
import { userRoles } from 'consts/user'

import Avator from '../atoms/Avator'
import GnavItem from '../atoms/GnavItem'

// 場割用アカウントのナビ
const schedulerNavs = [
  {
    title: '場割',
    icon: ['fad', 'hard-hat'],
    path: '/schedule',
  },
]
// 経理用アカウントのナビ
const accountantNavs = [
  {
    title: '日報',
    icon: ['fad', 'clipboard'],
    path: '/work',
  },
  {
    title: '出面表',
    icon: ['fad', 'list-alt'],
    path: '/attendant',
  },
]
// 管理用アカウントのナビ
const adminNavs = [
  {
    title: '現場',
    icon: ['fad', 'traffic-cone'],
    path: '/sites',
  },
  {
    title: '従業員',
    icon: ['fad', 'users'],
    path: '/members',
  },
  {
    title: '取引先企業',
    icon: ['fad', 'building'],
    path: '/clients',
  },
  {
    title: 'グループ企業',
    icon: ['fad', 'briefcase'],
    path: '/companies',
  },
  {
    title: 'ユーザー管理',
    icon: ['fad', 'user-tie'],
    path: '/users',
  },
  {
    title: '操作ログ',
    icon: ['fad', 'shoe-prints'],
    path: '/logs',
  },
]

const Gnav = () => {
  const userCtx = useContext(UserContext)
  // 現在のページのパス。一致したアイテムをアクティブにする。
  const { pathname: crtPath } = useRouter()

  // 表示するナビゲーション
  let navItems = []

  // ユーザータイプによってナビゲーションを切り替え
  switch (userCtx.user?.role) {
    case userRoles.SCHEDULER:
      navItems = schedulerNavs
      break
    case userRoles.ACCOUNTANT:
      navItems = accountantNavs
      break
    case userRoles.ADMIN:
      navItems = adminNavs
      break
    default:
      navItems = []
  }

  return (
    <Container id="gnav">
      <LogoImg src="/logo.svg" />

      <AvatorWrapper>
        <Avator />
      </AvatorWrapper>

      <MainItems>
        {navItems.map(({ title, icon, path }) => (
          <GnavItem
            title={title}
            icon={icon}
            path={path}
            isActive={crtPath.startsWith(path)}
            key={title}
          />
        ))}
      </MainItems>

      <FooterItems>
        <GnavItem
          title="ログアウト"
          icon={['fad', 'sign-out']}
          path={'/logout'}
          isActive={false}
        />
        <GnavItem
          title="設定"
          icon={['fad', 'cog']}
          path={'/settings'}
          isActive={false}
        />
      </FooterItems>
    </Container>
  )
}

export default Gnav

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 15rem;
  height: 100vh;
  padding: 2rem 2rem 1rem 2rem;
`

const LogoImg = styled.img`
  height: 2rem;
`

const AvatorWrapper = styled.div`
  margin-top: 2rem;
`

const MainItems = styled.div`
  flex: 1 0 0;

  width: calc(100% + 2rem);
  margin: 2.5rem -1rem 0 -1rem;
  overflow: auto;

  > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`

const FooterItems = styled.div`
  width: calc(100% + 2rem);
  margin: 1rem -1rem 0 -1rem;
  overflow: auto;

  > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`
