-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createad_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
