import roundPointsCalculator from './roundPointsCalculator'

const standingsHelper = (oldStandings, leagues, players, users, currentRound) => {

    let result = {}

    const isFirstRnd = Number(currentRound) === 1

    Object.keys(leagues).forEach(leagueId => {
        const teams = leagues[leagueId].teams
        teams.forEach(userId => {
            const rounds = users[userId].rounds


            const total = Object.keys(rounds).reduce((acc, roundId) => {
                const round = rounds[roundId]
                const roundNum = Number(roundId.substring(1))
                const roundTotal = roundPointsCalculator(round, roundNum, players, false)

                if (roundNum <= currentRound) {
                    return roundTotal + acc
                } else {
                    return acc
                }
            }, 0)

            const lastRndTotal = isFirstRnd ?
                0
                :
                roundPointsCalculator(rounds[`r${currentRound - 1}`], currentRound - 1, players, false)

            if (result[leagueId]) {
                result[leagueId][userId] = {
                    total,
                    lastRndTotal,
                }
            } else {
                result[leagueId] = {}
                result[leagueId][userId] = {
                    total,
                    lastRndTotal,
                }
            }

        })
    })
    // SORTING TO GET CURRENT PLACES AND ADD THEM AS PROPS. 
    // MOVEMENT IS CALCILATED BASED ON THESE PLACES MINUS THE OLD ROUND'S PLACES
    Object.entries(result).forEach(league => {
        const leagueId = league[0]
        const leagueArr = Object.entries(league[1])
        leagueArr.sort((a, b) => {
            return b[1].total - a[1].total
        })
            .forEach((x, i) => {
                console.log(x);
                console.log(1);
                result[leagueId][x[0]].place = i + 1
                if (oldStandings && !isFirstRnd) {
                    const previousRound = oldStandings[`r${currentRound - 1}`]
                    console.log(2);

                    result[leagueId][x[0]].movement = previousRound[leagueId][x[0]].place - result[leagueId][x[0]].place
                    console.log(3);

                } else {
                    result[leagueId][x[0]].movement = 0
                }
            })
    })



    // console.log('sorted', sorted);
    // console.log('old', oldStandings, 'new', result);

    // let a = {
    //     'teamID': {
    //         total: 55,
    //         lastRnd: 44,
    //         place:4,
    //         movement: -1
    //     }
    // }
    // NON-REDUCE METHOD
    // let userTotalPoints = 0
    // Object.keys(rounds).forEach(roundId => {
    //     const round = rounds[roundId]
    //     const roundNum = roundId.substring(1)
    //     const roundTotal = roundPointsCalculator(round, roundNum, players, false)
    //     userTotalPoints += roundTotal
    //     // round, rndNum, players, isCup = false
    // })
    // console.log(userTotalPoints)


    return result
}

export default standingsHelper
// export default function (data) {
//     let lgMap = {
//         "pele": [1, 10],
//         "maradona": [13, 22]
//     }

//     let l1 = data.filter((x, i) => {
//         if (i >= lgMap["pele"][0] && i <= lgMap["pele"][1]) {
//             return x
//         }
//     }).map(x => {
//         return {
//             name: x[1],
//             user: x[2],
//             total: x[3],
//             roundPts: x[4],
//             move: x[5],
//             transfers: x[7]
//         }
//     })

//     let l2 = data.filter((x, i) => {
//         if (i >= lgMap["maradona"][0] && i <= lgMap["maradona"][1]) {
//             return x
//         }
//     }).map(x => {
//         return {
//             name: x[1],
//             user: x[2],
//             total: x[3],
//             roundPts: x[4],
//             move: x[5],
//             transfers: x[7]
//         }
//     })
//     return {
//         "pele": l1,
//         "maradona": l2
//     };
// }