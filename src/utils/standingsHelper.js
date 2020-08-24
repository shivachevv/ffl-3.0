export default function (data) {
    let lgMap = {
        "pele": [1, 10],
        "maradona": [13, 22]
    }

    let l1 = data.filter((x, i) => {
        if (i >= lgMap["pele"][0] && i <= lgMap["pele"][1]) {
            return x
        }
    }).map(x => {
        return {
            name: x[1],
            user: x[2],
            total: x[3],
            roundPts: x[4],
            move: x[5],
            transfers: x[7]
        }
    })

    let l2 = data.filter((x, i) => {
        if (i >= lgMap["maradona"][0] && i <= lgMap["maradona"][1]) {
            return x
        }
    }).map(x => {
        return {
            name: x[1],
            user: x[2],
            total: x[3],
            roundPts: x[4],
            move: x[5],
            transfers: x[7]
        }
    })
    return {
        "pele": l1,
        "maradona": l2
    };
}