import { DATA_URL } from '../common'
// import getCachedPlayers from './getCachedPlayers.js'
// import setLastUpdate from './setLastUpdate.js'

const getAllPlayersDataNormal = async () => {
    // const date = new Date()
    // await setLastUpdate(date)
    // const cache = await caches.open("ffl-cache");
    // cache.add("https://ffl-3-new.firebaseio.com/lastUpdate.json");


    // const lastUpdateRes = await fetch(`${DATA_URL}lastUpdate.json`)
    // const lastUpdate = await lastUpdateRes.json()

    // const cachedUpdate = await getCachedPlayers("update")

    // if (lastUpdate === cachedUpdate) {
    //     console.log(1);
    //     const players = await getCachedPlayers('players')
    //     return players
    // }



    // console.log(2);

    const response = await fetch(`${DATA_URL}players.json`)
    const normal = await response.json()
    return normal
}

const getAllPlayersDataCathegorized = async () => {
    const response = await fetch(`${DATA_URL}players.json`)
    const normal = await response.json()
    let cathegorized = {}

    Object.keys(normal).forEach(id => {
        const player = normal[id]
        
        if (!cathegorized[player.country]) {
            cathegorized[player.country] = {}
            if (!cathegorized[player.country][player.club]) {
                cathegorized[player.country][player.club] = {}
                cathegorized[player.country][player.club][id] = player
            } else {
                cathegorized[player.country][player.club][id] = player
            }
        } else {
            if (!cathegorized[player.country][player.club]) {
                cathegorized[player.country][player.club] = {}
                cathegorized[player.country][player.club][id] = player
            } else {
                cathegorized[player.country][player.club][id] = player
            }
        }
    })

    return cathegorized
}

const cathegorizePlayers = (players) => {
    let cathegorized = {}

    Object.keys(players).forEach(id => {
        const player = players[id]
        
        if (!cathegorized[player.country]) {
            cathegorized[player.country] = {}
            if (!cathegorized[player.country][player.club]) {
                cathegorized[player.country][player.club] = {}
                cathegorized[player.country][player.club][id] = player
            } else {
                cathegorized[player.country][player.club][id] = player
            }
        } else {
            if (!cathegorized[player.country][player.club]) {
                cathegorized[player.country][player.club] = {}
                cathegorized[player.country][player.club][id] = player
            } else {
                cathegorized[player.country][player.club][id] = player
            }
        }
    })

    return cathegorized
}

export {
    getAllPlayersDataNormal,
    getAllPlayersDataCathegorized,
    cathegorizePlayers
}