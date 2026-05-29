/** Datos iniciales — hoja «Proyecciones» del plan de negocio (plantilla Excel). */
export const PROYECCION_ANOS = [2025, 2026, 2027, 2028, 2029, 2030] as const;

export const PROYECCION_META = {
  empresa: "Colanta",
  estudiantes: [
    "Juan David Urquijo",
    "Felipe Alejandro Tarapuez",
    "Brandon Andres Urrego Buitrago",
  ],
  producto: "Dulce Aroma de la Montaña",
};

export const INVERSIONES = {
  total: 167_479_672,
  lineas: [
    { concepto: "Edificaciones", valor: 19_000_000 },
    { concepto: "Maquinaria y equipo", valor: 29_500_000 },
    { concepto: "Muebles y enseres", valor: 770_000 },
    { concepto: "Vehículos", valor: 0 },
    { concepto: "Equipos de cómputo y telecomunicaciones", valor: 26_200_000 },
    { concepto: "Diferidos", valor: 0 },
  ],
};

export const CAPITAL_TRABAJO = {
  meses: [
    { mes: "Mes 1", total: 30_973_224, manoObra: 26_423_224, gastosAdmin: 4_550_000 },
    { mes: "Mes 2", total: 31_113_224, manoObra: 26_423_224, gastosAdmin: 4_690_000 },
    { mes: "Mes 3", total: 29_923_224, manoObra: 26_423_224, gastosAdmin: 3_500_000 },
  ],
};

export const DEMANDA = {
  cantidadAno1: 9_910,
  precioVenta: 7_000,
  provisionDeudasMalas: 0.03,
  ventasCredito: 0.4,
  ventasContado: 0.6,
  porAno: [
    { cantidad: 9_910, ingreso: 69_370_000, provision: 2_081_100, credito: 27_748_000, contado: 41_622_000 },
    { cantidad: 12_883, ingreso: 90_181_000, provision: 2_705_430, credito: 36_072_400, contado: 54_108_600 },
    { cantidad: 16_747.9, ingreso: 117_235_300, provision: 3_517_059, credito: 46_894_120, contado: 70_341_180 },
    { cantidad: 18_422.69, ingreso: 128_958_830, provision: 3_868_765, credito: 51_583_532, contado: 77_375_298 },
    { cantidad: 20_264.959, ingreso: 141_854_713, provision: 4_255_641, credito: 56_741_885, contado: 85_112_828 },
    { cantidad: 22_291.455, ingreso: 156_040_184, provision: 4_681_206, credito: 62_416_074, contado: 93_624_111 },
  ],
};

export const MATERIA_PRIMA_PROY = [
  { nombre: "Leche entera", gramos: 80, costoProveedor: 3_883.5, costoUnd: 310_680 },
  { nombre: "Leche en polvo entera", gramos: 40, costoProveedor: 26, costoUnd: 1_040 },
  { nombre: "Crema de leche", gramos: 30, costoProveedor: 200, costoUnd: 6_000 },
  { nombre: "Grasa vegetal o animal", gramos: 5, costoProveedor: 8.75, costoUnd: 43.75 },
  { nombre: "Suero", gramos: 5, costoProveedor: 125, costoUnd: 625 },
  { nombre: "Azúcar", gramos: 10, costoProveedor: 12, costoUnd: 120 },
  { nombre: "Dextrosa", gramos: 5, costoProveedor: 35, costoUnd: 175 },
  { nombre: "Estabilizantes", gramos: 3, costoProveedor: 12, costoUnd: 36 },
  { nombre: "Emulsificantes", gramos: 2, costoProveedor: 4, costoUnd: 8 },
  { nombre: "Esencias", gramos: 5, costoProveedor: 150, costoUnd: 750 },
  { nombre: "Crema de ron Medellín 8 años", gramos: 15, costoProveedor: 1_027.4, costoUnd: 15_411 },
];

export const COSTOS_MP_ANUAL = 3_318_747_512.5;
export const MARGEN_BRUTO_PCT = [-46.84, -35.8, -27.31, -24.73, -22.4, -20.27];
export const PAGO_CONTADO_MP = 929_249_303.5;
export const PAGO_CREDITO_MP = 2_389_498_209;
export const MANO_OBRA_PRODUCCION_ANUAL = 165_937_375.625;

export const CIF = {
  lineas: [
    { concepto: "Energía eléctrica", valores: [1_850_000, 1_926_035, 2_005_195, 2_087_609, 2_173_409, 2_262_736] },
    { concepto: "Agua", valores: [2_534_808, 2_638_988, 2_747_451, 2_860_371, 2_977_932, 3_100_325] },
  ],
  totales: [4_384_808, 4_565_023, 4_752_646, 4_947_980, 5_151_342, 5_363_062],
};

export const GASTOS_ADMIN = {
  lineas: [
    { concepto: "Nómina administración", valores: [72_577_104, 74_028_646, 75_509_219, 77_019_403, 78_559_791, 80_130_987] },
    { concepto: "Publicidad", valores: [28_118_124, 28_680_486, 29_254_096, 29_839_178, 30_435_962, 31_044_681] },
  ],
  totales: [100_695_228, 102_709_133, 104_763_315, 106_858_582, 108_995_753, 111_175_668],
};

export const ESTADO_RESULTADOS = {
  ventas: [69_370_000, 90_181_000, 117_235_300, 128_958_830, 141_854_713, 156_040_184],
  costoMercancia: [-3_484_684_888, -3_484_684_888, -3_484_684_888, -3_484_684_888, -3_484_684_888, -3_484_684_888],
  utilidadBruta: [-3_415_314_888, -3_394_503_888, -3_367_449_588, -3_355_726_058, -3_342_830_175, -3_328_644_704],
  gastosAdminVentas: [-100_695_228, -102_709_133, -104_763_315, -106_858_582, -108_995_753, -111_175_668],
  provisionDeudas: [-2_081_100, -2_705_430, -3_517_059, -3_868_765, -4_255_641, -4_681_206],
  utilidadAntesImpuestos: [-3_518_091_216, -3_499_918_451, -3_475_729_962, -3_466_453_405, -3_456_081_570, -3_444_501_578],
  impuestoRenta: [1_231_331_926, 1_224_971_458, 1_216_505_487, 1_213_258_692, 1_209_628_549, 1_205_575_552],
  utilidadNeta: [-2_286_759_290, -2_274_946_993, -2_259_224_476, -2_253_194_713, -2_246_453_020, -2_238_926_025],
  reservaLegal: [228_675_929, 227_494_699, 225_922_448, 225_319_471, 224_645_302, 223_892_603],
  dividendos: [228_675_929, 227_494_699, 225_922_448, 225_319_471, 224_645_302, 223_892_603],
  utilidadNetaFinal: [-1_829_407_432, -1_819_957_594, -1_807_379_580, -1_802_555_770, -1_797_162_416, -1_791_140_820],
};

export const FLUJO_CAJA = {
  ventasContado: [41_622_000, 54_108_600, 70_341_180, 77_375_298, 85_112_828, 93_624_111],
  totalIngresos: [41_622_000, 54_108_600, 70_341_180, 77_375_298, 85_112_828, 93_624_111],
  pagoMpContado: [929_249_304, 929_249_304, 929_249_304, 929_249_304, 929_249_304, 929_249_304],
  manoObra: [165_937_376, 165_937_376, 165_937_376, 165_937_376, 165_937_376, 165_937_376],
  cif: [4_384_808, 4_565_023, 4_752_646, 4_947_980, 5_151_342, 5_363_062],
  gastosAdmin: [100_695_228, 102_709_133, 104_763_315, 106_858_582, 108_995_753, 111_175_668],
  impuestoRenta: [-1_231_331_926, -1_224_971_458, -1_216_505_487, -1_213_258_692, -1_209_628_549, -1_205_575_552],
  totalEgresos: [-31_065_211, -22_510_623, -11_802_847, -6_265_451, -294_776, 6_149_857],
  efectivoGenerado: [72_687_211, 76_619_223, 82_144_027, 83_640_749, 85_407_603, 87_474_254],
  inversionInicial: -167_479_672,
};

export const INDICADORES = {
  tasaInteresOportunidad: 0.12,
  tir: 0.4085,
  vpn: 145_449_508,
};
