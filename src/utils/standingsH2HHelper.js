import roundPointsCalculator from '../utils/roundPointsCalculator'

const standingsH2HHelper = (rounds, players, users, currentRound) => {
    const newTeamObj = () => {
        return {
            for: 0,
            against: 0,
            goaldiff: 0,
            games: 0,
            pts: 0,
            wdl: {
                win: 0,
                draw: 0,
                loss: 0
            }
        }
    }
    let result = {}
    Object.values(rounds).forEach(round => {
        const roundHeld = Object.values(round)[2]
        const roundObject = Object.values(round)[0]
        const roundArray = Object.values(roundObject)
        if (roundHeld <= currentRound) {
            roundArray.forEach(matches => {
                const user1 = matches.team1
                const user2 = matches.team2
                if (!result[user1]) {
                    result[user1] = newTeamObj()
                }
                if (!result[user2]) {
                    result[user2] = newTeamObj()
                }

                const userRound1 = users[user1].rounds[`r${roundHeld}`]
                const userRound2 = users[user2].rounds[`r${roundHeld}`]

                const team1Total = roundPointsCalculator(userRound1, roundHeld, players, true)
                const team2Total = roundPointsCalculator(userRound2, roundHeld, players, true)


                // console.log(round, matches, user1, user2, result)
                result[user1].games++
                result[user2].games++

                result[user1].for += team1Total
                result[user1].against += team2Total

                result[user2].for += team2Total
                result[user2].against += team1Total

                result[user1].goaldiff += team1Total - team2Total
                result[user2].goaldiff += team2Total - team1Total

                if (team1Total > team2Total) {
                    result[user1].pts += 3
                    result[user1].wdl.win++

                    result[user2].wdl.loss++
                } else if (team2Total > team1Total) {
                    result[user2].pts += 3
                    result[user2].wdl.win++

                    result[user1].wdl.loss++
                } else {
                    result[user1].pts++
                    result[user2].pts++

                    result[user2].wdl.draw++
                    result[user1].wdl.draw++
                }

            })
        }

    })

    // console.log(result);

    return result
}

export default standingsH2HHelper