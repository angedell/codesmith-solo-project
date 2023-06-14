/*
  Warnings:

  - You are about to alter the column `CreatedOn` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "CreatedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CompletedOn" DATETIME,
    "author" TEXT
);
INSERT INTO "new_Todo" ("CompletedOn", "CreatedOn", "author", "id", "title") SELECT "CompletedOn", "CreatedOn", "author", "id", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
