
// Working with 1 vus

// import http from 'k6/http';

// export const options = {
//     vus: 1,
//     duration: '5s'
// };

// export default function(){
//     const url = 'http://13.126.130.226:9001/2015-03-31/functions/function/invocations'
//     const payload = JSON.stringify({
//         object: 'human.jpg',
//         model: 'model1.h5',
//     });

//     const params = {
//         headers:{
//             'Content-Type': 'application/json',
//         },
//     };

//     const res= http.post(url,payload,params)
//     console.log(res.body)
// }


//stress Testing

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2s', target: 1 }, // Ramp-up to 1 VU
        { duration: '2s', target: 2 }, // Ramp-up to 2 VUs
        { duration: '6s', target: 2 }, // Stay at 2 VUs for 6 seconds
        { duration: '2s', target: 0 }, // Ramp-down to 0 VUs
    ],
};

export default function () {
    const url = 'http://13.126.130.226:9001/2015-03-31/functions/function/invocations';
    const payload = JSON.stringify({
        object: 'human.jpg',
        model: 'model1.h5',
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        let res = http.post(url, payload, params);
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
        console.log(`Response status: ${res.status}`);
        console.log(`Response body: ${res.body}`);
    } catch (e) {
        console.error(`Request failed: ${e.message}`);
    }
    sleep(1); // Sleep to space out requests
}
