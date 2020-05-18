import moment from 'moment'

export default class StorageFile {
  constructor({
    name,
    updatedAt,
    size,
    fullPath,
    isLoading = false,
    isUploading = false,
    isError = false,
    url = null,
    uploadProgress = 1,
  }) {
    this.name = name
    this.updatedAt = moment(updatedAt)
    this.size = size
    this.fullPath = fullPath
    this.isLoading = isLoading
    this.isUploading = isUploading
    this.isError = isError
    this.url = url
    this.uploadProgress = uploadProgress
  }
}
