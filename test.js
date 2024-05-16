// specified uvs, duration, iterations 

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1, 
    duration: '5s', 
    iterations: 20, 
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

    let res = http.post(url, payload, params);
    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);

}


