import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProducts {
    projects {
      id
      name
      status
    }
  }
`;

export const GET_PROJECT = gql`
  query getProduct($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
