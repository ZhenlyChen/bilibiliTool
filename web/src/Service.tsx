import Axios from "axios";

export const service = Axios.create({
  // ...
  headers: {
    "Cache-Control": "no-cache",
  },
});
