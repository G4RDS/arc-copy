import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'consts/theme'

import StorageFile from 'models/StorageFile'

import IconButton from 'components/common/atoms/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function convertSizeToString(size) {
  if (size > 1000000000) {
    return `${Math.floor(size / 1000000000)}GB`
  } else if (size > 1000000) {
    return `${Math.floor(size / 1000000)}MB`
  } else if (size > 1000) {
    return `${Math.floor(size / 1000)}MB`
  } else {
    return `${Math.floor(size / 1000)}B`
  }
}

const FileUploaderItem = ({ file, onDownload, onDelete }) => {
  const onDownloadClicked = useCallback(() => {
    onDownload(file)
  }, [file, onDownload])

  const onDeleteClicked = useCallback(() => {
    onDelete(file)
  }, [file, onDelete])

  return (
    <Container>
      {file.url ? <Thumbnail src={file.url} /> : <LoadingThumbnail />}
      <DetailWrapper>
        <FileName>{file.name}</FileName>
        <Detail>
          {file.isUploading ? (
            `アップロード中（${Math.floor(file.uploadProgress * 100)}%）`
          ) : file.isLoading ? (
            '読込中'
          ) : file.isError ? (
            ''
          ) : (
            <>
              {file.updatedAt.format('YYYY-MM-DD')} &middot;{' '}
              {convertSizeToString(file.size)}
            </>
          )}
        </Detail>
      </DetailWrapper>
      <Actions>
        {!file.isUploading && (
          <>
            <IconButton title="ダウンロードする" onClick={onDownloadClicked}>
              <FontAwesomeIcon icon={['far', 'cloud-download']} />
            </IconButton>
            <IconButton title="削除する" onClick={onDeleteClicked}>
              <FontAwesomeIcon icon={['far', 'trash']} />
            </IconButton>
          </>
        )}
      </Actions>
    </Container>
  )
}

FileUploaderItem.propTypes = {
  file: PropTypes.instanceOf(StorageFile).isRequired,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default FileUploaderItem

const Container = styled.li`
  display: flex;
  align-items: center;

  margin-top: 1rem;
`

const Thumbnail = styled.img`
  flex: 0 0 auto;
  display: block;

  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
`

const LoadingThumbnail = styled.div`
  flex: 0 0 auto;
  display: block;

  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: ${colors.gray[200]};
`

const DetailWrapper = styled.div`
  flex: 1 1 0;

  min-width: 0;
  margin-left: 0.75rem;
`

const FileName = styled.div`
  color: ${colors.text.base};
  font-size: 1rem;
  font-weight: 500;
`

const Detail = styled.div`
  color: ${colors.text.light};
  font-size: 0.75rem;
`

const Actions = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  margin-left: 1rem;
`
