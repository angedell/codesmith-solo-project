-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "CreatedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CompletedOn" DATETIME,
    "author" TEXT NOT NULL DEFAULT 'unknown'
);
INSERT INTO "new_Todo" ("CompletedOn", "CreatedOn", "author", "id", "title") SELECT "CompletedOn", "CreatedOn", coalesce("author", 'unknown') AS "author", "id", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
