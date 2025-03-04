import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://jsonplaceholder.typicode.com";

export const initialApiService = createApi({
  reducerPath: "initialApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: () => ({}),
});
