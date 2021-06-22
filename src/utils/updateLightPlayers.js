import { API_URL } from '../common'

const updateLightPlayers = async () => {
  await fetch(`${API_URL}players/light-upload`, {
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  })

  return
}

export default updateLightPlayers