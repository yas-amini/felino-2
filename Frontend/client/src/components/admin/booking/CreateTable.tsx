import { useState } from "react";
import { createAdminTable } from "../../../api/tableApi";
import type { TableDto } from "../../../api/tableApi";

type CreateTableProps = {
    onClose: () => void;
    onCreated: (table: TableDto) => void;
};

export default function CreateTable({ onClose, onCreated }: CreateTableProps) {
    const initialTableForm = {
        name: "",
        capacity: "",
        placement: "",
    };

    const [tableForm, setTableForm] = useState(initialTableForm);
    const [tableFormError, setTableFormError] = useState("");
    const [isCreatingTable, setIsCreatingTable] = useState(false);

    const validateCreateTableForm = () => {
        if (!tableForm.name.trim()) {
            setTableFormError("Fyll i ett namn för bordet.");
            return false;
        }

        if (!tableForm.capacity || Number(tableForm.capacity) <= 0) {
            setTableFormError("Ange en giltig kapacitet.");
            return false;
        }

        if (!tableForm.placement) {
            setTableFormError("Välj en placering.");
            return false;
        }

        setTableFormError("");
        return true;
    };

    const handleCreateTable = async () => {
        if (!validateCreateTableForm()) return;

        setTableFormError("");
        setIsCreatingTable(true);

        try {
            const createdTable = await createAdminTable({
                name: tableForm.name,
                capacity: Number(tableForm.capacity),
                placement: tableForm.placement,
            });

            onCreated(createdTable);
            setTableForm(initialTableForm);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setTableFormError(error.message);
            } else {
                setTableFormError("Kunde inte skapa bord.");
            }
        } finally {
            setIsCreatingTable(false);
        }
    };

    return (
        <div className="create-table">
            <div className="admin-create-table-card">
                <h3>Lägg till bord</h3>

                <div className="form-group">
                    <label htmlFor="table-name">Namn</label>
                    <input
                        id="table-name"
                        type="text"
                        value={tableForm.name}
                        onChange={(e) =>
                            setTableForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="table-capacity">Kapacitet</label>
                    <input
                        id="table-capacity"
                        type="number"
                        min="1"
                        value={tableForm.capacity}
                        onChange={(e) =>
                            setTableForm((prev) => ({ ...prev, capacity: e.target.value }))
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="table-placement">Placering</label>
                    <select
                        id="table-placement"
                        value={tableForm.placement}
                        onChange={(e) =>
                            setTableForm((prev) => ({ ...prev, placement: e.target.value }))
                        }
                    >
                        <option value="">Välj placering</option>
                        <option value="Indoor">Inomhus</option>
                        <option value="Outdoor">Utomhus</option>
                    </select>
                </div>

                {tableFormError && <p className="field-error">{tableFormError}</p>}

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
                        onClick={handleCreateTable}
                        disabled={isCreatingTable}
                    >
                        {isCreatingTable ? "Sparar..." : "Spara bord"}
                    </button>
                </div>
            </div>
        </div>
    );
}