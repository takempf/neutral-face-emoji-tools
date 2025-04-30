import axios from 'axios';
import { ConcurrencyManager } from 'axios-concurrency';
import { v4 as uuidv4 } from 'uuid';

import { getSlackApiData } from './getSlackApiData';

const MAX_CONCURRENT_REQUESTS = 1;

const slackApi = axios.create({
  baseURL: `${window.location.origin}/api`
});

ConcurrencyManager(slackApi, MAX_CONCURRENT_REQUESTS);

const NO_OP = function () {};

export function uploadEmoji(file, callback = NO_OP) {
  const { apiToken, versionUid } = getSlackApiData();
  const timestamp = Date.now() / 1000;
  const version = versionUid ? versionUid.substring(0, 8) : 'noversion';
  const id = uuidv4();
  let fileName = file.name.split('.')[0] ?? '';
  fileName = fileName.toLowerCase().replace(' ', '-');

  const formData = new FormData();
  formData.append('name', fileName);
  formData.append('mode', 'data');
  formData.append('token', apiToken);
  formData.append('image', file);

  slackApi({
    method: 'post',
    url: `/emoji.add`,
    params: {
      _x_id: `${version}-${timestamp}`
    },
    data: formData,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => {
      const error = response?.data?.error;
      callback(error, response);
    })
    .catch((error) => {
      callback(error, null);
    });

  return id;
}
