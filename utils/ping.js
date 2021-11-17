const ping = require('ping');

let hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
let result= "";
hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            result = res;
            console.log(result);
        });
});

//Deconstrunct result from ping (Looking for alive from result)

//Note Spot
// const statusRend = (status) => {
//     //if status = true green else red
//     if (alive) === true){
//       return trafficlight === green
//     } else {
//         trafficlight === red
//     }

// }