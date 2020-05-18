import { getCurrentUser } from 'utils/api'

export default class User {
  constructor({ id, name, email, role }) {
    this.id = id
    this.name = name
    this.email = email
    this.role = role
  }

  /**
   * 現在ログインしているユーザーの情報を取得
   */
  static async getCurrentUser() {
    return getCurrentUser()
  }

  static fromJSON(obj) {
    return new User({
      id: obj.id,
      name: obj.name,
      email: obj.email,
      role: obj.role,
    })
  }
}
