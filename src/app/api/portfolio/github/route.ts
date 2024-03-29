import { NextRequest, NextResponse } from 'next/server';
import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import fsCache from '@/utils/fsCache';

const base = 'https://api.github.com/users';

const { GITHUB_CACHE_HOURS = '24' } = process.env;

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

const cachedFetch = async (url: string) => {
  return fsCache(url, parseInt(GITHUB_CACHE_HOURS), async () => {
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

export async function GET(request: NextRequest, response: NextResponse) {
  const dataFetch = await cachedFetch(`${base}`);

  const data = dataFetch.viewer.repositories.nodes.map(
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
      const { id, name, description, openGraphImageUrl, isArchived, repositoryTopics, pushedAt, url } = repo;
      const topics = repositoryTopics.nodes.map((topic: { topic: { name: any } }) => topic.topic.name);
      const languages = repo.languages.nodes.map((language: { name: any; color: any }) => {
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
    },
  );

  if (data) {
    return NextResponse.json({ results: data });
  }
  return new Response(null, {
    status: 400,
  });
}
