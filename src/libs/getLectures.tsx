import { Lecture } from "../type/Lecture";

export default async function getLectures(): Promise<Lecture[]> {
  const res = await fetch(
    "https://devserver.icu/api/v3/search?q=microeconomics&term=%2A" // This is test data. Replace with actual data.
  );

  if (!res.ok) throw new Error("Failed to fetch lectures");
  return await res.json();
}
