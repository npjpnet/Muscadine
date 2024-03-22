const constants: {
  mainTeam: Record<string, string>
  subTeam: Record<string, string>
} = {
  mainTeam: {
    hqTm: '総務部',
    plTm: '企画構成チーム',
    pbTm: '音響配信チーム',
    d2Tm: 'D2(開発デザイン)チーム',
    dpTm: 'Dep.チーム',
    lgTm: 'ロジスティクスチーム',
    pdhq: '制作本部',
    mghq: '管理本部'
  },
  subTeam: {
    pbTmVpaSc: '音響セクション',
    pbTmBrdSc: '配信セクション',
    pbTmStgSc: 'ステージセクション',
    d2TmSysSc: 'システムセクション',
    d2TmDesSc: 'デザインセクション',
    d2TmNetSc: 'ネットワークセクション',
    pdhqU: '制作部',
    pdhqP: 'プロデュース室',
    pdhqD: 'デザイン室',
    mghqU: '管理部'
  }
} as const

export default constants
