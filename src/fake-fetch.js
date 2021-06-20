import faker from "faker";
import fetchMock from "fetch-mock";

export default fetchMock.sandbox().get(
  "/employees/list",
  Array.from(Array(10), () => faker.name.findName()),
  { delay: 3000 }
);
