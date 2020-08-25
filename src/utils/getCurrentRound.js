import { DATA_URL } from '../common'

const getCurrentRound = async () => {
    const response = await fetch(`${DATA_URL}round.json`)
    const round = await response.json()
    
    return round.currentRound
}

export default getCurrentRound