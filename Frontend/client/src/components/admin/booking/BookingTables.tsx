import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../pages/admin/Booking/AdminBookingPage.css";
import {
    faUsers,
    faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAdminTables, type TableDto } from "../../../api/tableApi";
import CreateTable from "./CreateTable";
import EditTable from "./EditTable";

export default function BookingTables() {

    const [tables, setTables] = useState<TableDto[]>([]);
    const [isLoadingTables, setIsLoadingTables] = useState(true);
    const [tablesError, setTablesError] = useState("");
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [editingTable, setEditingTable] = useState<TableDto | null>(null);

    useEffect(() => {
        const loadTables = async () => {
            setIsLoadingTables(true);
            setTablesError("");

            try {
                const result = await getAdminTables();
                setTables(result);
            } catch (error) {
                if (error instanceof Error) {
                    setTablesError(error.message);
                } else {
                    setTablesError("Kunde inte hämta borden.");
                }
            } finally {
                setIsLoadingTables(false);
            }
        };

        loadTables();
    }, []);

    return (
        <section className="tables-section">
            <AdminSectionHead
                level={2}
                title="Bord & kapacitet"
                description="Hantera restaurangens bord, placeringar och tillgänglighet."
                actions={
                    <button
                        type="button"
                        className="fpAdminBtn fpAdminBtn--primary"
                        onClick={() => setIsCreateFormOpen(true)}
                    >
                        Lägg till bord
                    </button>
                }
            />
            {isCreateFormOpen && (
                <CreateTable
                    onClose={() => setIsCreateFormOpen(false)}
                    onCreated={(createdTable) =>
                        setTables((prev) => [...prev, createdTable])
                    }
                />
            )}
            {isLoadingTables && <p>Laddar bord...</p>}
            {tablesError && <p className="field-error">{tablesError}</p>}

            {editingTable && (
                <EditTable
                    table={editingTable}
                    onClose={() => setEditingTable(null)}
                    onUpdated={(updatedTable) => {
                        setTables((prev) =>
                            prev.map((table) =>
                                table.id === updatedTable.id ? updatedTable : table
                            )
                        );
                        setEditingTable(null);
                    }}
                />
            )}

            <div className="tables-grid">
                {tables.map((table) => (
                    <div className="table-card" key={table.id}>
                        <div className="table-card-top">
                            <h4>{table.name}</h4>
                            <span className="table-status available">
                                ✓ Aktivt
                            </span>
                        </div>

                        <div className="table-meta">
                            <p>
                                <FontAwesomeIcon icon={faUsers} /> Kapacitet: {table.capacity} personer
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faMapPin} />{" "}
                                {table.placement === "Outdoor" ? "Utomhus" : "Inomhus"}
                            </p>
                        </div>

                        <div className="table-card-actions">
                            <button
                                type="button"
                                className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
                                onClick={() => setEditingTable(table)}
                            >
                                Redigera
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}