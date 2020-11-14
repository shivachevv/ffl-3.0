import { DATA_URL } from '../common'
const lastUpdateUrl = `${DATA_URL}.json`

const setLastUpdate = (date) => {
    const payload = {
        lastUpdate: date
    }
    return fetch(lastUpdateUrl, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(() => {
        })
        .catch(error => {
          console.error("Error:", error);
        });
}

export default setLastUpdate
