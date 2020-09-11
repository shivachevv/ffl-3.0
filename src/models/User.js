export const makeNewUser = (
    uid,
    email,
    userTeam,
    age,
    location,
    ocupation,
    favTeam,
    motto,
    isAdmin = false
) => {
    return {
        email,
        userTeam,
        userLogo: userTeam.toLowerCase().split(' ').join('-'),
        uid,
        age,
        location,
        ocupation,
        favTeam,
        motto,
        isAdmin,
        wildCards: {
            1: false,
            2: false
        },
        superCpt: {
            1: false,
            2: false
        }
    }
}

export const addUserRound = (team, transfersAvail) => {
    return {
        superCpt: false,
        wildCard: false,
        cpt: '',
        viceCpt: "",
        team,
        transfersAvail,
        transfersMade: 0
    }
}