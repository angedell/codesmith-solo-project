/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "CreatedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CompletedOn" DATETIME,
    "DeletedOn" DATETIME,
    "author" TEXT NOT NULL DEFAULT 'unknown'
);
INSERT INTO "new_Todo" ("CompletedOn", "CreatedOn", "DeletedOn", "author", "id", "title") SELECT "CompletedOn", "CreatedOn", "DeletedOn", "author", "id", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
