import { API_URL } from '../common'

const getStats = async () => {
    const response = await fetch(`${API_URL}stats`, {
        method: "GET",
    })
    const stats = response.json()
    return stats
}

export default getStats