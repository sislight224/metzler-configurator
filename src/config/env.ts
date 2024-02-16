export type EnvConfigType = {
  apiBaseUrl: string | undefined;
  apiBasePrefix: string | undefined;
};

export const envConfig: EnvConfigType = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  apiBasePrefix: `/configutrator/${process.env.NEXT_PUBLIC_API_PREFIX}`,
};
