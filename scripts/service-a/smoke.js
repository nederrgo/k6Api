import http from 'k6/http';
import { sleep } from 'k6';

// Add this line to debug:
console.log(`Running with config: ${__ENV.LOAD_CONFIG}`);

export const options = JSON.parse(__ENV.LOAD_CONFIG);

export default function () {
  http.get('https://httpbin.org/anythingדשגשדגשדגשד');
  sleep(1);
}