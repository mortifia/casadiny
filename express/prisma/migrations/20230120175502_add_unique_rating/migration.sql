/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `ProductRate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductRate_productId_userId_key" ON "ProductRate"("productId", "userId");
