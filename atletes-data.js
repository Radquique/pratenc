// ═══════════════════════════════════════════════════════════════
// PRATENC AA — DADES ATLETES (actualitzat pel club)
// Per actualitzar: edita aquest fitxer i puja'l a GitHub Pages
// ═══════════════════════════════════════════════════════════════
const ATLETES_DATA = [
  {
    "nom": "ESTELA ROLDAN CARDENAS",
    "dob": "1974-12-09",
    "notes": "COMBINADES",
    "marques": [
      {
        "prova": "100m",
        "marca": "14.93",
        "any": 2025
      },
      {
        "prova": "200m",
        "marca": "30.91",
        "any": 2024
      },
      {
        "prova": "800m",
        "marca": "3:24.24",
        "any": 2022
      },
      {
        "prova": "Tanques Altes",
        "marca": "14.07",
        "any": 2025
      },
      {
        "prova": "Salt alçada",
        "marca": "1.35",
        "any": 2024
      },
      {
        "prova": "Salt llargada",
        "marca": "4.24",
        "any": 2022
      },
      {
        "prova": "Llançament pes",
        "marca": "10.90",
        "any": 2025
      },
      {
        "prova": "Llançament disc",
        "marca": "28.23",
        "any": 2025
      },
      {
        "prova": "Llançament martell",
        "marca": "25.23",
        "any": 2020
      },
      {
        "prova": "Llançament javelina",
        "marca": "24.85",
        "any": 2022
      }
    ]
  },
  {
    "nom": "NOELIA JIMENEZ PAREDES",
    "dob": "1976-12-26",
    "notes": "FONS",
    "marques": [
      {
        "prova": "1500m",
        "marca": "5:08.15",
        "any": 2025
      },
      {
        "prova": "3000m",
        "marca": "11:05.25",
        "any": 2025
      },
      {
        "prova": "5000m",
        "marca": "19:34.76",
        "any": 2024
      },
      {
        "prova": "2000m obstacles",
        "marca": "7:42.08",
        "any": 2025
      }
    ]
  },
  {
    "nom": "MARTA ALIAS ECHEVARRIA",
    "dob": "1972-09-23",
    "notes": "MIG FONS",
    "marques": [
      {
        "prova": "100m",
        "marca": "16.09",
        "any": 2021
      },
      {
        "prova": "200m",
        "marca": "31.87",
        "any": 2020
      },
      {
        "prova": "400m",
        "marca": "1:15.03",
        "any": 2023
      },
      {
        "prova": "800m",
        "marca": "2:44.87",
        "any": 2023
      },
      {
        "prova": "1500m",
        "marca": "6:31.32",
        "any": 2024
      },
      {
        "prova": "Salt llargada",
        "marca": "3.95",
        "any": 2021
      },
      {
        "prova": "Triple salt",
        "marca": "6.63",
        "any": 2025
      }
    ]
  },
  {
    "nom": "YVETTE MARIE HENRY",
    "dob": "1973-06-08",
    "notes": "VELOCISTA",
    "marques": [
      {
        "prova": "100m",
        "marca": "13.07",
        "any": 2025
      },
      {
        "prova": "200m",
        "marca": "27.93",
        "any": 2025
      }
    ]
  },
  {
    "nom": "MONICA VICENTE DURAN",
    "dob": "1977-06-21",
    "notes": "COMBINADES",
    "marques": [
      {
        "prova": "Salt alçada",
        "marca": "1.37",
        "any": 2026
      },
      {
        "prova": "Salt llargada",
        "marca": "4.64",
        "any": 2026
      },
      {
        "prova": "Triple salt",
        "marca": "10.10",
        "any": 2026
      },
      {
        "prova": "Llançament javelina",
        "marca": "27.47",
        "any": 2026
      },
      {
        "prova": "400m",
        "marca": "1:07.72",
        "any": 2025
      },
      {
        "prova": "Llançament pes",
        "marca": "7.27",
        "any": 2025
      }
    ]
  },
  {
    "nom": "GERALDINE GARCIA COLLINS",
    "dob": "1977-01-13",
    "notes": "COMBINADES",
    "marques": [
      {
        "prova": "Salt llargada",
        "marca": "4.89",
        "any": 2026
      },
      {
        "prova": "Salt alçada",
        "marca": "1.39",
        "any": 2025
      },
      {
        "prova": "Llançament javelina",
        "marca": "16.97",
        "any": 2023
      },
      {
        "prova": "400m",
        "marca": "1:20.48",
        "any": 2024
      }
    ]
  },
  {
    "nom": "ANDREA GALDAMES SESSAREGO",
    "dob": "1974-01-25",
    "notes": "FONS",
    "marques": [
      {
        "prova": "800m",
        "marca": "2:53.92",
        "any": 2026
      },
      {
        "prova": "1500m",
        "marca": "5:46.85",
        "any": 2026
      },
      {
        "prova": "3000m",
        "marca": "12:27.36",
        "any": 2026
      },
      {
        "prova": "Salt alçada",
        "marca": "1.11",
        "any": 2022
      },
      {
        "prova": "Llançament javelina",
        "marca": "9.75",
        "any": 2021
      }
    ]
  },
  {
    "nom": "CRISTINA GARCIA GONZALEZ",
    "dob": "1977-11-10",
    "notes": "LLANÇAMENTS",
    "marques": [
      {
        "prova": "Llançament pes",
        "marca": "9.39",
        "any": 2026
      },
      {
        "prova": "Llançament disc",
        "marca": "27.64",
        "any": 2026
      },
      {
        "prova": "Llançament martell",
        "marca": "28.22",
        "any": 2026
      },
      {
        "prova": "Llançament javelina",
        "marca": "26.60",
        "any": 2026
      }
    ]
  },
  {
    "nom": "SONIA GIMENEZ BORREGO",
    "dob": "1974-09-24",
    "notes": "FONS",
    "marques": [
      {
        "prova": "800m",
        "marca": "2:36.02",
        "any": 2026
      },
      {
        "prova": "1500m",
        "marca": "5:20.17",
        "any": 2026
      },
      {
        "prova": "3000m",
        "marca": "11:38.40",
        "any": 2025
      }
    ]
  },
  {
    "nom": "ISABEL LOPEZ BUENDIA",
    "dob": "1967-11-10",
    "notes": "MIG FONS",
    "marques": [
      {
        "prova": "400m",
        "marca": "1:20.64",
        "any": 2026
      },
      {
        "prova": "200m",
        "marca": "37.65",
        "any": 2024
      }
    ]
  },
  {
    "nom": "MA. PAZ MOLERO PEREZ",
    "dob": "1962-12-05",
    "notes": "LLANÇAMENTS",
    "marques": [
      {
        "prova": "Salt alçada",
        "marca": "0,90",
        "any": 2026
      },
      {
        "prova": "Llançament pes",
        "marca": "6.34",
        "any": 2026
      },
      {
        "prova": "Llançament disc",
        "marca": "14.47",
        "any": 2026
      },
      {
        "prova": "Llançament martell",
        "marca": "19.32",
        "any": 2026
      },
      {
        "prova": "Salt llargada",
        "marca": "2.25",
        "any": 2025
      },
      {
        "prova": "Llançament javelina",
        "marca": "13.86",
        "any": 2025
      }
    ]
  },
  {
    "nom": "GEMMA CASSI PADROS",
    "dob": "1973-05-28",
    "notes": "LLANÇAMENTS",
    "marques": [
      {
        "prova": "100m",
        "marca": "17.44",
        "any": 2024
      },
      {
        "prova": "Triple salt",
        "marca": "8.39",
        "any": 2024
      },
      {
        "prova": "Llançament disc",
        "marca": "32.62",
        "any": 2024
      }
    ]
  },
  {
    "nom": "PATRICIA HIDALGO FORTES",
    "dob": "1982-10-31",
    "notes": "PERXA",
    "marques": [
      {
        "prova": "100m",
        "marca": "14.81",
        "any": 2024
      },
      {
        "prova": "Salt perxa",
        "marca": "2.90",
        "any": 2026
      }
    ],
    "filial": true
  },
  {
    "nom": "CARMEN MA. SOLE DIAZ",
    "dob": "1971-12-04",
    "notes": "LLANÇAMENTS",
    "marques": [
      {
        "prova": "Llançament pes",
        "marca": "10.56",
        "any": 2025
      },
      {
        "prova": "Llançament martell",
        "marca": "40.13",
        "any": 2025
      },
      {
        "prova": "Llançament disc",
        "marca": "36.34",
        "any": 2025
      }
    ],
    "filial": true
  },
  {
    "nom": "ADHARA BARRIL NAVARRO",
    "dob": "1967-11-10",
    "notes": "MIG FONS",
    "marques": [
      {
        "prova": "400m",
        "marca": "1:20.64",
        "any": 2026
      },
      {
        "prova": "200m",
        "marca": "37.65",
        "any": 2024
      }
    ],
    "filial": true
  }
]
];