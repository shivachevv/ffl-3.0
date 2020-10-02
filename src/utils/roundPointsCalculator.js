const roundPointsCalculator = (round, rndNum, players, isCup = false) => {
    const { cpt, viceCpt, superCpt } = round
    const roundIDs = round.team
    let total = 0
    // let hasCptPlayed
    // if (cpt) {
    //     hasCptPlayed = !!players[cpt].points[`r${rndNum}`].roundStats.starter || !!players[cpt].points[`r${rndNum}`].roundStats.sub
    // } else {
    //     hasCptPlayed = false
    // }
    
    
    const hasCptPlayed = cpt ?
        !!players[cpt].points[`r${rndNum}`].roundStats.starter || !!players[cpt].points[`r${rndNum}`].roundStats.sub
        :
        false
    // const cptMultiplier = superCpt ? 3 : 2

    const cptMultiplier = isCup ? 1 : superCpt ? 3 : 2

    Object.keys(roundIDs).forEach(pos => {
        const id = roundIDs[pos]
        if (id === cpt && hasCptPlayed) {
            total += players[id].points[`r${rndNum}`].roundPts * cptMultiplier
        } else if (id === viceCpt && !hasCptPlayed) {
            total += players[id].points[`r${rndNum}`].roundPts * cptMultiplier
        } else {
            total += players[id].points[`r${rndNum}`].roundPts
        }
    })

    return total
}

export default roundPointsCalculator