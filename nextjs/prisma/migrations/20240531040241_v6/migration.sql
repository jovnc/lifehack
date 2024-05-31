-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productIds" TEXT[],
    "productQuantities" INTEGER[],

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTransaction_AB_unique" ON "_ProductToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTransaction_B_index" ON "_ProductToTransaction"("B");

-- AddForeignKey
ALTER TABLE "_ProductToTransaction" ADD CONSTRAINT "_ProductToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTransaction" ADD CONSTRAINT "_ProductToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
