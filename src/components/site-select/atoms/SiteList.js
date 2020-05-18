import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SiteItem from 'components/site-select/atoms/SiteItem'

const SiteList = ({ sites, basePath }) => {
  let basePathWithSlash = basePath || ''

  // basePathは現場アイテムの遷移先URLの/までを表す
  // /が最後に入っていない場合、追加する
  if (basePath && basePath[basePath.length - 1] !== '/') {
    basePathWithSlash = basePath + '/'
  }

  return (
    <List>
      {sites?.map(site => (
        <SiteItem
          path={`${basePathWithSlash}${site.id}`}
          {...site}
          key={site.id}
        />
      ))}
    </List>
  )
}

SiteList.propTypes = {
  basePath: PropTypes.string.isRequired,
  sites: PropTypes.array,
}

export default SiteList

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 2rem;

  list-style: none;
`
