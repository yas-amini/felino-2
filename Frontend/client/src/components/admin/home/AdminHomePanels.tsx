import "./AdminHomePanels.css";

export default function AdminHomePanels() {
  return (
    <div className="admin-home-panels">
      <div className="admin-home-panel">
        <h3>Beställningar</h3>
        <p>2 nya, 1 tillagas, 1 klar för upphämtning.</p>
      </div>

      <div className="admin-home-panel">
        <h3>Bord</h3>
        <p>Första bokningen 17:30. Flera sällskap ikväll.</p>
      </div>

      <div className="admin-home-panel">
        <h3>Kök</h3>
        <p>Normal belastning just nu. Ingen varning.</p>
      </div>
    </div>
  );
}