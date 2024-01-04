import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 5,
  duration: "2s",
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 34 },
        "amazon:gb:london": { loadZone: "amazon:gb:london", percent: 33 },
        "amazon:au:sydney": { loadZone: "amazon:au:sydney", percent: 33 },
      },
    },
  },
};

// Custom metric to measure avg response time
let responseTimes = new Array();

export default function () {
  const baseUrl = "http://localhost:3000/sign-up";

  const users = [
    { email: "user-1@email.com", password: "pass123" },
    { email: "user-3@email.com", password: "pass456" },
    { email: "user-2@email.com", password: 111 },
  ];

  for (const user of users) {
    const payload = JSON.stringify({
      email: user.email,
      password: user.password,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const params = {
      headers: headers,
    };

    let startTime = new Date();
    const response = http.post(baseUrl, payload, params);
    let endTime = new Date();

    console.log(
      `User: ${user.email}, Response status code: ${response.status}`
    );

    check(response, {
      "Status is 400": (r) => r.status === 400,
      "Status is 500": (r) => r.status === 500,
      "Status is 204": (r) => r.status === 204,
    });

    responseTimes.push(endTime - startTime);

    sleep(1);
  }
}

export function teardown() {
  let averageResponseTime =
    responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length ||
    0;
  console.log(`Average Response Time: ${averageResponseTime} ms`);
}
