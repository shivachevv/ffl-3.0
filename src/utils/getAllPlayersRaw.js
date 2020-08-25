import { DATA_URL } from '../common'

const getAllPlayersRaw = async () => {
    const response = await fetch(`${DATA_URL}AllPlayersRaw.json`)
    const result = await response.json()
    const trimmedData = result.map(x => {
        return x.splice(0, x.length - 6)
    })
        .splice(1)

    return trimmedData
}

export default getAllPlayersRaw