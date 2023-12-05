import { gql } from "@apollo/client";
import { UserType } from "../types/user.type";

export const GET_PROFILE_QUERY = gql`
  query Profile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

export type GetProfileQueryResponseType = {
  profile: UserType;
};
