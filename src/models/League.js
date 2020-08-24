const makeNewLeague = (
    name,
    logoSmall,
    logoActive,
    logoBig
) => {
    return {
        name,
        logoSmall,
        logoActive,
        logoBig,
        teams:{}
    }
}

export default makeNewLeague