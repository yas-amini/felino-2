import { fetchWithAuth } from "./fetchWithAuth";

export type UploadResponse = {
  fileName: string;
  url: string;
};

async function parseUploadResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Kunde inte ladda upp bild.";

    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // ignore
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetchWithAuth("/api/uploads/image", {
    method: "POST",
    body: formData,
  });

  return parseUploadResponse<UploadResponse>(response);
}