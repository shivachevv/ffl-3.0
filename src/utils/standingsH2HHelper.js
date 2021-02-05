import roundPointsCalculator from '../utils/roundPointsCalculator'

const standingsH2HHelper = (rounds, players, users, currentRound) => {

    const newTeamObj = () => {
        return {
            for: 0,
            against: 0,
            goaldiff: 0,
            games: 0,
            pts: 0,
            form: '',
            wdl: {
                win: 0,
                draw: 0,
                loss: 0
            }
        }
    }
    // let result = {}
    // // const totalRounds = Object.values(rounds).length
    // Object.values(rounds)
    //     .sort((a, b) => {
    //         const roundA = Number(a.name.substring(1, 3))
    //         const roundB = Number(b.name.substring(1, 3))
    //         return roundA - roundB
    //     })
    //     .forEach(round => {
    //         // console.log(i, totalRounds);
    //         // const isInForm = i > totalRounds - 4
    //         const roundHeld = Object.values(round)[2]
    //         const roundObject = Object.values(round)[0]
    //         const roundArray = Object.values(roundObject)
    //         if (roundHeld <= currentRound) {
    //             roundArray.forEach(matches => {
    //                 const user1 = matches.team1
    //                 const user2 = matches.team2
    //                 if (!result[user1]) {
    //                     result[user1] = newTeamObj()
    //                 }
    //                 if (!result[user2]) {
    //                     result[user2] = newTeamObj()
    //                 }

    //                 const userRound1 = users[user1].rounds[`r${roundHeld}`]
    //                 const userRound2 = users[user2].rounds[`r${roundHeld}`]

    //                 const team1Total = roundPointsCalculator(userRound1, roundHeld, players, true)
    //                 const team2Total = roundPointsCalculator(userRound2, roundHeld, players, true)


    //                 // console.log(round, matches, user1, user2, result)
    //                 if (team1Total !== 0 && team2Total !== 0) {
    //                     result[user1].games++
    //                     result[user2].games++

    //                     result[user1].for += team1Total
    //                     result[user1].against += team2Total

    //                     result[user2].for += team2Total
    //                     result[user2].against += team1Total

    //                     result[user1].goaldiff += team1Total - team2Total
    //                     result[user2].goaldiff += team2Total - team1Total

    //                     if (team1Total > team2Total) {
    //                         result[user1].pts += 3
    //                         result[user1].wdl.win++

    //                         result[user2].wdl.loss++
    //                         result[user1].form = result[user1].form + "W"
    //                         result[user2].form = result[user2].form + "L"

    //                     } else if (team2Total > team1Total) {
    //                         result[user2].pts += 3
    //                         result[user2].wdl.win++

    //                         result[user1].wdl.loss++
    //                         result[user2].form = result[user2].form + "W"
    //                         result[user1].form = result[user1].form + "L"

    //                     } else {
    //                         result[user1].pts++
    //                         result[user2].pts++

    //                         result[user2].wdl.draw++
    //                         result[user1].wdl.draw++

    //                         result[user1].form = result[user1].form + "D"
    //                         result[user2].form = result[user2].form + "D"
    //                     }
    //                 }

    //                 result[user1].form = result[user1].form.substring(result[user1].form.length - 5)
    //                 result[user2].form = result[user2].form.substring(result[user2].form.length - 5)

    //             })
    //         }

    //     })
    const previous = calcStandings(rounds, players, users, currentRound - 1, newTeamObj, calcPlace)
    const current = calcStandings(rounds, players, users, currentRound, newTeamObj, calcPlace)

    const ready = calcMovement(previous, current)

    return ready
}

export default standingsH2HHelper

function calcStandings(rounds, players, users, roundToCompare, newTeamObj, calcPlace) {
    const resultWithoutPlace = Object.values(rounds)
        .sort((a, b) => {
            const roundA = Number(a.name.substring(1, 3))
            const roundB = Number(b.name.substring(1, 3))
            return roundA - roundB
        })
        .reduce((acc, round) => {
            const roundHeld = Object.values(round)[2]
            const roundObject = Object.values(round)[0]
            const roundArray = Object.values(roundObject)

            if (roundHeld <= roundToCompare) {
                roundArray.forEach(matches => {
                    const user1 = matches.team1
                    const user2 = matches.team2
                    if (!acc[user1]) {
                        acc[user1] = newTeamObj()
                    }
                    if (!acc[user2]) {
                        acc[user2] = newTeamObj()
                    }

                    const userRound1 = users[user1].rounds[`r${roundHeld}`]
                    const userRound2 = users[user2].rounds[`r${roundHeld}`]

                    const team1Total = roundPointsCalculator(userRound1, roundHeld, players, true)
                    const team2Total = roundPointsCalculator(userRound2, roundHeld, players, true)


                    if (team1Total !== 0 && team2Total !== 0) {
                        acc[user1].games++
                        acc[user2].games++

                        acc[user1].for += team1Total
                        acc[user1].against += team2Total

                        acc[user2].for += team2Total
                        acc[user2].against += team1Total

                        acc[user1].goaldiff += team1Total - team2Total
                        acc[user2].goaldiff += team2Total - team1Total

                        if (team1Total > team2Total) {
                            acc[user1].pts += 3
                            acc[user1].wdl.win++

                            acc[user2].wdl.loss++
                            acc[user1].form = acc[user1].form + "W"
                            acc[user2].form = acc[user2].form + "L"

                        } else if (team2Total > team1Total) {
                            acc[user2].pts += 3
                            acc[user2].wdl.win++

                            acc[user1].wdl.loss++
                            acc[user2].form = acc[user2].form + "W"
                            acc[user1].form = acc[user1].form + "L"

                        } else {
                            acc[user1].pts++
                            acc[user2].pts++

                            acc[user2].wdl.draw++
                            acc[user1].wdl.draw++

                            acc[user1].form = acc[user1].form + "D"
                            acc[user2].form = acc[user2].form + "D"
                        }
                    }

                    acc[user1].form = acc[user1].form.substring(acc[user1].form.length - 5)
                    acc[user2].form = acc[user2].form.substring(acc[user2].form.length - 5)

                })
            }

            return acc
        }, {})

    const result = calcPlace(resultWithoutPlace)

    return result
}

function calcPlace(obj) {
    return Object.entries(obj)
        .sort((a, b) => {
            return b[1].goaldiff - a[1].goaldiff;
        })
        .sort((a, b) => {
            return b[1].pts - a[1].pts;
        })
        .map((x, i) => {
            x[1].place = i + 1
            return x
        })
}

function calcMovement(prev, curr) {
    const copy = curr.slice()
    return copy.map(currTeam => {
        for (const prevTeam of prev) {
            if (prevTeam[0] === currTeam[0]) {
                currTeam[1].movement = prevTeam[1].place - currTeam[1].place
            }
        }
        return currTeam
    })
}