import http from 'k6/http';
import { sleep } from 'k6';

export const options = JSON.parse(__ENV.LOAD_CONFIG || '{}');

function buildRequestBody(method, body) {
  if (body === undefined || body === null || method === 'GET' || method === 'DELETE') {
    return null;
  }

  return typeof body === 'string' ? body : JSON.stringify(body);
}

export default function () {
  const targetUrl = __ENV.TARGET_URL;
  const requestConfig = JSON.parse(__ENV.REQUEST_CONFIG || '{"method":"GET"}');
  const method = (requestConfig.method || 'GET').toUpperCase();
  const params = { headers: requestConfig.headers || {} };
  const body = buildRequestBody(method, requestConfig.body);

  http.request(method, targetUrl, body, params);
  sleep(1);
}
