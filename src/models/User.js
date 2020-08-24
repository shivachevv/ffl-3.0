const makeNewUser = (
    email,
    userTeam,
    userLogo,
    uid,
    isAdmin = false
) => {
    return {
        email,
        userTeam,
        userLogo,
        uid,
        isAdmin,
    }
}

export default makeNewUser