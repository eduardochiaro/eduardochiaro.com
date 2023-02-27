import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import cors from '@/middlewares/cors';
import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import fsCache from '@/utils/fsCache';

const base = 'https://api.github.com/users';
const hours = 24;

type GitHubItem = {
  id: string;
  name: string;
  description: string;
  openGraphImageUrl: string;
  isArchived: boolean;
  topics: string[];
  pushedAt: string;
  url: string;
  languages: {
    name: string;
    color: string;
  }[];
  language: string;
};

type Data = {
  results: GitHubItem[];
};

const cachedFetch = async (url: string) => {
  return fsCache(url, hours, async () => {
    const { data } = await client.query({
      query: gql`
        query REPOS {
          viewer {
            repositories(ownerAffiliations: [OWNER], isLocked: false, first: 100, orderBy: { direction: DESC, field: PUSHED_AT }) {
              nodes {
                id
                name
                languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
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
                repositoryTopics(first: 5) {
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
    return data;
  });
};

const handler = async (req:NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const dataFetch = await cachedFetch(`${base}`);

  const data = dataFetch.viewer.repositories.nodes.map((repo: { languages?: any; id?: any; name?: any; description?: any; openGraphImageUrl?: any; isArchived?: any; repositoryTopics?: any; pushedAt?: any; url?: any; }) => {
    const { id, name, description, openGraphImageUrl, isArchived, repositoryTopics, pushedAt, url } = repo;
    const topics = repositoryTopics.nodes.map((topic: { topic: { name: any; }; }) => topic.topic.name);
    const languages = repo.languages.nodes.map((language: { name: any; color: any; }) => {
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
};
export default apiWithMiddleware(handler);
