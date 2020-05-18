export default class ScheduleMemberInfo {
  constructor({ id, name, faceImg, role, companyShort }) {
    this.id = id
    this.name = name
    this.faceImg = faceImg
    this.role = role
    this.companyShort = companyShort
  }

  /**
   * Memberインスタンスから変換する
   * @param {Member} member 変換するMemberインスタンス
   * @param {Object.<Company>} companies 全てのグループ企業のオブジェクト
   */
  static async fromMember(member, companies) {
    // 企業名を取得
    const companyShort = companies[member.company].shortName

    // 顔写真を取得
    let faceImg = null
    if (member.faceImg) {
    }

    return new ScheduleMemberInfo({
      id: member.id,
      name: member.name,
      role: member.role.name,
      companyShort,
      faceImg,
    })
  }
}
