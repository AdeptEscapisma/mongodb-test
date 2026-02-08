import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Кастомные метрики
const errorRate = new Rate('errors');

// Конфигурация теста
export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<50', 'p(95)<100', 'p(99)<200'],
    errors: ['rate<0.01'],
  },
  discardResponseBodies: true,
};

function randomString(length: number, charset = 'abcdefghijklmnopqrstuvwxyz') {
  let res = '';
  while (length--) {
    res += charset[Math.floor(Math.random() * charset.length)];
  }

  return res;
}

export default function () {
  const name = randomString(4);
  const limit = 100;
  const offset = Math.floor(Math.random() * 10) * 100;

  const indexed = __ENV.UNINDEXED !== 'true';

  const res = http.get(
    `http://localhost:3000/records?name=${name}&limit=${limit}&offset=${offset}&indexed=${indexed}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const checkResult = check(res, {
    'is status 200': (r) => r.status === 200,
  });

  if (!checkResult) {
    errorRate.add(1);
  }

  sleep(Math.random() * 2);
}
