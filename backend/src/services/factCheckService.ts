import axios from "axios";

const GOOGLE_FACTCHECK_API =
  "https://factchecktools.googleapis.com/v1alpha1/claims:search";

export const fetchFactCheckData = async (query: string) => {
  const response = await axios.get(GOOGLE_FACTCHECK_API, {
    params: {
      query,
      key: process.env.GOOGLE_API_KEY,
    },
  });

  return response.data;
};
