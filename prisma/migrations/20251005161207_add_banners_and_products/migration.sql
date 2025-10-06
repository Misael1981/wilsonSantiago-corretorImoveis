-- CreateTable
CREATE TABLE "carousel_banners" (
    "id" TEXT NOT NULL,
    "imageMobile" TEXT NOT NULL,
    "imageTablet" TEXT NOT NULL,
    "imageDesktop" TEXT NOT NULL,
    "imageLaptop" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carousel_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tags" TEXT[],
    "colors" TEXT[],
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT[],
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_packaging" (
    "id" TEXT NOT NULL,
    "quantityPerPackage" INTEGER NOT NULL,
    "packagePerBox" INTEGER NOT NULL,
    "unitLabel" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION,
    "boxHeight" DOUBLE PRECISION NOT NULL,
    "boxWidth" DOUBLE PRECISION NOT NULL,
    "boxLength" DOUBLE PRECISION NOT NULL,
    "boxWeight" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_packaging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "carousel_banners_order_isActive_idx" ON "carousel_banners"("order", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_type_isAvailable_idx" ON "products"("type", "isAvailable");

-- CreateIndex
CREATE INDEX "products_slug_idx" ON "products"("slug");

-- AddForeignKey
ALTER TABLE "product_packaging" ADD CONSTRAINT "product_packaging_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
