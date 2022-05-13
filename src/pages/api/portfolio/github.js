import cache from "memory-cache";
import apiWithMiddleware from '../../../lib/apiWithMiddleware';
import cors from '../../../middlewares/cors';
import { gql } from "@apollo/client";
import client from "../../../lib/apolloClient";

const base = "https://api.github.com/users";
const headers = { "Authorization": `Bearer ${process.env.GITHUB_TOKEN}` };
const hours = 24;

const cachedFetch = async (url, append = {}) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  }
  const { data } = await client.query({
    query: gql`
     query REPOS { 
      viewer { 
        repositories (
          ownerAffiliations: [OWNER]
          isLocked: false
          first: 100, 
          orderBy: {
            direction: DESC
            field: PUSHED_AT
          }) {
          nodes {
            id
            name
            languages(first: 5, orderBy: {
              field: SIZE,
              direction: DESC
            }) {
              nodes {
                name
                color
              }
            }
            url
            updatedAt
            pushedAt
            description
            openGraphImageUrl
            isArchived
            repositoryTopics (first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
     }
    `,
  });
  cache.put(url, data, hours * 1000 * 60 * 60);
  return data;
};

const handler = async (req, res) => {  
  await cors(req, res);
  const dataFetch = await cachedFetch(`${base}`, { headers });

  const data = dataFetch.viewer.repositories.nodes.map((repo) => {
    const { id, name, description, openGraphImageUrl, isArchived, repositoryTopics, pushedAt, url, } = repo;
    const topics = repositoryTopics.nodes.map((topic) => topic.topic.name);
    const languages = repo.languages.nodes.map((language) =>  {
      const { name, color } = language;
      return { name, color };
    });
    return {
      id,
      name,
      description,
      isArchived,
      openGraphImageUrl,
      topics,
      pushedAt,
      url,
      languages,
      language: languages[0]?.name,
    };
  });

  res.status(200).json({ results: data });
}
export default apiWithMiddleware(handler);