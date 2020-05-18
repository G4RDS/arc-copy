import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'consts/theme'
import Types from 'consts/data-table-types'

import DataTableItem from 'components/common/atoms/DataTableItem'
import LoadingIndicator from 'components/common/molecules/LoadingIndicator'

const DataTable = ({
  columns,
  keys,
  data,
  types,
  widths,
  isLoading,
  className,
}) => {
  // 横幅を指定
  let templateColumns = []
  for (let i = 0; i < columns.length; i++) {
    templateColumns.push(widths?.[i] ?? '1fr')
  }
  templateColumns = templateColumns.join(' ')

  return (
    <Container className={className}>
      <HeadingWrapper columns={templateColumns}>
        {columns.map((c, ind) => (
          <HeadingItem type={types?.[ind] ?? Types.TEXT} key={c}>
            {c}
          </HeadingItem>
        ))}
      </HeadingWrapper>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        data?.map((d, ind) => (
          <DataRow columns={templateColumns} key={d.id ?? ind}>
            {keys.map((k, i) => (
              <DataTableItem
                type={types?.[i] ?? Types.TEXT}
                value={d[k]}
                key={k}
              />
            ))}
          </DataRow>
        ))
      )}
    </Container>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  types: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Types))),
  widths: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
}

export default DataTable

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`

const HeadingWrapper = styled.div`
  display: grid;
  grid-template-columns: ${p => p.columns};

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: ${colors.gray[200]};
`

const HeadingItem = styled.div`
  padding: 0 0.5rem;

  color: ${colors.text.light};
  font-size: 0.875rem;
  font-weight: bold;
  text-align: ${p =>
    p.type === Types.TEXT_RIGHT ||
    p.type === Types.NUMBER ||
    p.type === Types.NODE_RIGHT
      ? 'right'
      : 'left'};

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`

const DataRow = styled.div`
  display: grid;
  grid-template-columns: ${p => p.columns};
  align-items: center;

  padding: 1rem;
  border-radius: 0.5rem;

  &:nth-child(2n + 1) {
    background: ${colors.gray[100]};
  }
`
