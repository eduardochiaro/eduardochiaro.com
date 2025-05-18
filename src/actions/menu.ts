'use server';
import prisma from '@/utils/prisma';
import { any } from 'cypress/types/bluebird';

type MenuLinkData = {
  name: FormDataEntryValue | null;
  url: FormDataEntryValue | null;
  order: FormDataEntryValue | null;
  onlyMobile: FormDataEntryValue | null;
  active: FormDataEntryValue | null;
};

const getMenuLinks = async () => {
  // Fetch menu links from database
  const menuLinks = await prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  return menuLinks;
};

const addMenuLink = async (data: MenuLinkData) => {
  // Add a new menu link to the database
  const newMenuLink: any = {
    name: data.name as string,
    url: data.url as string,
    order: Number(data.order),
    onlyMobile: data.onlyMobile === 'true',
    active: data.active === 'true',
  };
  await prisma.menuLink.create({
    data: newMenuLink,
  });
};
const updateMenuLink = async (id: string, data: MenuLinkData) => {
  const updatedMenuLink: any = {
    name: data.name as string,
    url: data.url as string,
    order: Number(data.order),
    onlyMobile: data.onlyMobile === 'true',
    active: data.active === 'true',
  };
  await prisma.menuLink.update({
    where: { id: parseInt(id) },
    data: updatedMenuLink,
  });
};
const deleteMenuLink = async (id: string) => {
  // Delete a menu link from the database
  await prisma.menuLink.delete({
    where: { id: parseInt(id) },
  });
};

export { getMenuLinks, addMenuLink, updateMenuLink, deleteMenuLink };
