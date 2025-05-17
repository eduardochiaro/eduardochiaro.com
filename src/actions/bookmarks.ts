'use server';
import prisma from '@/utils/prisma';
import * as cheerio from 'cheerio';

type BookmarkData = {
  name: FormDataEntryValue | null;
  url?: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  categoryId: FormDataEntryValue | null;
};

const addBookmark = async (data: BookmarkData) => {
  const bookmarkData: any = {
    name: data.name as string,
    url: data.url as string,
    description: data.description as string,
    categoryId: parseInt(data.categoryId as string),
    createdAt: new Date(),
  };
  return prisma.bookmark.create({
    data: {
      ...bookmarkData,
    },
  });
};

const updateBookmark = async (id: string, data: BookmarkData) => {
  const bookmarkData: any = {
    name: data.name as string,
    description: data.description as string,
    categoryId: parseInt(data.categoryId as string),
    updatedAt: new Date(),
  };
  return prisma.bookmark.update({
    where: {
      id: parseInt(id),
    },
    data: bookmarkData,
  });
};

const deleteBookmark = async (id: string) => {
  return prisma.bookmark.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const fetchMetadataFromUrl = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  });
  const text = await response.text();

  const $ = cheerio.load(text);

  const titleText = $('title').first().text();
  const descriptionText =
    $('meta[name="description"]').length > 0
      ? $('meta[name="description"]').first().attr('content')
      : $('meta[property="og:description"]').first().attr('content');

  let title = titleText ? titleText : '';
  let description = descriptionText ? descriptionText : '';

  if (description.length > 191) {
    const maxLength = 188;
    //trim the string to the maximum length
    let trimmedString = description.slice(0, maxLength);
    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.slice(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';

    description = trimmedString;
  }

  return {
    title,
    description,
  };
};

const getBookmarks = async () => {
  return prisma.bookmark.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
  });
};

export { getBookmarks, addBookmark, updateBookmark, deleteBookmark, fetchMetadataFromUrl };
