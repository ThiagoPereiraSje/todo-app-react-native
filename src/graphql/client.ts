import {GraphQLClient} from 'graphql-request';

const ENDPOINT = '';
const TOKEN = '';

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${TOKEN}`,
  },
});

export default client;
