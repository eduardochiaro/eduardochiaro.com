-- CreateTable
CREATE TABLE "user_access" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_access_pkey" PRIMARY KEY ("id")
);
