'use server';
import prisma from '@/utils/prisma';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { Book, BookTag, Prisma } from '@/utils/prismaClient';

const uploadPath = './public/uploads/';
type BookExpanded = Prisma.BookGetPayload<{ include: { file: true; tags: true } }>;

const download = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFile(fileName, buffer, () => console.log('finished downloading!'));
};

const addBook = async (book: BookExpanded) => {
  const isbn = book.isbn ? book.isbn : nanoid();

  //download image first and save local
  const imageFile = book.file && book.file.path ? `${isbn}.jpg` : '';
  let file = null;
  if (book.file && book.file.path) {
    await download(book.file.path, `${uploadPath}${imageFile}`);
    file = await prisma.file.upsert({
      where: {
        path: imageFile,
      },
      update: {},
      create: {
        name: book.title,
        type: 'image/jpeg',
        path: imageFile,
      },
    });
  }

  const bookData = await prisma.book.upsert({
    where: {
      isbn: book.isbn,
    },
    update: {
      title: book.title,
      author: book.author,
      fileId: file ? file.id : null,
    },
    create: {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      fileId: file ? file.id : null,
    },
  });

  if (book.tags && book.tags.length > 0) {
    //get or create tags
    const tags = await Promise.all(
      book.tags.map(async (tag: any) => {
        return await prisma.bookTag.upsert({
          where: {
            name: tag.name,
          },
          update: {},
          create: {
            name: tag.name,
          },
        });
      }),
    );

    //update book tags
    await prisma.book.update({
      where: {
        id: bookData.id,
      },
      data: {
        tags: {
          set: tags.map((tag) => {
            return {
              name: tag.name,
            };
          }),
        },
      },
    });
  }
};

const deleteBook = async (book: BookExpanded) => {
  // delete image
  if (book.file) {
    fs.unlinkSync(`${uploadPath}${book.file.path}`);
  }

  await prisma.book.delete({
    where: {
      id: book.id,
    },
  });
};

const getBooks = async () => {
  return prisma.book.findMany({
    include: {
      file: true,
      tags: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
};

const getBookTags = async () => {
  return prisma.bookTag.findMany({
    include: {
      _count: {
        select: { books: true },
      },
    },
    orderBy: [
      {
        books: {
          _count: 'desc',
        },
      },
      {
        name: 'asc',
      },
    ],
  });
};

const updateBookTagPublished = async (book: BookTag) => {
  await prisma.bookTag.update({
    where: {
      id: book.id,
    },
    data: {
      published: !book.published,
    },
  });
};

const deleteBookTag = async (tag: BookTag) => {
  await prisma.bookTag.delete({
    where: {
      id: tag.id,
    },
  });
};

export { addBook, getBooks, deleteBook, getBookTags, updateBookTagPublished, deleteBookTag };
