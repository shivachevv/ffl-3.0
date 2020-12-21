import { API_URL } from '../common/index'
import axios from 'axios'

const updateStats = () => {
    axios.get(`${API_URL}stats`)

    return
}

export default updateStats