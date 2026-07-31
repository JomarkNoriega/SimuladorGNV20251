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


const VEHICLE_BRAND_GROUP = {
  "PEUGEOT": "Grupo 1",
  "VOLVO": "Grupo 1",
  "MAZDA": "Grupo 1",
  "ISUZU": "Grupo 1",
  "LIFAN": "Grupo 2",
  "SHINERAY": "Grupo 2",
  "JAC": "Grupo 2",
  "HYUNDAI": "Grupo 1",
  "HONDA": "Grupo 1",
  "SSANGYONG": "Grupo 1",
  "NISSAN": "Grupo 1",
  "ZXAUTO": "Grupo 2",
  "SUZUKI": "Grupo 1",
  "FORD": "Grupo 1",
  "TOYOTA": "Grupo 1",
  "CHANGAN": "Grupo 2",
  "VOLKSWAGEN": "Grupo 1",
  "DAIHATSU": "Grupo 1",
  "FIAT": "Grupo 1",
  "CHERY": "Grupo 2",
  "MITSUBISHI": "Grupo 1",
  "CITROEN": "Grupo 1",
  "KIA": "Grupo 1",
  "PUMA TAT": "Grupo 1",
  "SOUEAST": "Grupo 2",
  "DFSK": "Grupo 2",
  "SMA": "Grupo 2",
  "FAW": "Grupo 2",
  "TIANJIN FAW": "Grupo 2",
  "DODGE": "Grupo 1",
  "RENAULT": "Grupo 1",
  "IVECO": "Grupo 1",
  "CHANGHE": "Grupo 2",
  "JEEP": "Grupo 1",
  "CHEVROLET": "Grupo 1",
  "DAEWOO": "Grupo 1",
  "GEELY": "Grupo 2",
  "GREAT WALL": "Grupo 2",
  "SEM": "Grupo 2",
  "DONGFENG": "Grupo 2",
  "YEMA AUTO": "Grupo 2",
  "BYD": "Grupo 2",
  "SKODA": "Grupo 1",
  "HAIMA": "Grupo 2",
  "WUZHOULONG": "Grupo 2",
  "XINKAI": "Grupo 2",
  "KEYTON": "Grupo 2",
  "JUPITER T6": "Grupo 1",
  "SUBARU": "Grupo 1",
  "BRILLIANCE": "Grupo 2",
  "HAVAL": "Grupo 2",
  "ZOTYE": "Grupo 2",
  "GONOW": "Grupo 2",
  "YAXING": "Grupo 2",
  "HAFEI": "Grupo 2",
  "LANDWIND": "Grupo 2",
  "KARRY": "Grupo 2",
  "KING LONG": "Grupo 2",
  "HIGER": "Grupo 2",
  "CHANGFENG": "Grupo 2",
  "GOLDEN DRAGON": "Grupo 2",
  "PONTIAC": "Grupo 1",
  "DATSUN": "Grupo 1",
  "CHENGLONG": "Grupo 2",
  "MG": "Grupo 2",
  "FOTON": "Grupo 2",
  "HILLMAN": "Grupo 1",
  "DIM": "Grupo 1",
  "MODASA": "Grupo 1",
  "KYC": "Grupo 2",
  "YUEJIN": "Grupo 2",
  "ZNA": "Grupo 2",
  "CADILLAC": "Grupo 1",
  "CHANGE": "Grupo 2",
  "CHRYSLER": "Grupo 1",
  "ENRANGER": "Grupo 2",
  "JETOUR": "Grupo 2",
  "JINBEI": "Grupo 2",
  "JOYLONG": "Grupo 2",
  "KENBO": "Grupo 2",
  "LADA": "Grupo 1",
  "LAND ROVER": "Grupo 1",
  "LEXUS": "Grupo 1",
  "MERCEDES-BENZ": "Grupo 1",
  "MINI": "Grupo 1",
  "MUDAN": "Grupo 2",
  "OPEL": "Grupo 1",
  "OTROS": "Grupo 1",
  "PORSCHE": "Grupo 1",
  "RAM": "Grupo 1",
  "SAIC WULING": "Grupo 2",
  "SWM": "Grupo 2",
  "VICTORY": "Grupo 2",
  "YUTONG": "Grupo 2",
  "BAIC YINXIANG": "Grupo 2",
  "BMW": "Grupo 1",
  "AUDI": "Grupo 1",
  "BAIC": "Grupo 2",
  "AGRALE": "Grupo 1",
  "ASIA MOTORS": "Grupo 1",
  "AUTOCRAFT": "Grupo 1"
};

const VEHICLE_BRANDS = Object.keys(VEHICLE_BRAND_GROUP).sort((a, b) =>
  a.localeCompare(b, "es")
);

function vehicleSegmentFromRules(segmentoCliente, marca, antiguedad) {
  const grupoMarca = VEHICLE_BRAND_GROUP[marca] ?? "Grupo 1";
  const usaGrupoMarca =
    ["VIP", "PREFERENTE", "NORMAL"].includes(segmentoCliente) &&
    antiguedad >= 0 && antiguedad <= 10;
  return usaGrupoMarca ? grupoMarca : "TODOS";
}

function vehicleEligibility(segmentoCliente, antiguedad) {
  if (!Number.isFinite(antiguedad) || antiguedad < 0)
    return { valido: false, mensaje: "Ingrese un año de modelo válido." };
  if (antiguedad > 20)
    return { valido: false, mensaje: "Oferta no corresponde al segmento, volver a calcular" };
  if (["VIP", "PREFERENTE"].includes(segmentoCliente) && antiguedad > 10)
    return { valido: false, mensaje: "Oferta no corresponde al segmento, volver a calcular" };
  return { valido: true, mensaje: "" };
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const [segmento, setSegmento] = useState("INCLUSION");
  const [marcaVehiculo, setMarcaVehiculo] = useState("TOYOTA");
  const [anioModelo, setAnioModelo] = useState(currentYear - 5);
  const [plazo, setPlazo] = useState(12);
  const [solicitado, setSolicitado] = useState(2000);
  const [seguroObliga, setSeguroObliga] = useState("Vida Integral");
  const [seguroVol, setSeguroVol] = useState("Solidario");

  const calc = useMemo(() => {
    const antiguedad = Math.max(0, currentYear - anioModelo);
    const segmentoVehiculo = vehicleSegmentFromRules(segmento, marcaVehiculo, antiguedad);
    const elegibilidadVehiculo = vehicleEligibility(segmento, antiguedad);
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
    const alertaFactor = typeof factor === "string";
    return { antiguedad, segmentoVehiculo, cuota, factor, alertaFactor, limiteFactor: rule.maxLabel, elegibilidadVehiculo };
  }, [segmento, marcaVehiculo, anioModelo, plazo, solicitado, seguroObliga, seguroVol, currentYear]);

  const inputStyle = { width: "100%", padding: 9, marginTop: 6 };
  const labelStyle = { display: "block", marginTop: 12 };
  const panelStyle = { border: "1px solid #ddd", borderRadius: 12, padding: 18 };
  const resultBox = { padding: 12, borderRadius: 10, background: "#f7f7f7" };

  return (
    <div style={{ fontFamily: "system-ui", padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Simulador GNV - Clientes Nuevos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 12 }}>
        <div style={panelStyle}>
          <h3>Entradas</h3>
          <label style={labelStyle}>Segmento cliente
            <select value={segmento} onChange={(e) => setSegmento(e.target.value)} style={inputStyle}>
              {['VIP','PREFERENTE','NORMAL','INCLUSION','EVALUACION','NA'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label style={labelStyle}>Marca del vehículo
            <select value={marcaVehiculo} onChange={(e) => setMarcaVehiculo(e.target.value)} style={inputStyle}>
              {VEHICLE_BRANDS.map(marca => <option key={marca} value={marca}>{marca}</option>)}
            </select>
          </label>
          <label style={labelStyle}>Año de modelo
            <input type="number" min={currentYear - 40} max={currentYear} value={anioModelo}
              onChange={(e) => setAnioModelo(Number(e.target.value))}
              onBlur={() => setAnioModelo(clamp(anioModelo, currentYear - 40, currentYear))} style={inputStyle}/>
          </label>
          <label style={labelStyle}>Plazo (meses)
            <input type="number" min={LIMITS.plazoMin} max={LIMITS.plazoMax} value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              onBlur={() => setPlazo(clamp(plazo, LIMITS.plazoMin, LIMITS.plazoMax))} style={inputStyle}/>
          </label>
          <label style={labelStyle}>Monto solicitado (S/)
            <input type="number" min={LIMITS.montoMin} max={LIMITS.montoMax} step={100} value={solicitado}
              onChange={(e) => setSolicitado(Number(e.target.value))}
              onBlur={() => setSolicitado(clamp(solicitado, LIMITS.montoMin, LIMITS.montoMax))} style={inputStyle}/>
          </label>
          <label style={labelStyle}>Seguro obligatorio
            <select value={seguroObliga} onChange={(e) => setSeguroObliga(e.target.value)} style={inputStyle}>
              <option value="Vida Integral">Vida Integral</option><option value="Ninguno">Ninguno</option>
            </select>
          </label>
          <label style={labelStyle}>Seguro voluntario
            <select value={seguroVol} onChange={(e) => setSeguroVol(e.target.value)} style={inputStyle}>
              <option value="Solidario">Solidario</option><option value="Ruta">Ruta</option>
              <option value="Solidario + Ruta">Solidario + Ruta</option><option value="Ninguno">Ninguno</option>
            </select>
          </label>
        </div>
        <div style={panelStyle}>
          <h3>Resultados</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            <div style={resultBox}><div>Antigüedad</div><strong>{calc.antiguedad} años</strong></div>
            <div style={resultBox}><div>Segmento vehículo</div><strong>{calc.segmentoVehiculo}</strong></div>
            <div style={resultBox}><div>Cuota</div><strong>{formatPEN(calc.cuota)}</strong></div>
            <div style={resultBox}><div>Factor</div><strong>{formatFactor(calc.factor)}</strong></div>
          </div>
          {calc.alertaFactor && <div style={{ marginTop: 16, padding: 12, borderRadius: 10, border: "1px solid #cc0000", color: "#cc0000", fontWeight: 600 }}>
            Alerta: el factor supera el límite permitido de {calc.limiteFactor} para el segmento {segmento}.
          </div>}
          {!calc.elegibilidadVehiculo.valido && <div style={{ marginTop: 16, padding: 12, borderRadius: 10, border: "1px solid #cc0000", color: "#cc0000", fontWeight: 600 }}>
            {calc.elegibilidadVehiculo.mensaje}
          </div>}
        </div>
      </div>
    </div>
  );
}
