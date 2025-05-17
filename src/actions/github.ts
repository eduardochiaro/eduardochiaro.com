import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import fsCache from '@/utils/fsCache';

const base = 'https://api.github.com/users';

const { GITHUB_CACHE_HOURS = '24' } = process.env;

export type GitHubItem = {
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

const cachedFetch = async (url: string) => {
  return fsCache(url, parseInt(GITHUB_CACHE_HOURS), async () => {
    const { data } = await client.query({
      query: gql`
        query REPOS {
          viewer {
            pinnedItems(types: REPOSITORY, first: 100) {
              nodes {
                ... on Repository {
                  id
                  name
                  url
                  updatedAt
                  pushedAt
                  description
                  isArchived
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

export async function fetchGitHub() {
  const dataFetch = await cachedFetch(`${base}`);

  const data = dataFetch.viewer.pinnedItems.nodes.map(
    (repo: {
      languages?: any;
      id?: any;
      name?: any;
      description?: any;
      openGraphImageUrl?: any;
      isArchived?: any;
      repositoryTopics?: any;
      pushedAt?: any;
      url?: any;
    }) => {
      const { id, name, description, isArchived, pushedAt, url } = repo;

      return {
        id,
        name,
        description,
        isArchived,
        pushedAt,
        url,
      };
    },
  );
  //sort by pushedAt
  data.sort((a: GitHubItem, b: GitHubItem) => {
    return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
  });

  if (data) {
    return data.filter((x: GitHubItem) => !x.isArchived);
  }
  return [];
}
