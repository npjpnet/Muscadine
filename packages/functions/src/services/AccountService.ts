import FirebaseAdmin from '../libs/FirebaseAdmin'

const changeUserRolesAsync = async (userId: string, claims: any): Promise<void> => {
  const adminApp = FirebaseAdmin.getFirebaseAdmin()
  const adminAuth = adminApp.auth()

  await adminAuth.setCustomUserClaims(userId, {
    accessLevel: claims.accessLevel
  })
}

export default {
  changeUserRolesAsync
}
