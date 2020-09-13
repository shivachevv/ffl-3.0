import { getAllPlayersDataNormal } from './getAllPlayersData'

const roundPointsCalculator = async (round, rndNum) => {
    console.log(round, rndNum);
    const players = await getAllPlayersDataNormal()
    const { cpt, viceCpt, superCpt } = round
    const roundIDs = round.team
    let total = 0
    let hasCptPlayed = players[cpt].points[`r${rndNum}`].roundStats.starter && players[cpt].points[`r${rndNum}`].roundStats.sub
    const cptMultiplier = superCpt ? 3 : 2
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