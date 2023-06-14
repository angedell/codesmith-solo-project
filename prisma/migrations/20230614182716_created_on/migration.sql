/*
  Warnings:

  - Added the required column `CreatedOn` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "CreatedOn" TEXT NOT NULL,
    "CompletedOn" DATETIME,
    "author" TEXT
);
INSERT INTO "new_Todo" ("CompletedOn", "author", "id", "title") SELECT "CompletedOn", "author", "id", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
