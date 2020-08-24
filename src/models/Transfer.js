const makeNewTransfer = (
    round,
    team,
    position,
    transferOut,
    transferIn
) => {
    return {
        round,
        team,
        position,
        transferOut,
        transferIn
    }
}

export default makeNewTransfer