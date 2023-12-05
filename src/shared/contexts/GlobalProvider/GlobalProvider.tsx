/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { UserType } from "../../types/user.type";
import {
  GET_PROFILE_QUERY,
  GetProfileQueryResponseType,
} from "../../services/profile.service";
import { GlobalContextType, GlobalProviderProps } from "./GlobalProvider.type";
import Loading from "@/shared/components/Loading";
import Container from "@/ui/Container";

export const initialStateUser: UserType = {
  id: "",
  avatar: "",
  createdAt: "",
  email: "",
  fullName: "",
  type: "",
  updatedAt: "",
};

export const GlobalContext = createContext({} as GlobalContextType);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>(initialStateUser);

  useQuery<GetProfileQueryResponseType>(GET_PROFILE_QUERY, {
    onCompleted({ profile }) {
      setUser(profile);
      setIsLoading(false);
      setIsAuthenticated(true);
    },
  });

  return (
    <GlobalContext.Provider
      value={{
        auth: {
          isAuthenticated,
          setIsAuthenticated,
        },
        loading: {
          isLoading,
          setIsLoading,
        },
        user: {
          user,
          setUser,
        },
      }}
    >
      {isLoading && (
        <Container as="body" size={{ width: "w-full" }} bgColor="bg-background">
          <Loading />
        </Container>
      )}
      {!isLoading && children}
    </GlobalContext.Provider>
  );
};
