'use server';
import prisma from '@/utils/prisma';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { Book } from '@prisma/client';

const uploadPath = './public/uploads/';

const download = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFile(fileName, buffer, () => console.log('finished downloading!'));
};

const addBook = async (book: any) => {
  const isbn = book.isbn ? book.isbn[0] : nanoid();

  //download image first and save local
  const imageFile = book.cover_i ? `${isbn}.jpg` : '';
  if (book.cover_i) {
    await download(`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`, `${uploadPath}${imageFile}`);
  }

  await prisma.book.upsert({
    where: {
      isbn: book.isbn ? book.isbn[0] : '',
    },
    update: {
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown',
      image: imageFile,
    },
    create: {
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown',
      image: imageFile,
      isbn: book.isbn ? book.isbn[0] : '',
    },
  });
};

const deleteBook = async (book: Book) => {
  // delete image
  if (book.image) {
    fs.unlinkSync(`${uploadPath}${book.image}`);
  }

  await prisma.book.delete({
    where: {
      id: book.id,
    },
  });
};

const getBooks = async () => {
  return prisma.book.findMany({
    orderBy: {
      title: 'asc',
    },
  });
};

export { addBook, getBooks, deleteBook };
