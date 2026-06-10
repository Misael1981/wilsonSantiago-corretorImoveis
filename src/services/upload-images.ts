import imageCompression from "browser-image-compression"

export const uploadToCloudinaryClient = async (file: File) => {
  const options = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(file, options)
    const formData = new FormData()
    formData.append("file", compressedFile)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    )

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    )

    const data = await response.json()
    return {
      url: data.secure_url,
      publicId: data.public_id,
    }
  } catch (error) {
    console.error("Erro no upload individual:", error)
    throw error
  }
}

export const uploadMultipleImages = async (items: (File | string)[]) => {
  try {
    const existingUrls = items.filter(
      (item): item is string => typeof item === "string",
    )

    const newFiles = items.filter((item): item is File => item instanceof File)

    const uploadPromises = newFiles.map((file) =>
      uploadToCloudinaryClient(file),
    )
    const uploadedImagesResults = await Promise.all(uploadPromises)

    const newUrls = uploadedImagesResults.map((img) => img.url)

    return [...existingUrls, ...newUrls]
  } catch (error) {
    console.error("Erro no upload em lote das imagens:", error)
    throw new Error("Falha ao processar e enviar as imagens do imóvel.")
  }
}
