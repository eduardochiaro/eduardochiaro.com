'use server';
import prisma from '@/utils/prisma';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { Book, Prisma } from '@prisma/client';

const uploadPath = './public/uploads/';
type BookExpanded = Prisma.BookGetPayload<{ include: { file: true } }>;

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

  await prisma.book.upsert({
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
    },
    orderBy: {
      title: 'asc',
    },
  });
};

export { addBook, getBooks, deleteBook };
