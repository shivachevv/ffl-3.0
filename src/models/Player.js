export const makeNewPlayer = (
    name, position, club, shirt, id, country
) => {
    return {
        name,
        position,
        club,
        shirt,
        id,
        country
    }
}

export const addPlayerPts = (
    roundPts,
    assists,
    cleanSheet,
    clearanceOffLine,
    errorLeadToGoal,
    goals,
    lastManTackle,
    manOfTheMatch,
    minutesPlayed,
    opponentGoals,
    ownGoals,
    penaltyGoals,
    penaltyMissed,
    penaltySaved,
    ratingOver85,
    redCards,
    saves,
    shotsOnPost,
    starter,
    sub,
    teamVictory,
    threeAllowed,
    yellowCards,
) => {
    return {
        roundPts,
        "roundStats": {
            assists,
            cleanSheet,
            clearanceOffLine,
            errorLeadToGoal,
            goals,
            lastManTackle,
            manOfTheMatch,
            minutesPlayed,
            opponentGoals,
            ownGoals,
            penaltyGoals,
            penaltyMissed,
            penaltySaved,
            ratingOver85,
            redCards,
            saves,
            shotsOnPost,
            starter,
            sub,
            teamVictory,
            threeAllowed,
            yellowCards,
        }
    }
}