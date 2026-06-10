"use client"

import { ImageUp, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form"

interface MultiImageUploadProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>
  name: Path<TFormValues>
  initialUrls?: string[]
}

const MultiImageUpload = <TFormValues extends FieldValues>({
  form,
  name,
  initialUrls = [],
}: MultiImageUploadProps<TFormValues>) => {
  const [previews, setPreviews] = useState<
    { id: string; url: string; file?: File }[]
  >(() => {
    return initialUrls.map((url, index) => ({
      id: `initial-${index}-${url}`,
      url,
    }))
  })

  useEffect(() => {
    const filesOrUrls = previews.map((p) => p.file || p.url)

    form.setValue(
      name,
      filesOrUrls as unknown as PathValue<TFormValues, Path<TFormValues>>,
      { shouldDirty: true, shouldValidate: true },
    )
  }, [previews, form, name])

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const filesArray = Array.from(files)
      const newPreviews = filesArray.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        file,
      }))
      setPreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleRemoveImage = (
    idToRemove: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setPreviews((prev) => {
      const item = prev.find((p) => p.id === idToRemove)
      if (item?.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url)
      }
      return prev.filter((p) => p.id !== idToRemove)
    })
  }

  const inputId = `file-upload-${name}`

  return (
    <div className="w-full space-y-4 bg-blue-200">
      <input
        type="file"
        accept="image/*"
        id={inputId}
        className="hidden"
        multiple
        onChange={handleImagesChange}
      />

      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 transition hover:bg-slate-50"
      >
        <ImageUp className="text-muted-foreground mb-3 h-10 w-10" />
        <span className="text-sm font-medium text-slate-600">
          Selecione as fotos do imóvel
        </span>
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 rounded-xl border bg-blue-200 p-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-white shadow-sm"
            >
              <Image
                src={preview.url}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={(e) => handleRemoveImage(preview.id, e)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-100 shadow transition group-hover:opacity-100 sm:opacity-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiImageUpload
