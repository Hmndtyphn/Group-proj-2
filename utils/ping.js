const ping = require('ping');
const tcpp = require('tcp-ping-node');

const pingList = async hosts => {
    let result = hosts
    for(i = 0; i < hosts.length; i++){
        let res = await tcpp.ping({ host: hosts[i].fav_url, timeout: 10000});
        console.log(res);
        // await resultPush(res);
       result[i].dataValues.favStatus = res.success
    };
    // returnList(result)
    return result
  };


module.exports = pingList;