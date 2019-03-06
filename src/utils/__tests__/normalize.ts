import { normalizeArray } from "../normalize";

const keys = [1, 2, 3];
const collections = [
  { id: 3, name: "Bran" },
  { id: 1, name: "Mike" },
  { id: 2, name: "Nancy" },
];

test("normalizeArray", () => {
  const normalized = normalizeArray(keys, "id", collections);
  expect(normalized[0].name).toBe("Mike");
  expect(normalized[1].name).toBe("Nancy");
  expect(normalized[2].name).toBe("Bran");
});
