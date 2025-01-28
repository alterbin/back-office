-- DropEnum
DROP TYPE "crdb_internal_region";

-- CreateTable
CREATE TABLE "givens" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL DEFAULT '',
    "description" STRING NOT NULL,
    "photos" STRING[] DEFAULT ARRAY[]::STRING[],
    "address" STRING NOT NULL,
    "contact" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" STRING,
    "rank" INT4 NOT NULL DEFAULT 1,
    "isFulfilled" BOOL NOT NULL DEFAULT false,
    "hidden" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "givens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "given_interests" (
    "id" STRING NOT NULL,
    "note" STRING NOT NULL,
    "contact" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shippingAddress" STRING NOT NULL,
    "givenId" STRING NOT NULL,
    "isAccepted" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "given_interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "given_interests_contact_givenId_key" ON "given_interests"("contact", "givenId");

-- AddForeignKey
ALTER TABLE "given_interests" ADD CONSTRAINT "given_interests_givenId_fkey" FOREIGN KEY ("givenId") REFERENCES "givens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
