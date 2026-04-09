import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../pages/admin/Booking/AdminBookingPage.css";
import {
    faUsers,
    faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAdminTables, type TableDto } from "../../../api/tableApi";

export default function BookingTables() {

    const [tables, setTables] = useState<TableDto[]>([]);
    const [isLoadingTables, setIsLoadingTables] = useState(true);
    const [tablesError, setTablesError] = useState("");

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
                    >
                        Lägg till bord
                    </button>
                }
            />

            {isLoadingTables && <p>Laddar bord...</p>}
            {tablesError && <p className="field-error">{tablesError}</p>}

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
                            >
                                Redigera
                            </button>
                            <button
                                type="button"
                                className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
                            >
                                Boka
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}