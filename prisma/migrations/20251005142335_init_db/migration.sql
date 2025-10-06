-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('CASA', 'APARTAMENTO', 'TERRENO', 'LOJA', 'CHACARA', 'SITIO', 'GALPAO', 'SALA_COMERCIAL');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'INACTIVE', 'RESERVED');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('GENERAL', 'PROPERTY_INQUIRY', 'VALUATION', 'PARTNERSHIP', 'COMPLAINT');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ConfigType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'JSON', 'URL', 'EMAIL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "garageSpaces" INTEGER NOT NULL DEFAULT 0,
    "type" "PropertyType" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "imageUrls" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "readTime" INTEGER,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_tags" (
    "articleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "article_tags_pkey" PRIMARY KEY ("articleId","tagId")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "testimonial" TEXT NOT NULL,
    "photo" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "occupation" TEXT,
    "location" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "type" "ContactType" NOT NULL DEFAULT 'GENERAL',
    "status" "ContactStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "propertyId" TEXT,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "type" "ConfigType" NOT NULL DEFAULT 'TEXT',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_type_status_idx" ON "properties"("type", "status");

-- CreateIndex
CREATE INDEX "properties_city_neighborhood_idx" ON "properties"("city", "neighborhood");

-- CreateIndex
CREATE INDEX "properties_price_idx" ON "properties"("price");

-- CreateIndex
CREATE INDEX "properties_featured_createdAt_idx" ON "properties"("featured", "createdAt");

-- CreateIndex
CREATE INDEX "properties_slug_idx" ON "properties"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_published_publishedAt_idx" ON "articles"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "articles_featured_publishedAt_idx" ON "articles"("featured", "publishedAt");

-- CreateIndex
CREATE INDEX "articles_slug_idx" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_authorId_idx" ON "articles"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "customers_isActive_order_idx" ON "customers"("isActive", "order");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_propertyId_key" ON "favorites"("userId", "propertyId");

-- CreateIndex
CREATE INDEX "contacts_status_createdAt_idx" ON "contacts"("status", "createdAt");

-- CreateIndex
CREATE INDEX "contacts_type_idx" ON "contacts"("type");

-- CreateIndex
CREATE UNIQUE INDEX "site_config_key_key" ON "site_config"("key");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
