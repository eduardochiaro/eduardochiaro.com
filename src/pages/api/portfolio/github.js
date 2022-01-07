import cache from "memory-cache";

const base = "https://api.github.com/users";
const username = process.env.GITHUB_USERNAME;
const headers = { Accept: "application/vnd.github.mercy-preview+json" };

const cachedFetch = async (url, append = {}) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  }
  const hours = 1;
  const response = await fetch(url, append);
  const data = await response.json();
  cache.put(url, data, hours * 1000 * 60 * 60);
  return data;
};

const handler = async (req, res) => {  
  const dataFetch = await cachedFetch(`${base}/${username}/repos?sort=updated`, { headers })
  //const data = await dataFetch.json();

  res.status(200).json({ results: dataFetch });
}
export default handler;