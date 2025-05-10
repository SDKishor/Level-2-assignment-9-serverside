/*
  Warnings:

  - A unique constraint covering the columns `[sp_order_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_sp_order_id_key" ON "subscriptions"("sp_order_id");
