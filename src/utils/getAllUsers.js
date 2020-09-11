import { DATA_URL } from '../common'

const getAllUsers = async () => {
    const response = await fetch(`${DATA_URL}users.json`)
    const users = await response.json()
    return users

}

export default getAllUsers