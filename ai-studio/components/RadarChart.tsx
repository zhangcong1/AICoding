export function RadarChart({
  data,
  size = 220,
  color = "#7c5cff",
}: {
  data: { label: string; value: number }[];
  size?: number;
  color?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 34;
  const n = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (i: number, radius: number) => {
    const a = angle(i);
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  };

  const rings = [0.25, 0.5, 0.75, 1];

  const valuePoints = data
    .map((d, i) => point(i, (d.value / 100) * r).join(","))
    .join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 网格环 */}
      {rings.map((ring, ri) => (
        <polygon
          key={ri}
          points={data.map((_, i) => point(i, r * ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(148,163,184,0.25)"
          strokeWidth="1"
        />
      ))}
      {/* 轴线 */}
      {data.map((_, i) => {
        const [x, y] = point(i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(148,163,184,0.2)" />;
      })}
      {/* 数值多边形 */}
      <polygon points={valuePoints} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2" />
      {data.map((d, i) => {
        const [x, y] = point(i, (d.value / 100) * r);
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
      {/* 标签 */}
      {data.map((d, i) => {
        const [x, y] = point(i, r + 16);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#94a3b8"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
