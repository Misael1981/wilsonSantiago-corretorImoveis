-- CreateEnum
CREATE TYPE "PropertyRequestStatus" AS ENUM ('PENDING', 'CONTACTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "property_requests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "PropertyRequestStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,

    CONSTRAINT "property_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "property_requests_status_createdAt_idx" ON "property_requests"("status", "createdAt");

-- CreateIndex
CREATE INDEX "property_requests_type_idx" ON "property_requests"("type");

-- CreateIndex
CREATE INDEX "property_requests_city_idx" ON "property_requests"("city");
