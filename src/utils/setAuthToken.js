import { setAuthTokens } from "axios-jwt";

export const setAuthUser = (accessToken) => {
  setAuthTokens({
    accessToken,
  });
};
