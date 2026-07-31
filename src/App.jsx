import React, { useMemo, useState } from "react";

// Lógica tomada de la hoja "Simulador _Segmento"
// del archivo Simulador_no clientes GNV.Vs.Segmento.xlsx.

const TEA_TABLE = [
  { monto: 500, tea: 96.99 },
  { monto: 1000, tea: 96.99 },
  { monto: 1100, tea: 96.99 },
  { monto: 1200, tea: 96.99 },
  { monto: 1300, tea: 96.99 },
  { monto: 1400, tea: 96.99 },
  { monto: 1500, tea: 96.99 },
  { monto: 1600, tea: 96.99 },
  { monto: 1700, tea: 96.99 },
  { monto: 1800, tea: 96.99 },
  { monto: 1900, tea: 96.99 },
  { monto: 2000, tea: 95.99 },
  { monto: 2100, tea: 95.99 },
  { monto: 2200, tea: 95.99 },
  { monto: 2300, tea: 95.99 },
  { monto: 2400, tea: 95.99 },
  { monto: 2500, tea: 95.99 },
  { monto: 2600, tea: 95.99 },
  { monto: 2700, tea: 95.99 },
  { monto: 2800, tea: 95.99 },
  { monto: 2900, tea: 95.99 },
  { monto: 3000, tea: 93.99 },
  { monto: 3100, tea: 93.99 },
  { monto: 3200, tea: 93.99 },
  { monto: 3300, tea: 93.99 },
  { monto: 3400, tea: 93.99 },
  { monto: 3500, tea: 93.99 },
  { monto: 3600, tea: 93.99 },
  { monto: 3700, tea: 93.99 },
  { monto: 3800, tea: 93.99 },
  { monto: 3900, tea: 93.99 },
  { monto: 4000, tea: 92.99 },
  { monto: 4100, tea: 92.99 },
  { monto: 4200, tea: 92.99 },
  { monto: 4300, tea: 92.99 },
  { monto: 4400, tea: 92.99 },
  { monto: 4500, tea: 92.99 },
  { monto: 4600, tea: 92.99 },
  { monto: 4700, tea: 92.99 },
  { monto: 4800, tea: 92.99 },
  { monto: 4900, tea: 92.99 },
  { monto: 5000, tea: 92.99 },
  { monto: 5100, tea: 92.99 },
  { monto: 5200, tea: 92.99 },
  { monto: 5300, tea: 92.99 },
  { monto: 5400, tea: 92.99 },
  { monto: 5500, tea: 92.99 },
  { monto: 5600, tea: 92.99 },
  { monto: 5700, tea: 92.99 },
  { monto: 5800, tea: 92.99 },
  { monto: 5900, tea: 92.99 },
  { monto: 6000, tea: 92.99 },
  { monto: 6100, tea: 92.99 },
  { monto: 6200, tea: 92.99 },
  { monto: 6300, tea: 92.99 },
  { monto: 6400, tea: 92.99 },
  { monto: 6500, tea: 92.99 },
  { monto: 6600, tea: 92.99 },
  { monto: 6700, tea: 92.99 },
  { monto: 6800, tea: 92.99 },
  { monto: 6900, tea: 92.99 },
  { monto: 7000, tea: 92.99 },
];

// La columna AG es el umbral de cuota y la columna AH es el factor retornado.
const FACTOR_TABLES = {
  VIP: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 280, factor: 0.55 },
    { cuotaMin: 308, factor: 0.6 },
    { cuotaMin: 336, factor: 0.65 },
    { cuotaMin: 364, factor: 0.7 },
    { cuotaMin: 392, factor: 0.75 },
    { cuotaMin: 420, factor: 0.8 },
    { cuotaMin: 448, factor: 0.85 },
    { cuotaMin: 476, factor: ">85%" },
  ],
  PREFERENTE: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 280, factor: 0.55 },
    { cuotaMin: 308, factor: 0.6 },
    { cuotaMin: 336, factor: 0.65 },
    { cuotaMin: 364, factor: 0.7 },
    { cuotaMin: 392, factor: 0.75 },
    { cuotaMin: 420, factor: 0.8 },
    { cuotaMin: 448, factor: 0.85 },
    { cuotaMin: 476, factor: ">85%" },
  ],
  NORMAL: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 280, factor: 0.55 },
    { cuotaMin: 308, factor: 0.6 },
    { cuotaMin: 336, factor: 0.65 },
    { cuotaMin: 364, factor: 0.7 },
    { cuotaMin: 392, factor: 0.75 },
    { cuotaMin: 420, factor: 0.8 },
    { cuotaMin: 448, factor: 0.85 },
    { cuotaMin: 476, factor: ">85%" },
  ],
  EVALUACION: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 160, factor: 0.55 },
    { cuotaMin: 176, factor: 0.6 },
    { cuotaMin: 192, factor: 0.65 },
    { cuotaMin: 208, factor: ">65%" },
    { cuotaMin: 224, factor: ">65%" },
    { cuotaMin: 240, factor: ">65%" },
    { cuotaMin: 256, factor: ">65%" },
    { cuotaMin: 272, factor: ">65%" },
  ],
  INCLUSION: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 160, factor: 0.55 },
    { cuotaMin: 176, factor: 0.6 },
    { cuotaMin: 192, factor: 0.65 },
    { cuotaMin: 208, factor: 0.7 },
    { cuotaMin: 224, factor: 0.75 },
    { cuotaMin: 240, factor: 0.8 },
    { cuotaMin: 256, factor: 0.85 },
    { cuotaMin: 272, factor: ">85%" },
  ],
  NA: [
    { cuotaMin: 0, factor: 0.5 },
    { cuotaMin: 125, factor: ">50%" },
  ],
};

const SEGMENT_RULES = {
  VIP: { maxFactor: 0.85, maxLabel: "85%" },
  PREFERENTE: { maxFactor: 0.85, maxLabel: "85%" },
  NORMAL: { maxFactor: 0.85, maxLabel: "85%" },
  INCLUSION: { maxFactor: 0.85, maxLabel: "85%" },
  EVALUACION: { maxFactor: 0.65, maxLabel: "65%" },
  NA: { maxFactor: 0.5, maxLabel: "50%" },
};

const LIMITS = {
  montoMin: 500,
  montoMax: 7000,
  plazoMin: 1,
  plazoMax: 60,
};

function vlookupApprox(x, rows, key) {
  let best = rows[0];
  for (const row of rows) {
    if (row[key] <= x) best = row;
    else break;
  }
  return best;
}

function teaFromTotal(total) {
  return vlookupApprox(total, TEA_TABLE, "monto").tea;
}

function monthlyRateFromTEA(teaPercent) {
  return Math.pow(1 + teaPercent / 100, 1 / 12) - 1;
}

function pmt(rate, nper, pv) {
  if (!Number.isFinite(rate) || !Number.isFinite(nper) || !Number.isFinite(pv) || nper <= 0) {
    return NaN;
  }
  if (rate === 0) return pv / nper;
  const factor = Math.pow(1 + rate, nper);
  return (rate * pv * factor) / (factor - 1);
}

function factorFromCuota(segmento, cuota) {
  const table = FACTOR_TABLES[segmento] ?? FACTOR_TABLES.NORMAL;
  return vlookupApprox(cuota, table, "cuotaMin").factor;
}

function formatPEN(value) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatFactor(value) {
  if (typeof value === "string") return value;
  if (!Number.isFinite(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export default function App() {
  const [segmento, setSegmento] = useState("INCLUSION");
  const [marcaVehiculo, setMarcaVehiculo] = useState("No chino");
  const [plazo, setPlazo] = useState(12);
  const [solicitado, setSolicitado] = useState(2000);
  const [seguroObliga, setSeguroObliga] = useState("Vida Integral");
  const [seguroVol, setSeguroVol] = useState("Solidario");

  const calc = useMemo(() => {
    const costoObliga = seguroObliga === "Vida Integral" ? solicitado * 0.1 : 0;

    let costoVol = 0;
    if (seguroVol === "Solidario") costoVol = plazo * 8;
    else if (seguroVol === "Ruta") costoVol = 60;
    else if (seguroVol === "Solidario + Ruta") costoVol = plazo * 8 + 60;

    const total = solicitado + costoObliga + costoVol;
    const tea = teaFromTotal(total);
    const tasaMensual = monthlyRateFromTEA(tea);
    const cuota = pmt(tasaMensual, plazo, total);
    const factor = factorFromCuota(segmento, cuota);
    const rule = SEGMENT_RULES[segmento];
    const alerta = typeof factor === "string";

    return {
      costoObliga,
      costoVol,
      total,
      tea,
      tasaMensual,
      cuota,
      factor,
      alerta,
      limiteFactor: rule.maxLabel,
    };
  }, [segmento, plazo, solicitado, seguroObliga, seguroVol]);

  const inputStyle = { width: "100%", padding: 9, marginTop: 6 };
  const labelStyle = { display: "block", marginTop: 12 };
  const panelStyle = { border: "1px solid #ddd", borderRadius: 12, padding: 18 };

  return (
    <div style={{ fontFamily: "system-ui", padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Simulador GNV - Clientes Nuevos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        <div style={panelStyle}>
          <h3>Entradas</h3>

          <label style={labelStyle}>
            Segmento
            <select value={segmento} onChange={(e) => setSegmento(e.target.value)} style={inputStyle}>
              <option value="VIP">VIP</option>
              <option value="PREFERENTE">PREFERENTE</option>
              <option value="NORMAL">NORMAL</option>
              <option value="INCLUSION">INCLUSION</option>
              <option value="EVALUACION">EVALUACION</option>
              <option value="NA">NA</option>
            </select>
          </label>

          <label style={labelStyle}>
            Marca del vehículo
            <select
              value={marcaVehiculo}
              onChange={(e) => setMarcaVehiculo(e.target.value)}
              style={inputStyle}
            >
              <option value="Chino">Chino</option>
              <option value="No chino">No chino</option>
            </select>
          </label>

          <label style={labelStyle}>
            Plazo (meses)
            <input
              type="number"
              min={LIMITS.plazoMin}
              max={LIMITS.plazoMax}
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              onBlur={() => setPlazo(clamp(plazo, LIMITS.plazoMin, LIMITS.plazoMax))}
              style={inputStyle}
            />
            <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
              Mín: {LIMITS.plazoMin} | Máx: {LIMITS.plazoMax}
            </div>
          </label>

          <label style={labelStyle}>
            Monto solicitado (S/)
            <input
              type="number"
              min={LIMITS.montoMin}
              max={LIMITS.montoMax}
              step={50}
              value={solicitado}
              onChange={(e) => setSolicitado(Number(e.target.value))}
              onBlur={() => setSolicitado(clamp(solicitado, LIMITS.montoMin, LIMITS.montoMax))}
              style={inputStyle}
            />
            <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
              Mín: {LIMITS.montoMin} | Máx: {LIMITS.montoMax}
            </div>
          </label>

          <label style={labelStyle}>
            Seguro obligatorio
            <select value={seguroObliga} onChange={(e) => setSeguroObliga(e.target.value)} style={inputStyle}>
              <option value="Vida Integral">Vida Integral</option>
              <option value="Ninguno">Ninguno</option>
            </select>
          </label>

          <label style={labelStyle}>
            Seguro voluntario
            <select value={seguroVol} onChange={(e) => setSeguroVol(e.target.value)} style={inputStyle}>
              <option value="Solidario">Solidario</option>
              <option value="Ruta">Ruta</option>
              <option value="Solidario + Ruta">Solidario + Ruta</option>
              <option value="Ninguno">Ninguno</option>
            </select>
          </label>
        </div>

        <div style={panelStyle}>
          <h3>Resultados</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10 }}>
            <div>
              <div>Cuota</div>
              <b>{formatPEN(calc.cuota)}</b>
            </div>
            <div>
              <div>Factor</div>
              <b>{formatFactor(calc.factor)}</b>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 14, color: "#444" }}>
            Segmento: <b>{segmento}</b><br />
            Marca: <b>{marcaVehiculo}</b><br />
            Límite permitido: <b>{calc.limiteFactor}</b>
          </div>

          {calc.alerta && (
            <div
              role="alert"
              style={{
                marginTop: 18,
                padding: 14,
                borderRadius: 12,
                border: "1px solid #cc0000",
                background: "#fff1f1",
                color: "#b00000",
                fontWeight: 700,
              }}
            >
              Alerta: El factor de cuota de recaudo supera el {calc.limiteFactor} permitido para el segmento {segmento}. No cumple factor.
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: "#555" }}>
        Los costos de seguros, el total financiado, la TEA y la tasa mensual se utilizan en el cálculo, pero no se muestran.
      </div>
    </div>
  );
}
