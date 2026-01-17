interface KpiTileProps {
  label: string;
  value: number | string;
  subtext?: string;
}

export default function KpiTile({ label, value, subtext }: KpiTileProps) {
  return (
    <section
      aria-label={label}
      className="rounded-md border border-border bg-surface px-container-x py-container-y flex flex-col"
    >
      <p className="text-sm font-medium text-muted mb-1 m-0">
        {label}
      </p>

      <p className="text-2xl font-semibold text-text m-0">
        {value}
      </p>

      {subtext && (
        <p className="mt-1 text-sm text-muted m-0">
          {subtext}
        </p>
      )}
    </section>
  );
}
