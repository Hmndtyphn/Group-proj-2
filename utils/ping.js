const ping = require('ping');

// const pingList = async (hosts) => {
//     let pingResult = []
//    await hosts.forEach( async (host) => {
//         await ping.promise.probe(host.dataValues.fav_url)
//             .then(async (res) => {
//                 //check that result is as expected
//                 console.log(res.alive)
                
//                 //create 
//                 await pingResult.push(res)
                
//             });
//     });
//     return pingResult;
// }
const pingList = async hosts => {
    let result = []
    for(let host of hosts){
        let res = await ping.promise.probe(host);
        // await resultPush(res);
        result.push(res);
    }
    returnList(result)

}

// const resultPush = async (res) => {
//     result.push(res);
    
// }

const returnList = async list => {
    return list
}

module.exports = pingList;