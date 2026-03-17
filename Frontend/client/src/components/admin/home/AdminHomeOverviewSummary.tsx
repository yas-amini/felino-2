import "./AdminHomeOverviewSummary.css";

export default function AdminHomeOverviewSummary() {
  return (
    <div className="admin-home-summary">
      <div className="admin-home-summary-left">
        <div className="admin-home-summary-stat">
          <span className="admin-home-summary-label">Dagens försäljning</span>
          <strong className="admin-home-summary-value">12 480 kr</strong>
        </div>

        <div className="admin-home-summary-stat">
          <span className="admin-home-summary-label">Antal beställningar</span>
          <strong className="admin-home-summary-value">18</strong>
        </div>

        <div className="admin-home-summary-stat">
          <span className="admin-home-summary-label">Snittorder</span>
          <strong className="admin-home-summary-value">693 kr</strong>
        </div>
      </div>

      <div className="admin-analytics-card">
        <div className="admin-analytics-card__head">
          <h3>Försäljning per dag</h3>
          <p>Staplar = ordrar, linje = omsättning</p>
        </div>

        <div className="admin-mixed-chart" aria-hidden="true">
          <div className="admin-mixed-chart__y admin-mixed-chart__y--left">
            <span>3k</span>
            <span>2k</span>
            <span>1k</span>
            <span>0</span>
          </div>

          <div className="admin-mixed-chart__main">
            <div className="admin-mixed-chart__grid">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="admin-mixed-chart__plot">
              <div className="admin-mixed-chart__bars">
                <div className="bar-group">
                  <span className="bar" style={{ height: "42%" }} />
                  <small>Mån</small>
                </div>

                <div className="bar-group">
                  <span className="bar" style={{ height: "42%" }} />
                  <small>Tis</small>
                </div>

                <div className="bar-group">
                  <span className="bar" style={{ height: "34%" }} />
                  <small>Ons</small>
                </div>

                <div className="bar-group">
                  <span className="bar" style={{ height: "78%" }} />
                  <small>Tors</small>
                </div>

                <div className="bar-group">
                  <span className="bar" style={{ height: "46%" }} />
                  <small>Fre</small>
                </div>

                <div className="bar-group">
                  <span className="bar" style={{ height: "18%" }} />
                  <small>Lör</small>
                </div>
              </div>

              <svg
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
                className="admin-mixed-chart__line"
              >
                <path
                  d="M30,130
                     L130,130
                     L230,55
                     L330,55
                     L430,55
                     L530,170"
                  fill="none"
                  stroke="#7fcfc5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="30" cy="130" r="5" fill="#7fcfc5" />
                <circle cx="130" cy="130" r="5" fill="#7fcfc5" />
                <circle cx="230" cy="55" r="5" fill="#7fcfc5" />
                <circle cx="330" cy="55" r="5" fill="#7fcfc5" />
                <circle cx="430" cy="55" r="5" fill="#7fcfc5" />
                <circle cx="530" cy="170" r="5" fill="#7fcfc5" />
              </svg>
            </div>
          </div>

          <div className="admin-mixed-chart__y admin-mixed-chart__y--right">
            <span>3k</span>
            <span>2k</span>
            <span>1k</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}