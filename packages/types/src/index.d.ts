export interface MuscadineUser {
  name: string
  nameYomi: string
  nameAlphabet: string
  realName: string
  realNameYomi: string
  personalEmail: string
  telephone: string
  postalCode: string
  address: string
  discordTag: string
  canUseRealNameForDisplay: boolean
}

export interface MuscadineUserMeta {
  uuid: string
  code: string
  team: {
    main: string
    sub: string
    remarks: string
  }
  services: {
    email: string
    giji?: string
    redmine?: string
    knowledge?: string
    memkan?: string
  }
}

export type valueOf<T> = T[keyof T]
