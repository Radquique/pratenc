// ═══════════════════════════════════════════════════════════════
// PRATENC AA — DADES COMPARTIDES WMA 2023  v4.0
// Amb persistència window.storage, suport filials i optimitzador
// ═══════════════════════════════════════════════════════════════

// ─── Atletes filials ────────────────────────────────────────────
// isFilial llegeix el camp .filial=true de l'objecte atleta.
// Pot rebre un nom (string) o un objecte atleta.
// Quan rep un nom, busca a la variable global `athletes` de cada pàgina.
function isFilial(nomOrAtleta) {
  if (!nomOrAtleta) return false;
  if (typeof nomOrAtleta === 'object') return !!nomOrAtleta.filial;
  // string: busca a la llista global athletes
  if (typeof athletes !== 'undefined' && Array.isArray(athletes)) {
    const a = athletes.find(x => x.nom === nomOrAtleta);
    if (a) return !!a.filial;
  }
  return false;
}

// Retorna quantes filials actives hi ha (màx permès al club: 4)
function numFilialsActives(athletesList, excludedList) {
  return (athletesList||[]).filter(a => a.filial && !(excludedList||[]).includes(a.nom)).length;
}

// ─── Proves disponibles ────────────────────────────────────────
const PROVES = [
  "—","100m","200m","400m","800m","1500m","3000m",
  "3000m marxa","2000m obstacles",
  "Tanques Altes","Tanques Baixes",
  "Salt alçada","Salt llargada","Triple salt","Salt perxa",
  "Llançament pes","Llançament disc","Llançament martell","Martell Pesat","Llançament javelina",
  "Relleu 4x100","Relleu 4x400"
];

// ─── Noms de proves del campionat (camp → proves internes) ─────
const CAMP_PROVA_MAP = {
  "100m FEM. AL":               "100m",
  "200m FEM. AL":               "200m",
  "400m FEM. AL":               "400m",
  "800m FEM. AL":               "800m",
  "1.500m FEM. AL":             "1500m",
  "3.000m FEM. AL":             "3000m",
  "3.000m Marcha FEM. AL":      "3000m marxa",
  "Vallas Altas VET. Fem. AL":  "Tanques Altes",
  "Vallas Bajas VET. Fem. AL":  "Tanques Baixes",
  "2.000m Obst. FEM.":          "2000m obstacles",
  "Altura FEM. AL":             "Salt alçada",
  "Pértiga FEM. AL":            "Salt perxa",
  "Longitud FEM. AL":           "Salt llargada",
  "Triple Salto FEM. AL":       "Triple salt",
  "Peso VET. Fem. AL":          "Llançament pes",
  "Disco VET. Fem.":            "Llançament disc",
  "Martillo Pesado VET. Fem. AL":"Martell Pesat",
  "Martillo VET. Fem.":         "Llançament martell",
  "Jabalina VET. Fem.":         "Llançament javelina",
  "4x100m FEM. AL":             "Relleu 4x100",
  "4x400m FEM. AL":             "Relleu 4x400",
  "3.000m Marcha FEM. en pista":"3000m marxa",
};

// ─── Standards open dona WMA 2023 ─────────────────────────────
// Font: paràmetres WMA 2023 (pàgina 4 del PDF)
// Per a proves de temps: el standard és el temps de referència open (s)
// Per a proves de distància/alçada: el standard és la distància de referència (m)
const WMA_STD = {
  "100m": 10.49,   // Record mundial femení open
  "200m": 21.34,
  "400m": 47.60,
  "800m": 113.28,  // 1:53.28
  "1500m": 230.07, // 3:50.07
  "3000m": 486.11, // 8:06.11
  "3000m marxa": 690.0,
  "2000m obstacles": 340.76,
  // Tanques Altes (Short Hurdles): standard open = 12.20s (100m hurdles)
  "Tanques Altes": 12.20,
  // Tanques Baixes (Long Hurdles): standard open = 52.34s (400m hurdles)
  "Tanques Baixes": 52.34,
  "Salt alçada": 2.09,
  "Salt llargada": 7.17,
  "Triple salt": 15.74,
  "Salt perxa": 5.06,
  "Llançament pes": 22.63,
  "Llançament disc": 76.80,
  "Llançament martell": 82.98,
  "Martell Pesat": 82.98,
  "Llançament javelina": 72.28,
};

// ─── Factors WMA 2023 ──────────────────────────────────────────
const WMA_F = {
  "100m":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0000,36:1.0000,37:1.0000,38:0.9960,39:0.9885,
    40:0.9810,41:0.9735,42:0.9661,43:0.9588,44:0.9514,
    45:0.9441,46:0.9368,47:0.9295,48:0.9223,49:0.9151,
    50:0.9080,51:0.9008,52:0.8937,53:0.8866,54:0.8796,
    55:0.8726,56:0.8656,57:0.8586,58:0.8517,59:0.8447,
    60:0.8379,61:0.8310,62:0.8242,63:0.8174,64:0.8106,
    65:0.8038,66:0.7971,67:0.7904,68:0.7838,69:0.7771,
    70:0.7705,71:0.7639,72:0.7573,73:0.7508,74:0.7442,
    75:0.7377,76:0.7313,77:0.7248,78:0.7184,79:0.7114,
    80:0.7040,81:0.6960,82:0.6875,83:0.6785,84:0.6690,
    85:0.6590,90:0.6011,95:0.5302,100:0.4464,105:0.3497,110:0.2400
  },
  "200m":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0000,36:1.0000,37:1.0000,38:0.9939,39:0.9863,
    40:0.9787,41:0.9712,42:0.9636,43:0.9561,44:0.9486,
    45:0.9411,46:0.9337,47:0.9262,48:0.9188,49:0.9114,
    50:0.9040,51:0.8966,52:0.8893,53:0.8819,54:0.8746,
    55:0.8673,56:0.8600,57:0.8527,58:0.8454,59:0.8382,
    60:0.8309,61:0.8237,62:0.8165,63:0.8093,64:0.8022,
    65:0.7950,66:0.7879,67:0.7807,68:0.7736,69:0.7665,
    70:0.7594,71:0.7524,72:0.7453,73:0.7382,74:0.7312,
    75:0.7242,76:0.7172,77:0.7102,78:0.7032,79:0.6956,
    80:0.6875,81:0.6787,82:0.6693,83:0.6593,84:0.6486,
    85:0.6374,90:0.5723,95:0.4920,100:0.3965,105:0.2858,110:0.1600
  },
  "400m":{
    30:1.0000,31:1.0000,32:0.9980,33:0.9915,34:0.9849,
    35:0.9783,36:0.9716,37:0.9648,38:0.9580,39:0.9511,
    40:0.9441,41:0.9371,42:0.9300,43:0.9229,44:0.9157,
    45:0.9084,46:0.9011,47:0.8937,48:0.8862,49:0.8787,
    50:0.8711,51:0.8635,52:0.8558,53:0.8481,54:0.8403,
    55:0.8324,56:0.8245,57:0.8166,58:0.8086,59:0.8005,
    60:0.7924,61:0.7842,62:0.7760,63:0.7677,64:0.7594,
    65:0.7510,66:0.7426,67:0.7341,68:0.7256,69:0.7171,
    70:0.7084,71:0.6998,72:0.6911,73:0.6823,74:0.6735,
    75:0.6647,76:0.6555,77:0.6459,78:0.6359,79:0.6255,
    80:0.6148,81:0.6037,82:0.5922,83:0.5804,84:0.5682,
    85:0.5556,90:0.4869,95:0.4090,100:0.3219,105:0.2255,110:0.1200
  },
  "800m":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:0.9929,36:0.9857,37:0.9784,38:0.9710,39:0.9637,
    40:0.9563,41:0.9490,42:0.9415,43:0.9341,44:0.9267,
    45:0.9192,46:0.9117,47:0.9041,48:0.8966,49:0.8890,
    50:0.8814,51:0.8738,52:0.8662,53:0.8585,54:0.8509,
    55:0.8432,56:0.8355,57:0.8277,58:0.8200,59:0.8122,
    60:0.8044,61:0.7966,62:0.7888,63:0.7809,64:0.7730,
    65:0.7651,66:0.7572,67:0.7493,68:0.7414,69:0.7334,
    70:0.7254,71:0.7174,72:0.7094,73:0.7014,74:0.6933,
    75:0.6848,76:0.6758,77:0.6664,78:0.6565,79:0.6462,
    80:0.6354,81:0.6241,82:0.6124,83:0.6003,84:0.5876,
    85:0.5746,90:0.5024,95:0.4188,100:0.3239,105:0.2176,110:0.1000
  },
  "1500m":{
    30:1.0000,31:1.0000,32:1.0000,33:0.9960,34:0.9886,
    35:0.9812,36:0.9738,37:0.9664,38:0.9590,39:0.9515,
    40:0.9441,41:0.9367,42:0.9293,43:0.9218,44:0.9144,
    45:0.9069,46:0.8995,47:0.8921,48:0.8846,49:0.8772,
    50:0.8697,51:0.8623,52:0.8548,53:0.8473,54:0.8399,
    55:0.8324,56:0.8249,57:0.8175,58:0.8100,59:0.8025,
    60:0.7951,61:0.7876,62:0.7801,63:0.7726,64:0.7651,
    65:0.7576,66:0.7501,67:0.7427,68:0.7352,69:0.7277,
    70:0.7202,71:0.7127,72:0.7052,73:0.6976,74:0.6897,
    75:0.6812,76:0.6722,77:0.6628,78:0.6529,79:0.6425,
    80:0.6316,81:0.6202,82:0.6083,83:0.5960,84:0.5832,
    85:0.5698,90:0.4960,95:0.4102,100:0.3122,105:0.2021,110:0.0800
  },
  "3000m":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0000,36:1.0000,37:1.0000,38:0.9930,39:0.9849,
    40:0.9767,41:0.9685,42:0.9603,43:0.9521,44:0.9438,
    45:0.9355,46:0.9271,47:0.9188,48:0.9104,49:0.9019,
    50:0.8935,51:0.8850,52:0.8765,53:0.8680,54:0.8594,
    55:0.8509,56:0.8423,57:0.8336,58:0.8250,59:0.8163,
    60:0.8076,61:0.7989,62:0.7901,63:0.7813,64:0.7725,
    65:0.7637,66:0.7549,67:0.7460,68:0.7371,69:0.7282,
    70:0.7193,71:0.7103,72:0.7013,73:0.6923,74:0.6833,
    75:0.6743,76:0.6652,77:0.6561,78:0.6470,79:0.6379,
    80:0.6288,81:0.6196,82:0.6098,83:0.5993,84:0.5881,
    85:0.5762,90:0.5067,95:0.4204,100:0.3171,105:0.1970,110:0.0600
  },
  "3000m marxa":{35:0.9480,36:0.9430,37:0.9378,38:0.9325,39:0.9270,40:0.9213,41:0.9155,42:0.9095,43:0.9033,44:0.8969,45:0.8750,46:0.8682,47:0.8612,48:0.8540,49:0.8466,50:0.8390,51:0.8312,52:0.8232,53:0.8150,54:0.8066,55:0.8010,56:0.7924,57:0.7836,58:0.7746,59:0.7654,60:0.7640,65:0.7270},
  "2000m obstacles":{35:0.9700,36:0.9660,37:0.9618,38:0.9575,39:0.9530,40:0.9350,41:0.9302,42:0.9252,43:0.9200,44:0.9146,45:0.9000,46:0.8950,47:0.8898,48:0.8844,49:0.8788,50:0.8600,51:0.8540,52:0.8478,53:0.8414,54:0.8348,55:0.8200,56:0.8128,57:0.8054,58:0.7978,59:0.7900,60:0.7800,65:0.7400},
  // Tanques Altes = "Short Hurdles" WMA 2023 (F35: 100m tanques 0.838m / F40+: 80m tanques 0.762m)
  // Factors exactes del PDF WMA 2023 One-Year Age Factors, columna "Short Hurdles"
  "Tanques Altes":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:0.9997,
    35:0.9932,36:0.9866,37:0.9800,38:0.9734,39:0.9668,
    40:1.1368,41:1.1289,42:1.1210,43:1.1131,44:1.1051,
    45:1.0971,46:1.0891,47:1.0811,48:1.0730,49:1.0649,
    50:1.0597,51:1.0516,52:1.0434,53:1.0352,54:1.0270,
    55:1.0188,56:1.0106,57:1.0023,58:0.9940,59:0.9857,
    60:0.9774,61:0.9691,62:0.9607,63:0.9523,64:0.9439,
    65:0.9355,66:0.9266,67:0.9173,68:0.9074,69:0.8971,
    70:0.8862,71:0.8749,72:0.8631,73:0.8509,74:0.8381,
    75:0.8249,76:0.8112,77:0.7970,78:0.7823,79:0.7671,
    80:0.7515,81:0.7353,82:0.7187,83:0.7017,84:0.6841,
    85:0.6661,86:0.6475,87:0.6285,88:0.6090,89:0.5891,
    90:0.5686,95:0.4592,100:0.3379,105:0.2046,110:0.0594
  },
  // Tanques Baixes = "Long Hurdles" WMA 2023 (F35-F49: 400m tanques / F50+: 300m tanques)
  // Factors exactes del PDF WMA 2023 One-Year Age Factors, columna "Long Hurdles"
  "Tanques Baixes":{
    30:1.0000,31:1.0000,32:0.9968,33:0.9899,34:0.9830,
    35:0.9760,36:0.9691,37:0.9622,38:0.9553,39:0.9484,
    40:0.9414,41:0.9345,42:0.9276,43:0.9207,44:0.9137,
    45:0.9068,46:0.8999,47:0.8930,48:0.8861,49:0.8791,
    50:1.1635,51:1.1543,52:1.1451,53:1.1358,54:1.1266,
    55:1.1174,56:1.1081,57:1.0989,58:1.0897,59:1.0804,
    60:1.0712,61:1.0620,62:1.0527,63:1.0435,64:1.0343,
    65:1.0250,66:1.0158,67:1.0066,68:0.9973,69:0.9881,
    70:1.5178,71:1.5015,72:1.4843,73:1.4660,74:1.4468,
    75:1.4266,76:1.4054,77:1.3833,78:1.3601,79:1.3360,
    80:1.3109,81:1.2849,82:1.2578,83:1.2298,84:1.2008,
    85:1.1708,86:1.1399,87:1.1080,88:1.0750,89:1.0412,
    90:1.0063,95:0.8173,100:0.6038,105:0.3659,110:0.1035
  },
  "Salt alçada":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0008,34:1.0106,
    35:1.0205,36:1.0305,37:1.0406,38:1.0508,39:1.0611,
    40:1.0715,41:1.0821,42:1.0928,43:1.1036,44:1.1145,
    45:1.1255,46:1.1367,47:1.1480,48:1.1594,49:1.1709,
    50:1.1826,51:1.1944,52:1.2063,53:1.2184,54:1.2307,
    55:1.2430,56:1.2555,57:1.2682,58:1.2810,59:1.2940,
    60:1.3071,61:1.3203,62:1.3338,63:1.3474,64:1.3611,
    65:1.3751,66:1.3891,67:1.4034,68:1.4179,69:1.4325,
    70:1.4473,71:1.4623,72:1.4775,73:1.4928,74:1.5084,
    75:1.5242,76:1.5401,77:1.5563,78:1.5727,79:1.5893,
    80:1.6061,81:1.6232,82:1.6404,83:1.6594,84:1.6802,
    85:1.7029,90:1.8509,95:2.0785,100:2.4406,105:3.0671,110:4.3478
  },
  "Salt llargada":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0103,34:1.0212,
    35:1.0323,36:1.0436,37:1.0550,38:1.0666,39:1.0784,
    40:1.0905,41:1.1027,42:1.1151,43:1.1277,44:1.1406,
    45:1.1537,46:1.1670,47:1.1805,48:1.1943,49:1.2083,
    50:1.2226,51:1.2372,52:1.2520,53:1.2671,54:1.2825,
    55:1.2982,56:1.3142,57:1.3305,58:1.3471,59:1.3641,
    60:1.3814,61:1.3991,62:1.4171,63:1.4356,64:1.4544,
    65:1.4736,66:1.4933,67:1.5134,68:1.5339,69:1.5549,
    70:1.5764,71:1.5984,72:1.6209,73:1.6439,74:1.6675,
    75:1.6928,76:1.7200,77:1.7491,78:1.7803,79:1.8139,
    80:1.8499,81:1.8888,82:1.9305,83:1.9756,84:2.0244,
    85:2.0771,90:2.4193,95:2.9746,100:4.0010,105:6.4700,110:20.0000
  },
  "Triple salt":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0039,36:1.0167,37:1.0297,38:1.0429,39:1.0562,
    40:1.0698,41:1.0836,42:1.0975,43:1.1117,44:1.1261,
    45:1.1407,46:1.1556,47:1.1706,48:1.1859,49:1.2015,
    50:1.2172,51:1.2333,52:1.2496,53:1.2661,54:1.2829,
    55:1.3000,56:1.3173,57:1.3350,58:1.3529,59:1.3711,
    60:1.3896,61:1.4085,62:1.4276,63:1.4471,64:1.4670,
    65:1.4871,66:1.5076,67:1.5285,68:1.5498,69:1.5714,
    70:1.5934,71:1.6158,72:1.6387,73:1.6619,74:1.6856,
    75:1.7097,76:1.7357,77:1.7636,78:1.7936,79:1.8260,
    80:1.8608,81:1.8983,82:1.9388,83:1.9826,84:2.0300,
    85:2.0813,90:2.4157,95:2.9606,100:3.9719,105:6.4152,110:20.0000
  },
  "Salt perxa":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0024,36:1.0143,37:1.0263,38:1.0386,39:1.0511,
    40:1.0637,41:1.0766,42:1.0898,43:1.1031,44:1.1167,
    45:1.1306,46:1.1447,47:1.1590,48:1.1736,49:1.1885,
    50:1.2037,51:1.2191,52:1.2349,53:1.2510,54:1.2673,
    55:1.2840,56:1.3011,57:1.3185,58:1.3362,59:1.3543,
    60:1.3728,61:1.3917,62:1.4110,63:1.4307,64:1.4509,
    65:1.4715,66:1.4926,67:1.5142,68:1.5362,69:1.5588,
    70:1.5819,71:1.6056,72:1.6299,73:1.6557,74:1.6833,
    75:1.7128,76:1.7443,77:1.7780,78:1.8141,79:1.8528,
    80:1.8944,81:1.9390,82:1.9871,83:2.0390,84:2.0951,
    85:2.1559,90:2.5533,95:3.2130,100:4.4938,105:7.9701,110:50.0000
  },
  "Llançament pes":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0073,34:1.0219,
    35:1.0368,36:1.0520,37:1.0675,38:1.0835,39:1.0998,
    40:1.1164,41:1.1335,42:1.1510,43:1.1689,44:1.1873,
    45:1.2062,46:1.2255,47:1.2454,48:1.2657,49:1.2867,
    50:1.1330,51:1.1522,52:1.1719,53:1.1922,54:1.2131,
    55:1.2347,56:1.2570,57:1.2799,58:1.3036,59:1.3281,
    60:1.3534,61:1.3795,62:1.4066,63:1.4346,64:1.4637,
    65:1.4938,66:1.5251,67:1.5576,68:1.5914,69:1.6265,
    70:1.6631,71:1.7013,72:1.7411,73:1.7827,74:1.8261,
    75:1.5282,76:1.5671,77:1.6079,78:1.6508,79:1.6958,
    80:1.7433,81:1.7934,82:1.8463,83:1.9022,84:1.9615,
    85:2.0244,90:2.4079,95:2.9631,100:3.8399,105:5.1792,110:7.0711
  },
  "Llançament disc":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0000,
    35:1.0000,36:1.0000,37:1.0166,38:1.0351,39:1.0540,
    40:1.0733,41:1.0931,42:1.1134,43:1.1341,44:1.1554,
    45:1.1772,46:1.1995,47:1.2224,48:1.2459,49:1.2701,
    50:1.2949,51:1.3204,52:1.3466,53:1.3736,54:1.4014,
    55:1.4300,56:1.4595,57:1.4899,58:1.5213,59:1.5538,
    60:1.5873,61:1.6220,62:1.6579,63:1.6950,64:1.7336,
    65:1.7735,66:1.8151,67:1.8582,68:1.9031,69:1.9498,
    70:1.9985,71:2.0493,72:2.1023,73:2.1578,74:2.2159,
    75:1.9717,76:2.0270,77:2.0851,78:2.1462,79:2.2106,
    80:2.2786,81:2.3504,82:2.4265,83:2.5072,84:2.5929,
    85:2.6843,90:3.2477,95:4.0861,100:5.4702,105:8.2642,110:17.3205
  },
  "Llançament martell":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0187,34:1.0378,
    35:1.0573,36:1.0773,37:1.0977,38:1.1185,39:1.1398,
    40:1.1616,41:1.1839,42:1.2067,43:1.2301,44:1.2541,
    45:1.2787,46:1.3039,47:1.3298,48:1.3563,49:1.3836,
    50:1.2225,51:1.2475,52:1.2732,53:1.2997,54:1.3270,
    55:1.3551,56:1.3841,57:1.4140,58:1.4449,59:1.4769,
    60:1.5099,61:1.5441,62:1.5796,63:1.6163,64:1.6544,
    65:1.6940,66:1.7352,67:1.7780,68:1.8226,69:1.8691,
    70:1.9176,71:1.9683,72:2.0213,73:2.0768,74:2.1350,
    75:1.6730,76:1.7219,77:1.7735,78:1.8278,79:1.8851,
    80:1.9458,81:2.0101,82:2.0783,83:2.1509,84:2.2283,
    85:2.3110,90:2.8273,95:3.6161,100:4.9754,105:7.6645,110:13.1951
  },
  "Martell Pesat":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0187,34:1.0378,
    35:1.0573,36:1.0773,37:1.0977,38:1.1185,39:1.1398,
    40:1.1616,41:1.1839,42:1.2067,43:1.2301,44:1.2541,
    45:1.2787,46:1.3039,47:1.3298,48:1.3563,49:1.3836,
    50:1.2225,51:1.2475,52:1.2732,53:1.2997,54:1.3270,
    55:1.3551,56:1.3841,57:1.4140,58:1.4449,59:1.4769,
    60:1.5099,61:1.5441,62:1.5796,63:1.6163,64:1.6544,
    65:1.6940,70:1.9176,75:1.6730,80:1.9458,85:2.3110,
    90:2.8273,95:3.6161,100:4.9754,105:7.6645,110:13.1951
  },
  "Llançament javelina":{
    30:1.0000,31:1.0000,32:1.0000,33:1.0000,34:1.0038,
    35:1.0236,36:1.0439,37:1.0646,38:1.0858,39:1.1075,
    40:1.1298,41:1.1526,42:1.1759,43:1.1998,44:1.2244,
    45:1.2495,46:1.2754,47:1.3019,48:1.3291,49:1.3570,
    50:1.2650,51:1.2919,52:1.3196,53:1.3481,54:1.3775,
    55:1.4077,56:1.4388,57:1.4708,58:1.5039,59:1.5380,
    60:1.5732,61:1.6096,62:1.6472,63:1.6861,64:1.7263,
    65:1.7680,66:1.8111,67:1.8559,68:1.9023,69:1.9505,
    70:2.0006,71:2.0527,72:2.1070,73:2.1635,74:2.2224,
    75:2.0428,76:2.1003,77:2.1605,78:2.2235,79:2.2895,
    80:2.3589,81:2.4318,82:2.5089,83:2.5906,84:2.6774,
    85:2.7698,90:3.3387,95:4.1830,100:5.5753,105:8.3220,110:16.3299
  },
};

const CAMP_SET = new Set(["Salt alçada","Salt llargada","Triple salt","Salt perxa","Llançament pes","Llançament disc","Llançament martell","Martell Pesat","Llançament javelina"]);
// Nota: Tanques Altes, Tanques Baixes són proves de temps (no distància) → NO a CAMP_SET
const ANYS = [2020,2021,2022,2023,2024,2025,2026];

// ─── Referència campeonats per defecte ────────────────────────
const REF_CAMPEONATS_DEFAULT = {
  "100m":[87,84,81,79,76,74,71,65],
  "200m":[86,83,80,78,75,73,70,65],
  "400m":[91,85,81,77,74,72,70,65],
  "800m":[88,83,79,77,74,72,69,64],
  "1500m":[90,85,80,77,74,72,69,63],
  "3000m":[85,80,76,74,71,69,66,61],
  "3000m marxa":[83,79,76,73,70,68,64,60],
  "2000m obstacles":[88,84,82,78,76,72,70,65],
  "Tanques Altes":[82,78,74,70,67,64,61,56],
  "Tanques Baixes":[85,81,78,74,71,69,66,61],
  "Salt alçada":[84,80,77,74,71,68,65,59],
  "Salt llargada":[85,79,75,72,69,66,63,57],
  "Triple salt":[87,82,77,73,70,67,64,59],
  "Salt perxa":[78,73,68,66,64,61,58,53],
  "Llançament pes":[62,57,54,51,48,45,43,40],
  "Llançament disc":[52,48,45,43,40,38,36,33],
  "Llançament martell":[65,58,52,47,43,40,37,33],
  "Martell Pesat":[62,56,50,45,41,38,35,31],
  "Llançament javelina":[55,49,44,40,37,35,32,29],
  "Relleu 4x100":[81,75,72,70,67,65,62,57],
  "Relleu 4x400":[80,75,72,69,66,63,60,55],
};

// Notes dels campeonats
const REF_NOTES = {
  "100m":"2023: Pratenc 2a 87.08% (13.33s)",
  "200m":"2023: Pratenc 3a 84.97% (28.03s)",
  "400m":"2023: Pratenc 7a 72.81% (1:15.90)",
  "800m":"2024: Pratenc 4a (2:53.65)",
  "1500m":"2023: Pratenc 6a 74.44% (6:01.59)",
  "3000m":"2024: Pratenc 1a! (11:16.08)",
  "3000m marxa":"2024: Pratenc 7a (22:59)",
  "2000m obstacles":"2023: Pratenc 2a 88.91% (7:42.11). 2024: Pratenc 1a! (7:46.12 f)",
  "Tanques Altes":"'Short Hurdles' WMA 2023. F35: 100m tanques (0.838m·8.5m). F40+: 80m tanques (0.762m·8m). El factor WMA canvia de <1 a >1 als 40 anys perquè la prova canvia de distància. 2024: Begoña 1a 86.46% (13.15s).",
  "Tanques Baixes":"'Long Hurdles' WMA 2023. F35-F49: 400m tanques (0.762m). F50+: 300m tanques (0.762m). El factor salta als 50 i als 70 per canvi de distància. 2023: Estela 4a 74.22%.",
  "100m tanques F35":"Prova exclusiva F35. Standard 0.838m",
  "300m tanques":"Prova F50-55. 2023: Marzo 1a 93.31%",
  "400m tanques":"2023: Noelia Jimenez 3a 71.08% (1:20.45)",
  "Salt alçada":"2023: Monica Vicente 4a 73.42%. 2024: Estela Roldán 3a (f)",
  "Salt llargada":"2023: Pratenc 2a 76.28% (4.85m). 2024: Pratenc 2a (f)",
  "Triple salt":"2023: Gemma Cassí 8a 67.35%. 2024: Gemma Cassí 6a (f)",
  "Salt perxa":"2023: Patricia Hidalgo 2a 68.32%. 2024: Patricia Hidalgo 3a (f)",
  "Llançament pes":"Factor WMA inclou corrector de pes per edat. 2023: Estela Roldán 2a 54.76%",
  "Llançament disc":"2023: Gemma Cassí 2a 54.51%. 2024: Gemma Cassí 1a (f)",
  "Llançament martell":"Factor WMA inclou corrector de pes. 2023: Cristina Garcia 3a 30.26%",
  "Llançament javelina":"2023: Cristina Garcia 2a 49.18%. 2024: Cristina Garcia 2a (f)",
  "Relleu 4x100":"2023: Pratenc 2a 74.60%",
  "Relleu 4x400":"No s'ha puntuat als campionats analitzats",
};

// ─── Funcions de storage persistents ──────────────────────────
// window.storage = Claude artifacts | localStorage = navegador normal | null = GitHub Pages

async function storageGet(key, shared = false) {
  try {
    if (window.storage) {
      const r = await window.storage.get(key, shared);
      return r ? JSON.parse(r.value) : null;
    }
  } catch {}
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

async function storageSet(key, val, shared = false) {
  try {
    if (window.storage) {
      await window.storage.set(key, JSON.stringify(val), shared);
    }
  } catch {}
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  return true;
}

// ─── Atletes: carregar / guardar ──────────────────────────────
async function loadAthletes() {
  // Prioritat 1: fitxer atletes-data.js (versió pública GitHub Pages)
  if (typeof ATLETES_DATA !== 'undefined' && Array.isArray(ATLETES_DATA)) {
    return JSON.parse(JSON.stringify(ATLETES_DATA));
  }
  // Prioritat 2: storage / localStorage
  const fromStorage = await storageGet('pratenc_atletes', false);
  if (fromStorage && Array.isArray(fromStorage)) return fromStorage;
  return [];
}

async function saveAthletes(athletes) {
  if (typeof ATLETES_DATA !== 'undefined') return;
  await storageSet('pratenc_atletes', athletes, false);
}

// ─── Referència campionats: carregar / guardar ────────────────
async function loadRefCampeonats() {
  const fromStorage = await storageGet('pratenc_ref_camp', false);
  if (fromStorage && typeof fromStorage === 'object') return fromStorage;
  return JSON.parse(JSON.stringify(REF_CAMPEONATS_DEFAULT));
}

async function saveRefCampeonats(ref) {
  await storageSet('pratenc_ref_camp', ref, false);
}

// ─── Simulador: estat ─────────────────────────────────────────
async function loadSimState() {
  return (await storageGet('pratenc_sim', false)) || {};
}
async function saveSimState(s) {
  await storageSet('pratenc_sim', s, false);
}

async function loadRelState() {
  return (await storageGet('pratenc_rel', false)) || {};
}
async function saveRelState(s) {
  await storageSet('pratenc_rel', s, false);
}

async function loadExcluded() {
  return (await storageGet('pratenc_excl', false)) || [];
}
async function saveExcluded(e) {
  await storageSet('pratenc_excl', e, false);
}

// ─── Càlculs WMA ──────────────────────────────────────────────

function getEdatCompeticio(dob_str, any_comp) {
  if (!dob_str) return null;
  return parseInt(any_comp) - new Date(dob_str).getFullYear();
}

function getEdatActual(dob_str) {
  if (!dob_str) return null;
  const avui = new Date(), dob = new Date(dob_str);
  let e = avui.getFullYear() - dob.getFullYear();
  if (avui.getMonth() < dob.getMonth() || (avui.getMonth() === dob.getMonth() && avui.getDate() < dob.getDate())) e--;
  return e;
}

function getCat(dob_str) {
  const e = getEdatActual(dob_str);
  if (!e || e < 35) return null;
  return 'F' + (Math.floor(e/5)*5);
}

function getFactorWMA(prova, edat) {
  const t = WMA_F[prova]; if (!t) return null;
  if (t[edat] !== undefined) return t[edat];
  const ks = Object.keys(t).map(Number).sort((a,b)=>a-b);
  if (edat <= ks[0]) return t[ks[0]];
  if (edat >= ks[ks.length-1]) return t[ks[ks.length-1]];
  for (let i=0;i<ks.length-1;i++) {
    if (edat>=ks[i] && edat<=ks[i+1]) {
      const r=(edat-ks[i])/(ks[i+1]-ks[i]);
      return t[ks[i]] + r*(t[ks[i+1]]-t[ks[i]]);
    }
  }
  return null;
}

function parseVal(marca, prova) {
  if (!marca) return null;
  const s = marca.trim().replace(',','.');
  if (CAMP_SET.has(prova)) return parseFloat(s);
  if (s.includes(':')) {
    const p=s.split(':');
    if (p.length===2) return parseFloat(p[0])*60+parseFloat(p[1]);
    if (p.length===3) return parseFloat(p[0])*3600+parseFloat(p[1])*60+parseFloat(p[2]);
  }
  return parseFloat(s);
}

function calcPct(prova, marca, dob, any_comp) {
  if (!prova||prova==='—'||!marca||!dob) return null;
  const std = WMA_STD[prova]; if (!std) return null;
  const edat = getEdatCompeticio(dob, any_comp||new Date().getFullYear());
  if (!edat||edat<35) return null;
  const f = getFactorWMA(prova, edat); if (!f) return null;
  const v = parseVal(marca, prova); if (!v||isNaN(v)||v<=0) return null;
  const std_e = std/f;
  const pct = CAMP_SET.has(prova) ? (v/std_e)*100 : (std_e/v)*100;
  if (pct > 105) return null;
  return Math.round(pct*100)/100;
}

function estPts(prova, pct, refCampeonats) {
  const ref = refCampeonats || REF_CAMPEONATS_DEFAULT;
  if (!prova||prova==='—') return 0;
  // Si té prova assignada però sense marca/% → 1 punt (atleta sense registre oficial)
  if (pct===null||pct===undefined) return 1;
  const r = ref[prova]; if (!r) return 1;
  for (let i=0;i<r.length;i++) { if (pct>=r[i]) return 8-i; }
  return 1;
}

function estPos(prova, pct, refCampeonats) {
  const ref = refCampeonats || REF_CAMPEONATS_DEFAULT;
  if (!prova||prova==='—'||pct===null||pct===undefined) return '—';
  const r = ref[prova]; if (!r) return '—';
  for (let i=0;i<r.length;i++) { if (pct>=r[i]) return i+1; }
  return '8+';
}

function pctCls(p) { return !p?'pct-none':'pct-mid'; }
function pctTxt(p) { return p===null||p===undefined?'—':p.toFixed(2)+'%'; }
function initials(nom) { return nom.split(' ').filter(w=>w.length>2).slice(0,2).map(w=>w[0]).join('').toUpperCase(); }

// ─── Optimitzador de simulació ────────────────────────────────
// Troba la millor assignació atletes↔proves per maximitzar punts totals
// Restriccions: màx 2 proves per atleta federada, màx 4 per filial
// No es pot repetir atleta en la mateixa prova individual (relleus apart)

function getBestPctForAthleteProva(athlete, prova) {
  if (!prova||prova==='—') return null;
  const ms = (athlete.marques||[]).filter(m=>m.prova===prova);
  if (!ms.length) return null;
  const pcts = ms.map(m=>calcPct(m.prova,m.marca,athlete.dob,m.any)).filter(p=>p!==null);
  return pcts.length ? Math.max(...pcts) : null;
}

function getSuggestions(athlete) {
  const byProva = {};
  (athlete.marques||[]).forEach(m=>{
    const p = calcPct(m.prova,m.marca,athlete.dob,m.any);
    if (p && (!byProva[m.prova] || p > byProva[m.prova])) byProva[m.prova] = p;
  });
  return Object.entries(byProva).sort((a,b)=>b[1]-a[1]);
}

/**
 * Algorisme greedy d'optimització:
 * Regles:
 *   - Cada atleta FEDERADA: màx 2 proves individuals
 *   - Atletes FILIALS: màx 2 proves per atleta, però entre TOTES les filials
 *     màx 4 proves en total (ex: 2+1+1 o 2+2)
 *   - Cada prova individual: 1 atleta màxima
 *   - Relleus: fins 4 atletes per relleu, 1 relleu per atleta
 * 
 * @param {Array} athletes - array d'atletes
 * @param {Array} excluded - noms exclosos
 * @param {Object} refCampeonats - referència de percentatges
 * @returns {Object} assignació { nomAtleta: [prova1, prova2] }
 */
function optimitzarSimulacio(athletes, excluded, refCampeonats) {
  const ref = refCampeonats || REF_CAMPEONATS_DEFAULT;
  const actives = athletes.filter(a => !excluded.includes(a.nom));

  // Construir totes les opcions: { atleta, prova, pct, pts }
  const opcions = [];
  actives.forEach(a => {
    const sugg = getSuggestions(a);
    sugg.forEach(([prova, pct]) => {
      const pts = estPts(prova, pct, ref);
      opcions.push({ atleta: a.nom, prova, pct, pts });
    });
  });

  // Ordenar per punts DESC, després per % DESC
  opcions.sort((a,b) => b.pts - a.pts || b.pct - a.pct);

  const assignacio = {}; // { nomAtleta: [prova] }
  const provesCobertes = {}; // { prova: nomAtleta } per individuals
  actives.forEach(a => { assignacio[a.nom] = []; });

  const esRelleu = (prova) => prova && prova.toLowerCase().includes('relleu');

  let totalFilials = 0; // proves totals assignades a filials

  opcions.forEach(op => {
    const { atleta, prova } = op;
    const esFil = isFilial(atleta);
    const provesActuals = assignacio[atleta] || [];

    if (esRelleu(prova)) {
      const relleusAtleta = provesActuals.filter(p => esRelleu(p));
      if (relleusAtleta.length >= 1) return;
      const atletesEnRelleu = Object.entries(provesCobertes)
        .filter(([k]) => k === prova).length;
      if (atletesEnRelleu >= 4) return;
    } else {
      // Prova individual: no pot estar ja coberta
      if (provesCobertes[prova]) return;
      // Màx 2 proves individuals per atleta
      const indivActuals = provesActuals.filter(p => !esRelleu(p));
      if (indivActuals.length >= 2) return;
      // Filials: màx 4 proves en total entre totes
      if (esFil && totalFilials >= 4) return;
    }

    // Assignar
    assignacio[atleta].push(prova);
    if (esRelleu(prova)) {
      if (!provesCobertes[prova]) provesCobertes[prova] = [];
      provesCobertes[prova].push(atleta);
    } else {
      provesCobertes[prova] = atleta;
      if (esFil) totalFilials++;
    }
  });

  return assignacio;
}

/**
 * Resolució de conflictes en assignació manual:
 * Si l'atleta A s'assigna a una prova ja coberta per B,
 * busca si B pot anar a una altra prova i redistribueix.
 * Retorna el nou simState optimitzat localment.
 */
function resolveConflict(simState, athletes, excluded, refCampeonats, changedNom, changedProva) {
  const ref = refCampeonats || REF_CAMPEONATS_DEFAULT;
  // Troba qui té la mateixa prova (apart del changedNom)
  const rivals = [];
  athletes.forEach(a => {
    if (a.nom === changedNom || excluded.includes(a.nom)) return;
    const st = simState[a.nom] || [];
    st.forEach((row, ri) => {
      if (row.prova === changedProva) rivals.push({ nom: a.nom, ri });
    });
  });
  if (!rivals.length) return simState; // no hi ha conflicte

  const newState = JSON.parse(JSON.stringify(simState));

  rivals.forEach(({ nom, ri }) => {
    // Intenta trobar la millor prova alternativa per a aquest rival
    const a = athletes.find(x => x.nom === nom);
    if (!a) return;
    const sugg = getSuggestions(a);
    const provesOcupades = new Set(
      athletes
        .filter(x => x.nom !== nom && !excluded.includes(x.nom))
        .flatMap(x => (newState[x.nom] || []).map(r => r.prova).filter(p => p && p !== '—'))
    );
    // Proves ja assignades a aquest atleta (apart de la conflictiva)
    const provesPropia = new Set(
      (newState[nom] || []).filter((r,i) => i !== ri).map(r => r.prova).filter(p => p && p !== '—')
    );

    let millorAlternativa = null;
    for (const [prova, pct] of sugg) {
      if (prova === changedProva) continue;
      if (provesOcupades.has(prova)) continue;
      if (provesPropia.has(prova)) continue;
      millorAlternativa = { prova, pct };
      break;
    }

    if (millorAlternativa) {
      newState[nom][ri] = { prova: millorAlternativa.prova, pct: null };
    } else {
      // No hi ha alternativa: treu la prova conflictiva del rival
      newState[nom][ri] = { prova: '—', pct: null };
    }
  });

  return newState;
}
