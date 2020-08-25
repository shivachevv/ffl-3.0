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
    starter,
    sub,
    goals,
    penalties,
    assists,
    MOMs,
    wins,
    crossbars,
    lastManTackles,
    clearancesOffLine,
    cleanSheets,
    savedPenalties,
    GKSavesx5,
    ratingOver85,
    YCs,
    RCs,
    ownGoals,
    missedPens,
    threeAllowed,
    errorsLeadToGoal
) => {
    return {
        roundPts,
        "roundStats": {
            starter,
            sub,
            goals,
            penalties,
            assists,
            MOMs,
            wins,
            crossbars,
            lastManTackles,
            clearancesOffLine,
            cleanSheets,
            savedPenalties,
            GKSavesx5,
            ratingOver85,
            YCs,
            RCs,
            ownGoals,
            missedPens,
            threeAllowed,
            errorsLeadToGoal
        }

    }
}