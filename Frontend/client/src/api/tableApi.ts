export type TableDto = {
  id: number;
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
