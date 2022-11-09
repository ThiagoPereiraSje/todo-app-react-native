import {gql} from 'graphql-request';

export const FILTER_TASKS = gql`
  query filter_tasks($filter: tasks_filter, $sort: [String]) {
    tasks(filter: $filter, sort: $sort) {
      id
      title
      subtitle
      duration
      runtime
      completed_time
      status
      fullyCompletedAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation create_task($input: create_tasks_input!) {
    task: create_tasks_item(data: $input) {
      id
      title
      subtitle
      duration
      runtime
      completed_time
      status
      fullyCompletedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation update_task($id: ID!, $input: update_tasks_input!) {
    task: update_tasks_item(id: $id, data: $input) {
      id
      title
      subtitle
      duration
      runtime
      completed_time
      status
      fullyCompletedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation delete_task($id: ID!) {
    delete_tasks_item(id: $id) {
      id
    }
  }
`;
