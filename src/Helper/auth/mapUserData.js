export const mapUserData = (user) => {
  const { uid, xa } = user
  return {
    id: uid??null,
    // email,
    token: xa,
    // displayName: displayName
  }
}