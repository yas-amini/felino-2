import { useEffect, useState } from "react";
import { updateAdminTable, type TableDto } from "../../../api/tableApi";

type EditTableProps = {
  table: TableDto;
  onClose: () => void;
  onUpdated: (updatedTable: TableDto) => void;
};

export default function EditTable({
  table,
  onClose,
  onUpdated,
}: EditTableProps) {
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    placement: "",
  });

  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setForm({
      name: table.name,
      capacity: String(table.capacity),
      placement: table.placement,
    });
  }, [table]);

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Fyll i ett namn för bordet.");
      return false;
    }

    if (!form.capacity || Number(form.capacity) <= 0) {
      setError("Ange en giltig kapacitet.");
      return false;
    }

    if (!form.placement) {
      setError("Välj en placering.");
      return false;
    }

    setError("");
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setError("");
    setIsUpdating(true);

    try {
      const updatedTable = await updateAdminTable(table.id, {
        name: form.name,
        capacity: Number(form.capacity),
        placement: form.placement,
      });

      onUpdated(updatedTable);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Kunde inte uppdatera bord.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="admin-edit-table-card">
      <h3>Redigera bord</h3>

      <div className="form-group">
        <label htmlFor="edit-table-name">Namn</label>
        <input
          id="edit-table-name"
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-table-capacity">Kapacitet</label>
        <input
          id="edit-table-capacity"
          type="number"
          min="1"
          value={form.capacity}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, capacity: e.target.value }))
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-table-placement">Placering</label>
        <select
          id="edit-table-placement"
          value={form.placement}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, placement: e.target.value }))
          }
        >
          <option value="">Välj placering</option>
          <option value="Indoor">Inomhus</option>
          <option value="Outdoor">Utomhus</option>
        </select>
      </div>

      {error && <p className="field-error">{error}</p>}

      <div className="table-card-actions">
        <button
          type="button"
          className="fpAdminBtn fpAdminBtn--secondary fpAdminBtn--md"
          onClick={onClose}
        >
          Avbryt
        </button>

        <button
          type="button"
          className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Sparar..." : "Spara ändringar"}
        </button>
      </div>
    </div>
  );
}
