import Config from 'react-native-config';
import {GraphQLClient} from 'graphql-request';

const DIRECTUS_ENDPOINT = Config.DIRECTUS_ENDPOINT;
const DIRECTUS_TOKEN = Config.DIRECTUS_TOKEN;

const client = new GraphQLClient(DIRECTUS_ENDPOINT, {
  headers: {
    authorization: `Bearer ${DIRECTUS_TOKEN}`,
  },
});

export default client;
