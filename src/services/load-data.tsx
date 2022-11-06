import axios from "axios";
import authHeader from "./auth-header";

export default async function loadData(url: any) {
  const res = await axios.get(
    `
          ${url}
        `,
    {
      headers: authHeader(),
    }
  );
  const { data } = res;
  return data;
}
