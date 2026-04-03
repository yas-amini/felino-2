import { useMemo, useState, useEffect } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminModal from "../../../components/admin/shared/AdminModal";
import "./AdminOrdersPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type OrderStatus = "new" | "preparing" | "ready" | "completed" | "canceled";

type OrderLine = {
  qty: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
  customerName: string;
  customerAddress?: string;
  customerPhone?: string;
  customerEmail?: string;
  delivery?: number;
  comment?: string;
  items: OrderLine[];
};

const STATUS_ORDER: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
  "canceled",
];

const LABELS: Record<OrderStatus, string> = {
  new: "Ny",
  preparing: "Tillagas",
  ready: "Klar",
  completed: "Avslutad",
  canceled: "Avbruten",
};

const ANCHORS: Record<OrderStatus, string> = {
  new: "ny",
  preparing: "tillagas",
  ready: "klar",
  completed: "avslutad",
  canceled: "avbruten",
};



function formatPrice(value: number) {
  return `${value.toFixed(2)} kr`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("sv-SE");
}

export default function AdminOrdersPage() {
  useAdminTopbar("Beställningar");

  const [orders, setOrders] = useState<Order[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Kunde inte hämta ordrar.");
      const data = await res.json();
      
      const mappedOrders: Order[] = data.map((o: any) => ({
        id: o.id,
        // Map backend enum string/value to frontend status
        status: o.status.toString().toLowerCase() === "cancelled" ? "canceled" : o.status.toString().toLowerCase(),
        total: o.total,
        createdAt: o.createdAt,
        customerName: o.customerName,
        customerAddress: o.customerAddress,
        customerPhone: o.customerPhone,
        customerEmail: o.customerEmail,
        items: o.items.map((it: any) => ({
          qty: it.quantity,
          name: it.productName,
          price: it.price
        }))
      }));
      
      setOrders(mappedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const groups = useMemo(() => {
    const result: Record<OrderStatus, Order[]> = {
      new: [],
      preparing: [],
      ready: [],
      completed: [],
      canceled: [],
    };

    for (const order of orders) {
      result[order.status].push(order);
    }

    for (const status of STATUS_ORDER) {
      result[status].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [orders]);

  function handleNextStatus(order: Order) {
    const currentIndex = STATUS_ORDER.indexOf(order.status);
    const next = STATUS_ORDER[currentIndex + 1];
    if (!next) return;
    updateOrderStatus(order.id, next);
  }

  async function updateOrderStatus(orderId: number, newStatus: OrderStatus) {
    try {
      // Map back to backend naming for Cancelled
      const backendStatus = newStatus === "canceled" ? "Cancelled" : newStatus;
      
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendStatus)
      });

      if (!res.ok) throw new Error("Kunde inte uppdatera status.");
      
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteConfirm() {
    if (deleteId == null) return;
    try {
      const res = await fetch(`/api/orders/${deleteId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Kunde inte ta bort order.");

      setOrders((prev) => prev.filter((o) => o.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  }

  function onDragStart(orderId: number) {
    setDraggedId(orderId);
  }

  function onDropColumn(status: OrderStatus) {
    if (draggedId == null) return;
    updateOrderStatus(draggedId, status);
    setDraggedId(null);
  }

  return (
    <AdminPage noCard>
      <section className="admin-settings" data-scope="orders">
        <div className="orders-board" aria-label="Kanban för beställningar">
          {STATUS_ORDER.map((status) => {
            const list = groups[status];
            return (
              <section
                key={status}
                className="orders-col"
                id={`orders-${ANCHORS[status]}`}
                data-status={status}
                aria-labelledby={`col-title-${status}`}
              >
                <header className="orders-col__head">
                  <h2 id={`col-title-${status}`} className="orders-col__title">
                    {LABELS[status]}
                  </h2>
                  <span className="orders-col__count">{list.length}</span>
                </header>

                <ul
                  className="orders-col__list"
                  data-dropzone={status}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropColumn(status)}
                >
                  {list.length === 0 ? (
                    <li className="orders-empty">Inga ordrar.</li>
                  ) : null}

                  {list.map((order) => {
                    const currentIndex = STATUS_ORDER.indexOf(order.status);
                    const nextStatus = STATUS_ORDER[currentIndex + 1];

                    return (
                      <li
                        key={order.id}
                        className="order-card"
                        id={`order-${order.id}`}
                        data-order-id={order.id}
                        data-status={order.status}
                        data-created={order.createdAt}
                        draggable
                        onDragStart={() => onDragStart(order.id)}
                        onDragEnd={() => setDraggedId(null)}
                      >
                        <div className="order-card__head">
                          <div className="order-id">#{order.id}</div>
                          <div className="order-total">
                            {formatPrice(order.total)}
                          </div>
                        </div>

                        <div className="order-card__meta">
                          <div className="order-customer">
                            {order.customerName}
                          </div>
                          <div className="order-created">
                            {formatDate(order.createdAt)}
                          </div>
                        </div>

                        <ul className="order-lines">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.qty} × {item.name}{" "}
                              <span className="muted">
                                (à {formatPrice(item.price)})
                              </span>
                            </li>
                          ))}

                          {(order.delivery ?? 0) > 0 ? (
                            <li>
                              Leveransavgift{" "}
                              <span className="muted">
                                {formatPrice(order.delivery ?? 0)}
                              </span>
                            </li>
                          ) : null}

                          {order.comment ? <li>Kommentar: {order.comment}</li> : null}
                        </ul>

                        <div className="order-customer-info">
                          Kundinfo:
                          {order.customerAddress ? (
                            <div className="detail-row">
                              <span>{order.customerAddress}</span>
                            </div>
                          ) : null}

                          {order.customerPhone ? (
                            <div className="detail-row">
                              <span>{order.customerPhone}</span>
                            </div>
                          ) : null}

                          {order.customerEmail ? (
                            <div className="detail-row">
                              <span>{order.customerEmail}</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="order-card__actions">
                          <label className="sr-only" htmlFor={`status-${order.id}`}>
                            Status
                          </label>

                          <select
                            id={`status-${order.id}`}
                            className="in select"
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                          >
                            {STATUS_ORDER.map((opt) => (
                              <option key={opt} value={opt}>
                                {LABELS[opt]}
                              </option>
                            ))}
                          </select>

                          {nextStatus ? (
                            <AdminButton
                              size="sm"
                              type="button"
                              variant="ghost"
                              aria-label={`Markera som ${LABELS[nextStatus]}`}
                              title={`Markera som ${LABELS[nextStatus]}`}
                              onClick={() => handleNextStatus(order)}
                            >
                              <FontAwesomeIcon icon={faArrowRight} />
                            </AdminButton>
                          ) : null}

                          <AdminButton
                            preset="delete"
                            size="sm"
                            type="button"
                            aria-label="Ta bort"
                            title="Ta bort"
                            onClick={() => setDeleteId(order.id)}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <AdminModal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          title="Ta bort beställning"
        >
          <p>Är du säker på att du vill ta bort beställningen?</p>

          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <AdminButton
              variant="cancel"
              type="button"
              onClick={() => setDeleteId(null)}
            >
              Avbryt
            </AdminButton>

            <AdminButton
              variant="danger"
              type="button"
              onClick={handleDeleteConfirm}
            >
              Ta bort
            </AdminButton>
          </div>
        </AdminModal>
      </section>
    </AdminPage>
  );
}