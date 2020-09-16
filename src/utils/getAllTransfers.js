import { DATA_URL } from '../common'

export const getAllTransfers = async () => {
    const response = await fetch(`${DATA_URL}transfers.json`)
    const transfers = await response.json()

    return transfers
}