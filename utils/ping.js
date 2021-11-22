const ping = require('ping');

const pingList = async hosts => {
    let result = hosts
    for(i = 0; i < hosts.length; i++){
        let res = await ping.promise.probe(hosts[i].fav_url, {
            numeric: true,
            min_reply: 1,
            extra: ['-i', '2']
        });
        // await resultPush(res);
        result[i].dataValues.favStatus = res.alive
    };
    // returnList(result)
    return result
  };


module.exports = pingList;