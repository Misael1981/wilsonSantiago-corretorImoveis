// src/helpers/db-property-to-form-values.ts
import type { getPropertiesById } from "@/data/get-properties-by-id"
import { PropertyFormValues } from "@/schemas/property-schema"

type DbProperty = NonNullable<Awaited<ReturnType<typeof getPropertiesById>>>

export function dbPropertyToFormValues(
  property: DbProperty,
): PropertyFormValues {
  return {
    title: property.title,
    slug: property.slug,
    codRef: property.codRef,
    description: property.description ?? "",

    price: Number(property.price),
    area: property.area != null ? Number(property.area) : 0,

    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    garageSpaces: property.garageSpaces,

    featured: property.featured,
    type: property.type,
    status: property.status,

    street: property.street ?? "",
    number: property.number ?? "",
    complement: property.complement ?? "",
    neighborhood: property.neighborhood,
    city: property.city,
    state: property.state,

    imageUrls: property.imageUrls ?? [],

    youtubeUrl: property.youtubeUrl ?? "",
    videoFeatured: property.videoFeatured,
  }
}
