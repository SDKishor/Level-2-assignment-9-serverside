/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `user_votes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_votes_postId_key";

-- DropIndex
DROP INDEX "user_votes_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_votes_postId_userId_key" ON "user_votes"("postId", "userId");
