import '../styles.css';

interface KpiTileProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export default function KpiTile({ label, value, subtext }: KpiTileProps) {
  return (
    <div className="kpi-tile">
      <p className="kpi-tile__label">{label}</p>
      <p className="kpi-tile__value">{value}</p>
      {subtext && <p className="kpi-tile__subtext">{subtext}</p>}
    </div>
  );
}
