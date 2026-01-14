interface ConfigType {
  site: {
    baseUrl: string;
    serverUrl: string;
  };
}

export const CONFIG: ConfigType = {
  site: {
    baseUrl: "http://localhost:5173",
    serverUrl: "http://localhost:8000/api",
  },
} as const;
