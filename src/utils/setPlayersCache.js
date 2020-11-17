import { DATA_URL } from '../common'

const setPlayersCache = async () => {
    const cache = await caches.open("ffl-cache");
    cache.add(`${DATA_URL}players.json`);
    return
} 

export default setPlayersCache