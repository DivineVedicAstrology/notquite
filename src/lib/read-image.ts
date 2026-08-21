const MAX_EDGE = 1920;
const MAX_BYTES = 2_400_000;

export async function fileToStill(file: File): Promise<{
  mime: "image/jpeg" | "image/png" | "image/webp";
  data: string;
  preview: string;
}> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not read that image.");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let quality = 0.88;
    let dataUrl = canvas.toDataURL("image/jpeg", quality);
    while (dataUrl.length > MAX_BYTES * 1.37 && quality > 0.55) {
      quality -= 0.08;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
    }
    const data = dataUrl.split(",")[1] ?? "";
    if (!data) throw new Error("Could not read that image.");
    return { mime: "image/jpeg", data, preview: dataUrl };
  } catch (err) {
    if (err instanceof Error && err.message !== "Could not read that image.") {
      throw err;
    }
    throw new Error("Could not read that image.");
  }
}
