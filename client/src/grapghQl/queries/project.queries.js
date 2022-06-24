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
