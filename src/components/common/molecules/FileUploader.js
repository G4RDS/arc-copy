import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { colors } from 'consts/theme'
import moment from 'moment'

import { storage, TaskEvent } from 'plugins/firebase'
import StorageFile from 'models/StorageFile'

import FileUploaderItem from '../atoms/FileUploaderItem'

const FileUploader = ({ paths, basePath, onChange, accept, rename, limit }) => {
  const [files, setFiles] = useState([])

  /**
   * ファイル情報を取得
   */
  useEffect(() => {
    // 未登録状態の場合はnullが入っているため、ここで弾く
    const filteredPaths = paths.filter(path => !!path)

    // とりあえず読込中であることを表示
    const loadingFiles = filteredPaths.map(path => {
      const fileName = path.split('/').pop()

      return new StorageFile({
        name: fileName,
        fullPath: path,
        isLoading: true,
      })
    })
    setFiles(loadingFiles)

    // 指定されたパスの情報をStorageから取得する
    const promises = filteredPaths.map(async path => {
      const ref = storage.ref(path)

      try {
        const url = await ref.getDownloadURL()
        const meta = await ref.getMetadata()

        return new StorageFile({
          url,
          name: meta.name,
          fullPath: meta.fullPath,
          updatedAt: moment(meta.updated),
          size: meta.size,
          isUploading: false,
        })
      } catch (err) {
        return new StorageFile({
          name: '読み込みに失敗しました',
          fullPath: path,
          isError: true,
        })
      }
    })

    Promise.all(promises).then(files => {
      setFiles(files)
    })
  }, [paths])

  /**
   * ファイルが選択されたときに実行されるコールバック
   */
  const onDrop = useCallback(
    async selectedFiles => {
      const file = selectedFiles[0]
      const ref = storage.ref(basePath)
      const ind = selectedFiles.length
      let fileName = file.name

      // リネーム先が決まっている場合はそれに変更、そうでない場合はかぶっていないか確認
      if (rename) {
        fileName = `${rename}.${file.name.split('.').pop()}`
      } else {
        // 従業員ディレクトリ配下の全てのファイルを取得し、同名のファイルがないか確認する
        // listメソッドは最大1000件まで取得可能。1000以上必要な場合はlistAllに切り替える
        const exists = (await ref.list()).items.some(
          ref => ref.name === fileName
        )

        if (exists) {
          console.warn('同名ファイルのエラー処理が未実装')
          return
        }
      }

      // ファイルをアップロード
      const task = ref.child(fileName).put(file)

      console.warn('アップロード失敗時のエラー処理が未実装')

      // イベントハンドラーを登録
      task.on(
        TaskEvent.STATE_CHANGED,
        snap => {
          // アップロードが進行中

          const percent = snap.bytesTransferred / snap.totalBytes

          // 進捗を更新
          const ref = snap.ref
          const newFiles = [...files]
          newFiles.splice(
            ind,
            1,
            new StorageFile({
              name: ref.name,
              size: snap.totalBytes,
              fullPath: ref.fullPath,
              isUploading: true,
              uploadProgress: percent,
            })
          )
          setFiles(newFiles)
        },
        error => {
          // アップロード中にエラー
          throw error
        }
      )

      // アップロード完了
      task.then(snap => {
        const meta = snap.metadata
        console.log(meta)
        const newFiles = [...files]
        newFiles.splice(
          ind,
          1,
          new StorageFile({
            name: meta.name,
            fullPath: meta.fullPath,
            size: meta.size,
            updatedAt: moment(meta.updated),
          })
        )
        setFiles(newFiles)

        onChange(newFiles.map(file => file.fullPath))
      })
    },
    [basePath, files, onChange, rename]
  )

  /**
   * ファイルをダウンロードする
   * @param {StorageFile} file
   */
  const onDownload = async file => {
    const ref = storage.ref(file.fullPath)

    console.warn('FileUploader -> onDownload: エラー処理が未実装')
    try {
      const url = await ref.getDownloadURL()
      const a = document.createElement('a')

      a.href = url
      a.download = file.name
      a.target = '_blank'
      a.click()
    } catch (e) {
      throw e
    }
  }

  /**
   * ファイルを削除する
   * @param {StorageFile} file
   */
  const onDelete = file => {
    const ref = storage.ref(file.fullPath)
    const ind = files.findIndex(f => f.fullPath === file.fullPath)

    console.warn('エラー処理が未実装')

    ref
      .delete()
      .then(() => {
        const newFiles = [...files]
        newFiles.splice(ind, 1)
        setFiles(newFiles)

        onChange(newFiles.map(file => file.fullPath))
      })
      .catch(err => {})
  }

  const disabled = paths.length >= limit
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled,
  })

  return (
    <Container>
      <Dropzone
        isDragActive={isDragActive}
        isDisabled={disabled}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <DropzoneText isDisabled={disabled}>
          {disabled
            ? `${limit}件のファイルまでアップロードできます`
            : 'ファイルをドロップまたはクリックして選択'}
        </DropzoneText>
      </Dropzone>
      <UploadedFiles>
        {files.map(file => (
          <FileUploaderItem
            file={file}
            onDownload={onDownload}
            onDelete={onDelete}
            key={file.fullPath}
          />
        ))}
      </UploadedFiles>
    </Container>
  )
}

FileUploader.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
  basePath: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  rename: PropTypes.string,
  limit: PropTypes.number,
}

export default FileUploader

const Container = styled.div``

const Dropzone = styled.div`
  padding: 0.75rem 1rem;
  border: 2px dashed transparent;
  border-color: ${p => p.isDragActive && colors.primary[500]};
  border-radius: 0.5rem;
  background: ${p => (p.isDisabled ? colors.gray[100] : colors.gray[200])};

  cursor: ${p => !p.isDisabled && 'pointer'};
`

const DropzoneText = styled.p`
  color: ${p => (p.isDisabled ? colors.text.light : colors.text.base)};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`

const UploadedFiles = styled.ul`
  list-style: none;
`
