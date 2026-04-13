export type TableDto = {
  id: number;
  name: string;
  capacity: number;
  placement: string;
};
export type CreateTableRequest = {
  name: string;
  capacity: number;
  placement: string;
};
export type UpdateTableRequest = {
  name: string;
  capacity: number;
  placement: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ett fel uppstod.");
  }

  return response.json();
}

export async function getAdminTables(): Promise<TableDto[]> {
  const response = await fetch("/api/admin/tables");
  return handleResponse<TableDto[]>(response);
}

export async function createAdminTable(
  data: CreateTableRequest
): Promise<TableDto> {
  const response = await fetch("/api/admin/tables", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Kunde inte skapa bord.");
  }

  return response.json();
}
export async function updateAdminTable(
  id: number,
  data: UpdateTableRequest
): Promise<TableDto> {
  const response = await fetch(`/api/admin/tables/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Kunde inte uppdatera bord.");
  }

  return response.json();
}
