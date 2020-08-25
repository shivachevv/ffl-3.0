import { DATA_URL } from '../common'

const getAllPlayersDataNormal = async () => {
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

export {
    getAllPlayersDataNormal,
    getAllPlayersDataCathegorized
}