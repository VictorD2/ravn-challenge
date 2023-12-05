import { gql } from "@apollo/client";
import { UserType } from "../types/user.type";

export const GET_USERS_QUERY = gql`
  query Users {
    users {
      avatar
      fullName
      id
    }
  }
`;

export type GetUsersQueryResponseType = {
  users: Array<UserType>;
};
