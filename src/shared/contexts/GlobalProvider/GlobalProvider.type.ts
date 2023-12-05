import { UserType } from "@/shared/types/user.type";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type GlobalProviderProps = {
  children: ReactNode;
};

export type GlobalContextType = {
  auth: {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  };
  loading: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
  user: {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
  };
};
