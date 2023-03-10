import { CancelToken, create } from 'axios';
import wriAPISerializer from 'wri-json-api-serializer';

import {
  GFW_API,
  GFW_STAGING_API,
  GFW_TILES_API,
  CARTO_API,
  MAPBOX_API,
  RESOURCE_WATCH_API,
  GFW_DATA_API,
  GFW_STAGING_DATA_API,
} from 'utils/apis';

const ENVIRONMENT = process.env.NEXT_PUBLIC_FEATURE_ENV;
const GFW_API_URL = ENVIRONMENT === 'staging' ? GFW_STAGING_API : GFW_API;
const GFW_DATA_API_URL =
  ENVIRONMENT === 'staging' ? GFW_STAGING_DATA_API : GFW_DATA_API;

const isServer = typeof window === 'undefined';
export const apiRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_API_URL,
  ...(ENVIRONMENT === 'staging' && {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_DATA_API_KEY,
    },
  }),
  // transformResponse: [(data) => wriAPISerializer(JSON.parse(data))],
});

export const gfwApiRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_API_URL,
});

// Always point to production
export const gfwGeostoreRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_API,
});

export const dataRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_DATA_API_URL,
  ...(ENVIRONMENT === 'staging' && {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_DATA_API_KEY,
    },
  }),
  transformResponse: [(data) => JSON.parse(data)?.data],
});

export const tilesRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_TILES_API,
  // transformResponse: [(data) => wriAPISerializer(JSON.parse(data))],
});

export const dataApiRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_DATA_API_URL,
  transformResponse: [(data) => JSON.parse(data)?.data],
});

export const rwRequest = create({
  timeout: 30 * 1000,
  baseURL: RESOURCE_WATCH_API,
  transformResponse: [(data) => wriAPISerializer(JSON.parse(data))],
});

export const apiAuthRequest = create({
  timeout: 30 * 1000,
  baseURL: GFW_API_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${!isServer && localStorage.getItem('userToken')}`,
  },
  // transformResponse: [(data) => wriAPISerializer(JSON.parse(data))],
});

export const cartoRequest = create({
  timeout: 30 * 1000,
  baseURL: CARTO_API,
});

export const mapboxRequest = create({
  timeout: 30 * 1000,
  baseURL: MAPBOX_API,
});

export const cancelToken = () => CancelToken.source();

export const handleProxyOrigin = () => {
  if (ENVIRONMENT === 'staging') {
    return 'https://staging.globalforestwatch.org/';
  }
  if (ENVIRONMENT === 'preproduction') {
    return 'https://preproduction.globalforestwatch.org/';
  }
  return 'https://www.globalforestwatch.org';
};

export default create({
  timeout: 30 * 1000,
});
