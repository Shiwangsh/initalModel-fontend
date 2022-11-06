import axios from "axios";
import authHeader from "./auth-header";

export default async function filterResults(url: any, filterQuery: any) {
  const query = filterQuery.replace(/['"]+/g, "");
  //   console.log(filterQuery);

  const res = await axios.get(
    `
          ${url}?${query}
        `,
    {
      headers: authHeader(),
    }
  );
  const { data } = res;
  return data;
}
