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
        transferIn,
        transferOut,
        status: 'pending',
        timeMade: new Date(new Date().getTime())
    }
}

export default makeNewTransfer