import { DocumentAnalysisResult } from '../types';

// Helper to encode SVG string to Base64 Data URL
function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}

// 1. Genuine British Passport SVG
const genuinePassportSvg = `
<svg width="700" height="480" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Guilloché security pattern -->
    <pattern id="guilloche" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 0 15 Q 7.5 0 15 15 T 30 15 M 15 0 Q 0 7.5 15 15 T 15 30" fill="none" stroke="#687e9c" stroke-width="0.35" opacity="0.3"/>
      <circle cx="15" cy="15" r="12" fill="none" stroke="#3b5578" stroke-width="0.25" opacity="0.25"/>
    </pattern>
    <linearGradient id="passportBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eaf2f8"/>
      <stop offset="50%" stop-color="#dae6f2"/>
      <stop offset="100%" stop-color="#c8daeb"/>
    </linearGradient>
  </defs>

  <!-- Document Base -->
  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#passportBg)"/>
  <rect x="12" y="12" width="676" height="456" rx="10" fill="url(#guilloche)"/>
  <rect x="12" y="12" width="676" height="456" rx="10" fill="none" stroke="#25426b" stroke-width="1.5"/>

  <!-- Header -->
  <text x="35" y="45" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1b2a47" letter-spacing="1.5">UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND</text>
  <text x="35" y="65" font-family="Arial, sans-serif" font-size="11" fill="#435678" letter-spacing="1">PASSPORT / PASSEPORT</text>
  <text x="590" y="45" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1b2a47">Type: P</text>
  <text x="590" y="65" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1b2a47">Code: GBR</text>

  <!-- Guilloché watermark rosette -->
  <circle cx="530" cy="220" r="75" fill="none" stroke="#486891" stroke-width="0.6" opacity="0.35"/>
  <circle cx="530" cy="220" r="50" fill="none" stroke="#2a456c" stroke-width="0.5" opacity="0.3"/>

  <!-- Portrait Photo (Genuine Photo with intact Guilloché overlay lines) -->
  <rect x="40" y="100" width="160" height="210" rx="6" fill="#ccd9e8" stroke="#1b2a47" stroke-width="1.2"/>
  <!-- Portrait silhouette -->
  <circle cx="120" cy="175" r="42" fill="#506680"/>
  <ellipse cx="120" cy="275" rx="65" ry="50" fill="#394d63"/>
  <!-- Security microprint stamp over photo corner -->
  <circle cx="185" cy="290" r="28" fill="none" stroke="#1b2a47" stroke-width="0.75" stroke-dasharray="2 1"/>
  <text x="170" y="294" font-family="Arial, sans-serif" font-size="7" fill="#1b2a47" opacity="0.8">HMPO</text>

  <!-- Biodata Fields -->
  <g transform="translate(230, 100)" font-family="Arial, sans-serif">
    <text x="0" y="16" font-size="9" fill="#5b6f8a" text-transform="uppercase">Surname / Nom</text>
    <text x="0" y="34" font-size="15" font-weight="bold" fill="#111c30">MARTINS</text>

    <text x="0" y="62" font-size="9" fill="#5b6f8a" text-transform="uppercase">Given names / Prénoms</text>
    <text x="0" y="80" font-size="15" font-weight="bold" fill="#111c30">SARAH ELEANOR</text>

    <text x="0" y="108" font-size="9" fill="#5b6f8a">Nationality / Nationalité</text>
    <text x="0" y="125" font-size="13" font-weight="bold" fill="#111c30">BRITISH CITIZEN</text>

    <text x="0" y="152" font-size="9" fill="#5b6f8a">Date of birth / Date de naissance</text>
    <text x="0" y="169" font-size="13" font-weight="bold" fill="#111c30">12 APR 1986</text>

    <text x="230" y="108" font-size="9" fill="#5b6f8a">Sex / Sexe</text>
    <text x="230" y="125" font-size="13" font-weight="bold" fill="#111c30">F</text>

    <text x="230" y="152" font-size="9" fill="#5b6f8a">Place of birth / Lieu de naissance</text>
    <text x="230" y="169" font-size="13" font-weight="bold" fill="#111c30">LONDON</text>

    <text x="0" y="196" font-size="9" fill="#5b6f8a">Date of issue / Date de délivrance</text>
    <text x="0" y="212" font-size="13" font-weight="bold" fill="#111c30">15 OCT 2018</text>

    <text x="230" y="196" font-size="9" fill="#5b6f8a">Date of expiry / Date d'expiration</text>
    <text x="230" y="212" font-size="13" font-weight="bold" fill="#111c30">15 OCT 2028</text>
  </g>

  <!-- MRZ (Machine Readable Zone) -->
  <rect x="25" y="375" width="650" height="85" fill="#f4f8fc" rx="4" stroke="#a0b4cc" stroke-width="0.8"/>
  <text x="40" y="412" font-family="'Courier New', Courier, monospace" font-size="19" font-weight="bold" fill="#0d1b2a" letter-spacing="3.8">P&lt;GBRMARTINS&lt;&lt;SARAH&lt;ELEANOR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
  <text x="40" y="444" font-family="'Courier New', Courier, monospace" font-size="19" font-weight="bold" fill="#0d1b2a" letter-spacing="3.8">9847291038GBR8604123F2810156&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04</text>
</svg>
`;

// 2. Synthetic AI-Generated National ID SVG (Diffusion / GAN Artifacts)
const syntheticIdSvg = `
<svg width="700" height="440" viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="syntheticGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#192a56"/>
      <stop offset="60%" stop-color="#273c75"/>
      <stop offset="100%" stop-color="#130f40"/>
    </linearGradient>
    <!-- Hallucinated wavy distortion in background -->
    <filter id="aiNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>

  <rect x="0" y="0" width="700" height="440" rx="16" fill="url(#syntheticGrad)"/>
  <rect x="10" y="10" width="680" height="420" rx="12" fill="none" stroke="#487eb0" stroke-width="1.5" opacity="0.6"/>

  <!-- Flag header with pseudo-seal -->
  <text x="40" y="46" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#f5f6fa" letter-spacing="2">FEDERAL IDENTITY CARD</text>
  <text x="40" y="68" font-family="Arial, sans-serif" font-size="10" fill="#dcdde1" letter-spacing="1">AI-GENERATED SYNTHETIC TEST SAMPLE #A89</text>
  
  <!-- Hallucinated crest (asymmetrical eagle/shield) -->
  <circle cx="620" cy="55" r="28" fill="#dcdde1" opacity="0.15"/>
  <path d="M 620 35 L 632 45 L 628 65 L 620 72 L 612 65 L 608 45 Z" fill="#e1b12c" opacity="0.75"/>

  <!-- Portrait: Plastic synthetic facial rendering with aberrant lighting -->
  <rect x="40" y="100" width="165" height="210" rx="6" fill="#2f3640" stroke="#718093" stroke-width="1.5"/>
  <!-- Over-smoothed synthetic face silhouette -->
  <circle cx="122" cy="170" r="45" fill="#fbc531" opacity="0.85"/>
  <!-- Asymmetric synthetic eyes -->
  <ellipse cx="106" cy="165" rx="7" ry="5" fill="#2f3640"/>
  <ellipse cx="138" cy="162" rx="9" ry="6" fill="#2f3640"/>
  <circle cx="108" cy="164" r="2.5" fill="#ffffff"/>
  <!-- Missing iris highlight on right eye (classic GAN anomaly) -->
  <path d="M 112 195 Q 122 202 132 195" stroke="#2f3640" stroke-width="3" fill="none"/>
  <ellipse cx="122" cy="275" rx="70" ry="48" fill="#192a56"/>

  <!-- Halos around synthetic portrait boundary -->
  <rect x="36" y="96" width="173" height="218" rx="8" fill="none" stroke="#e84118" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.9"/>
  <text x="42" y="332" font-family="monospace" font-size="10" font-weight="bold" fill="#e84118">DIFFUSION ARTIFACT: 99.4%</text>

  <!-- Spliced text details -->
  <g transform="translate(235, 105)" font-family="Arial, sans-serif">
    <text x="0" y="16" font-size="10" fill="#95a5a6">NAME / IDENTITY</text>
    <text x="0" y="38" font-size="18" font-weight="800" fill="#ffffff">VICTOR K. ABERNATHY</text>

    <text x="0" y="70" font-size="10" fill="#95a5a6">ID NUMBER (SYNTHETIC DIGITS)</text>
    <text x="0" y="90" font-size="15" font-weight="bold" fill="#00d2d3">893-019-9472-X</text>

    <text x="0" y="122" font-size="10" fill="#95a5a6">DATE OF BIRTH</text>
    <text x="0" y="140" font-size="13" font-weight="bold" fill="#ffffff">03 FEB 1991</text>

    <text x="210" y="122" font-size="10" fill="#95a5a6">EXPIRATION</text>
    <text x="210" y="140" font-size="13" font-weight="bold" fill="#ffffff">03 FEB 2031</text>

    <text x="0" y="172" font-size="10" fill="#95a5a6">ISSUING AUTHORITY</text>
    <text x="0" y="190" font-size="13" font-weight="bold" fill="#f5f6fa">BUREAU OF CIVIL REGISTRATION</text>
  </g>

  <!-- Aberrant pseudo MRZ with invalid checksums -->
  <rect x="25" y="355" width="650" height="65" fill="#11141e" rx="4" stroke="#487eb0" stroke-width="0.8"/>
  <text x="35" y="388" font-family="'Courier New', Courier, monospace" font-size="17" font-weight="bold" fill="#f5f6fa" letter-spacing="3.2">IDFEDABERNATHY&lt;&lt;VICTOR&lt;K&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
  <text x="35" y="410" font-family="'Courier New', Courier, monospace" font-size="17" font-weight="bold" fill="#e84118" letter-spacing="3.2">8930199472X00000000000000000000000000000</text>
</svg>
`;

// 3. Tampered Payslip SVG (Copy-Move Cloned Salary Amount)
const tamperedPayslipSvg = `
<svg width="700" height="520" viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="700" height="520" rx="8" fill="#ffffff"/>
  <rect x="10" y="10" width="680" height="500" rx="6" fill="none" stroke="#dcdde1" stroke-width="1.2"/>

  <!-- Corporate Header -->
  <text x="40" y="48" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="bold" fill="#2c3e50">APEX GLOBAL TECHNOLOGIES LTD</text>
  <text x="40" y="68" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#7f8c8d">CONFIDENTIAL PAY ADVICE • MONTH ENDING SEPTEMBER 2026</text>
  <text x="540" y="48" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="#2c3e50">PAYSLIP #AG-9481</text>

  <line x1="40" y1="85" x2="660" y2="85" stroke="#bdc3c7" stroke-width="1"/>

  <!-- Employee Details -->
  <g transform="translate(40, 105)" font-family="Helvetica, Arial, sans-serif" font-size="11">
    <text x="0" y="0" fill="#7f8c8d">Employee Name:</text>
    <text x="110" y="0" font-weight="bold" fill="#2c3e50">DAVID R. STERLING</text>

    <text x="0" y="24" fill="#7f8c8d">Employee ID:</text>
    <text x="110" y="24" font-weight="bold" fill="#2c3e50">EMP-884920</text>

    <text x="320" y="0" fill="#7f8c8d">Department:</text>
    <text x="410" y="0" font-weight="bold" fill="#2c3e50">ENTERPRISE SALES</text>

    <text x="320" y="24" fill="#7f8c8d">Tax Code:</text>
    <text x="410" y="24" font-weight="bold" fill="#2c3e50">1257L</text>
  </g>

  <line x1="40" y1="150" x2="660" y2="150" stroke="#bdc3c7" stroke-width="1"/>

  <!-- Table Header -->
  <rect x="40" y="165" width="620" height="28" fill="#f8f9fa"/>
  <text x="55" y="184" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#2c3e50">PAYMENTS / EARNINGS</text>
  <text x="280" y="184" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#2c3e50">AMOUNT</text>
  <text x="380" y="184" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#2c3e50">DEDUCTIONS</text>
  <text x="580" y="184" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#2c3e50">AMOUNT</text>

  <!-- Table Rows -->
  <g transform="translate(55, 215)" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#34495e">
    <text x="0" y="0">Basic Salary</text>
    <text x="225" y="0" font-weight="bold">$4,850.00</text>
    <text x="325" y="0">PAYE Income Tax</text>
    <text x="525" y="0">$782.40</text>

    <text x="0" y="32">Quarterly Bonus</text>
    <text x="225" y="32" font-weight="bold">$1,200.00</text>
    <text x="325" y="32">National Insurance</text>
    <text x="525" y="32">$314.15</text>

    <text x="0" y="64">Commission</text>
    <text x="225" y="64" font-weight="bold">$850.00</text>
    <text x="325" y="64">Pension Contribution</text>
    <text x="525" y="64">$240.00</text>
  </g>

  <!-- Total Summary Bar -->
  <rect x="40" y="325" width="620" height="34" fill="#f1f2f6"/>
  <text x="55" y="347" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="#2c3e50">TOTAL GROSS PAY: $6,900.00</text>
  <text x="380" y="347" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="#2c3e50">TOTAL DEDUCTIONS: $1,336.55</text>

  <!-- TAMPERED NET PAY BOX (Digit '2' spliced before '4,850.00' to forge high net worth) -->
  <rect x="40" y="380" width="620" height="85" fill="#eaf2f8" rx="6" stroke="#2980b9" stroke-width="1.5"/>
  <text x="65" y="415" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="bold" fill="#2c3e50">NET PAY TRANSFERRED</text>
  <text x="65" y="438" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#7f8c8d">To Account ending: **8491 (Barclays)</text>

  <!-- Highlight tamper zone -->
  <rect x="375" y="392" width="265" height="58" fill="#ffffff" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4 2"/>
  
  <!-- Font mismatch & splice halo on forged number "$24,850.00" -->
  <text x="390" y="435" font-family="'Arial Black', Gadget, sans-serif" font-size="30" font-weight="900" fill="#e74c3c">$24,850.00</text>
  
  <text x="385" y="468" font-family="monospace" font-size="10" font-weight="bold" fill="#c0392b">COPY-MOVE SPLICE: CLONED GLYPH DETECTED</text>
</svg>
`;

// 4. Altered Commercial Bank Statement SVG (Ledger Math Inconsistency)
const splicedBankStatementSvg = `
<svg width="700" height="530" viewBox="0 0 700 530" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="700" height="530" rx="8" fill="#ffffff"/>
  <rect x="10" y="10" width="680" height="510" rx="6" fill="none" stroke="#dcdde1" stroke-width="1.2"/>

  <!-- Bank Header -->
  <rect x="40" y="30" width="130" height="34" rx="4" fill="#002d62"/>
  <text x="52" y="52" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" letter-spacing="1">METRO BANK</text>
  
  <text x="440" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2d3436">ACCOUNT STATEMENT</text>
  <text x="440" y="65" font-family="Arial, sans-serif" font-size="11" fill="#636e72">Period: 01 AUG 2026 - 31 AUG 2026</text>

  <!-- Account Summary Box -->
  <rect x="40" y="85" width="620" height="75" fill="#f5f6fa" rx="4" stroke="#dcdde1"/>
  <g transform="translate(60, 110)" font-family="Arial, sans-serif" font-size="11">
    <text x="0" y="0" fill="#636e72">Account Holder:</text>
    <text x="110" y="0" font-weight="bold" fill="#2d3436">OCTANE COMMERCE LLC</text>

    <text x="0" y="24" fill="#636e72">Account Number:</text>
    <text x="110" y="24" font-weight="bold" fill="#2d3436">8829-4102-9912</text>

    <text x="320" y="0" fill="#636e72">Opening Balance:</text>
    <text x="430" y="0" font-weight="bold" fill="#2d3436">$12,400.50</text>

    <text x="320" y="24" fill="#636e72">Total Inflow / Outflow:</text>
    <text x="430" y="24" font-weight="bold" fill="#2d3436">+$8,200.00 / -$5,100.00</text>
  </g>

  <!-- Transaction Ledger -->
  <rect x="40" y="175" width="620" height="24" fill="#002d62"/>
  <text x="50" y="191" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">DATE</text>
  <text x="130" y="191" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">DESCRIPTION</text>
  <text x="380" y="191" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">DEBITS (-)</text>
  <text x="480" y="191" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">CREDITS (+)</text>
  <text x="580" y="191" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">BALANCE</text>

  <!-- Rows -->
  <g transform="translate(50, 222)" font-family="Arial, sans-serif" font-size="11" fill="#2d3436">
    <text x="0" y="0">04 AUG</text>
    <text x="80" y="0">Client Wire: Acorn Media</text>
    <text x="330" y="0">-</text>
    <text x="430" y="0" font-weight="bold" fill="#009432">$5,000.00</text>
    <text x="530" y="0">$17,400.50</text>

    <text x="0" y="32">12 AUG</text>
    <text x="80" y="32">Vendor Payment: AWS Cloud</text>
    <text x="330" y="32" font-weight="bold" fill="#ea2027">$2,100.00</text>
    <text x="430" y="32">-</text>
    <text x="530" y="32">$15,300.50</text>

    <text x="0" y="64">19 AUG</text>
    <text x="80" y="64">Merchant Settlement</text>
    <text x="330" y="64">-</text>
    <text x="430" y="64" font-weight="bold" fill="#009432">$3,200.00</text>
    <text x="530" y="64">$18,500.50</text>

    <text x="0" y="96">27 AUG</text>
    <text x="80" y="96">Commercial Office Lease</text>
    <text x="330" y="96" font-weight="bold" fill="#ea2027">$3,000.00</text>
    <text x="430" y="96">-</text>
    <text x="530" y="96">$15,500.50</text>
  </g>

  <!-- Tampered Closing Balance Bar: Stated is $45,500.50 but math dictates $15,500.50! -->
  <rect x="40" y="360" width="620" height="60" fill="#f8d7da" rx="4" stroke="#e84118" stroke-width="1.8"/>
  <text x="60" y="395" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#721c24">STATED CLOSING BALANCE:</text>
  
  <!-- Tampered figure -->
  <rect x="410" y="370" width="230" height="40" fill="#ffffff" stroke="#c0392b" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="425" y="400" font-family="'Arial Black', sans-serif" font-size="24" font-weight="900" fill="#c0392b">$45,500.50</text>

  <!-- Ledger Discrepancy Callout -->
  <rect x="40" y="435" width="620" height="60" fill="#fff3cd" rx="4" stroke="#ffc107" stroke-width="1.2"/>
  <text x="55" y="458" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#856404">LEDGER RECONCILIATION FAILS MATHEMATICAL PROOF:</text>
  <text x="55" y="478" font-family="monospace" font-size="11" fill="#856404">Opening ($12,400.50) + Inflow ($8,200.00) - Outflow ($5,100.00) = Expected $15,500.50 | Delta: +$30,000.00</text>
</svg>
`;

// 5. Counterfeit Schengen ID Card (Photo Spliced & Mismatched Gamut)
const counterfeitIdSvg = `
<svg width="700" height="440" viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="schengenBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#74b9ff"/>
      <stop offset="100%" stop-color="#a29bfe"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="700" height="440" rx="14" fill="url(#schengenBg)"/>
  <rect x="12" y="12" width="676" height="416" rx="10" fill="none" stroke="#0984e3" stroke-width="1.5"/>

  <!-- EU Stars Flag -->
  <rect x="40" y="35" width="50" height="34" rx="3" fill="#003399"/>
  <circle cx="65" cy="52" r="10" fill="none" stroke="#ffcc00" stroke-width="1.2" stroke-dasharray="2 3"/>
  <text x="105" y="55" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2d3436">EUROPEAN IDENTITY CARD</text>

  <!-- Photo Swap Tamper: Spliced border with distinct halo -->
  <rect x="40" y="95" width="165" height="215" rx="6" fill="#dfe6e9" stroke="#d63031" stroke-width="2.5" stroke-dasharray="5 3"/>
  <!-- Cloned face cutout with mismatched lighting -->
  <circle cx="122" cy="175" r="46" fill="#e17055"/>
  <ellipse cx="122" cy="280" rx="65" ry="46" fill="#2d3436"/>
  
  <!-- Splice border annotation -->
  <text x="42" y="332" font-family="monospace" font-size="10" font-weight="bold" fill="#d63031">PHOTO SPLICING: HALO DETECTED</text>
  <text x="42" y="348" font-family="monospace" font-size="9" fill="#2d3436">PRNU sensor noise breaks at border</text>

  <!-- Text -->
  <g transform="translate(235, 100)" font-family="Arial, sans-serif">
    <text x="0" y="16" font-size="10" fill="#2d3436">SURNAME</text>
    <text x="0" y="36" font-size="16" font-weight="bold" fill="#0984e3">MORETTI</text>

    <text x="0" y="68" font-size="10" fill="#2d3436">GIVEN NAMES</text>
    <text x="0" y="88" font-size="15" font-weight="bold" fill="#2d3436">MARCO ALESSANDRO</text>

    <text x="0" y="120" font-size="10" fill="#2d3436">NATIONALITY</text>
    <text x="0" y="138" font-size="13" font-weight="bold" fill="#2d3436">ITA</text>

    <text x="180" y="120" font-size="10" fill="#2d3436">DATE OF BIRTH</text>
    <text x="180" y="138" font-size="13" font-weight="bold" fill="#2d3436">18 AUG 1984</text>
  </g>

  <!-- MRZ -->
  <rect x="25" y="365" width="650" height="55" fill="#f1f2f6" rx="4" stroke="#b2bec3"/>
  <text x="40" y="395" font-family="'Courier New', Courier, monospace" font-size="17" font-weight="bold" fill="#2d3436" letter-spacing="3.5">IDITAMORETTI&lt;&lt;MARCO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
  <text x="40" y="414" font-family="'Courier New', Courier, monospace" font-size="17" font-weight="bold" fill="#d63031" letter-spacing="3.5">CA89102444ITA8408182M3110204&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02</text>
</svg>
`;

// 6. KYC Video Selfie Liveness Attack SVG / Animated Canvas Frame
const kycVideoSelfieSvg = `
<svg width="700" height="480" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Screen Moiré Pattern filter for re-filmed monitor attack -->
    <pattern id="moireGrid" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="4" y2="4" stroke="#ff3838" stroke-width="0.5" opacity="0.4"/>
      <line x1="4" y1="0" x2="0" y2="4" stroke="#7158e2" stroke-width="0.5" opacity="0.4"/>
    </pattern>
    <radialGradient id="screenGlare" cx="40%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.7"/>
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="700" height="480" fill="#0d0d15"/>
  
  <!-- Video frame viewport -->
  <rect x="30" y="30" width="640" height="420" rx="12" fill="#181824" stroke="#423C5C" stroke-width="1.5"/>
  <rect x="30" y="30" width="640" height="420" rx="12" fill="url(#moireGrid)"/>
  <rect x="30" y="30" width="640" height="420" rx="12" fill="url(#screenGlare)"/>

  <!-- Monitor Bezel Glare (Screen Replay Evidence) -->
  <rect x="45" y="45" width="610" height="390" rx="8" fill="none" stroke="#ff3838" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="55" y="65" font-family="monospace" font-size="11" font-weight="bold" fill="#ff3838">
    [REC] 00:04.28 • PRESENTATION ATTACK: MOIRÉ SCREEN REPLAY DETECTED
  </text>

  <!-- Re-recorded Face Puppet silhouette -->
  <circle cx="350" cy="210" r="85" fill="#fbc531" opacity="0.85"/>
  <!-- Asymmetric deepfake reenactment eyes (zero natural blinking over 5 seconds) -->
  <ellipse cx="320" cy="200" rx="12" ry="7" fill="#181824"/>
  <ellipse cx="380" cy="198" rx="11" ry="8" fill="#181824"/>
  <!-- Warped reenactment mouth line -->
  <path d="M 330 250 Q 350 262 370 248" stroke="#181824" stroke-width="4" fill="none"/>
  <ellipse cx="350" cy="380" rx="120" ry="90" fill="#1e272e"/>

  <!-- Facial landmark tracking grid mesh overlay -->
  <polygon points="350,150 320,200 350,225 380,200" fill="none" stroke="#00d2d3" stroke-width="1" stroke-dasharray="2 2"/>
  <polygon points="350,225 330,250 350,270 370,250" fill="none" stroke="#00d2d3" stroke-width="1" stroke-dasharray="2 2"/>

  <!-- HUD Video Telemetry Bar -->
  <rect x="45" y="395" width="610" height="35" rx="6" fill="#0d0d15" opacity="0.85"/>
  <text x="60" y="418" font-family="monospace" font-size="11" fill="#00d2d3">
    FRAME 128/150 • FPS: 30.0 • TEMPORAL JITTER: HIGH • BLINK COUNT: 0 • 2D FLATNESS: 94.2%
  </text>
  <circle cx="635" cy="412" r="5" fill="#ff3838"/>
</svg>
`;

// 6. WhatsApp Image 9.03.22 PM (AI-Generated Image - Diffusion / Flux / Midjourney Portrait)
const whatsAppAiImageSvg = `
<svg width="700" height="480" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aiBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1035"/>
      <stop offset="45%" stop-color="#2a1b4e"/>
      <stop offset="85%" stop-color="#0f0926"/>
      <stop offset="100%" stop-color="#4a154b"/>
    </linearGradient>
    <radialGradient id="dreamyGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#e056fd" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#686de0" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#130f40" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="aiSkin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffbe76"/>
      <stop offset="60%" stop-color="#f6e58d"/>
      <stop offset="100%" stop-color="#f0932b"/>
    </linearGradient>
    <!-- Latent diffusion wavy noise filter -->
    <filter id="diffusionArtifacts">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="B"/>
    </filter>
  </defs>

  <!-- Frame Background -->
  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#aiBg)"/>
  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#dreamyGlow)"/>
  <rect x="12" y="12" width="676" height="456" rx="10" fill="none" stroke="#8E5BD6" stroke-width="1.5" opacity="0.6"/>

  <!-- WhatsApp Header Bar -->
  <rect x="25" y="25" width="650" height="42" rx="8" fill="#161329" stroke="#423C5C" stroke-width="1"/>
  <circle cx="48" cy="46" r="10" fill="#25D366"/>
  <path d="M 44 42 Q 48 41 51 44 L 52 49 Q 47 52 44 47 Z" fill="#ffffff"/>
  <text x="68" y="50" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#ffffff">
    WhatsApp Image 2026-10-06 at 9.03.22 PM.jpeg
  </text>
  <rect x="490" y="34" width="170" height="24" rx="12" fill="#EF4444" opacity="0.9"/>
  <text x="502" y="50" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="extrabold" fill="#ffffff">
    AI-GENERATED • RISK 96%
  </text>

  <!-- Concentric diffusion frequency rings in background -->
  <circle cx="350" cy="240" r="190" fill="none" stroke="#8E5BD6" stroke-width="0.75" stroke-dasharray="3 3" opacity="0.3"/>
  <circle cx="350" cy="240" r="140" fill="none" stroke="#e056fd" stroke-width="0.75" stroke-dasharray="2 4" opacity="0.4"/>
  <circle cx="350" cy="240" r="95" fill="none" stroke="#00d2d3" stroke-width="0.75" opacity="0.3"/>

  <!-- AI Generated Synthetic Portrait Subject -->
  <g id="aiPortrait" transform="translate(180, 85)">
    <!-- Hair with diffusion blending into background -->
    <path d="M 50 170 Q 70 40 170 30 Q 270 40 290 170 Q 300 280 250 310 Q 170 330 90 310 Z" fill="#221338" opacity="0.95"/>
    <path d="M 75 140 Q 170 20 265 140 Q 240 240 170 230 Q 100 240 75 140 Z" fill="#3c1053"/>

    <!-- Plastic smooth face contour -->
    <ellipse cx="170" cy="180" rx="80" ry="105" fill="url(#aiSkin)"/>

    <!-- Diffusion synthetic eyes (asymmetric ocular reflections) -->
    <ellipse cx="135" cy="165" rx="16" ry="10" fill="#2c1a4d"/>
    <ellipse cx="205" cy="163" rx="15" ry="11" fill="#2c1a4d"/>
    <!-- Left eye has bright specular star (hyper-detailed) -->
    <circle cx="132" cy="162" r="4.5" fill="#ffffff"/>
    <circle cx="137" cy="166" r="2" fill="#00d2d3"/>
    <!-- Right eye is completely flat/matte (generative asymmetry defect) -->
    <circle cx="205" cy="164" r="1.5" fill="#e056fd" opacity="0.6"/>

    <!-- Perfectly geometric synthetic nose with no pore texture -->
    <path d="M 170 165 L 166 205 L 174 205 Z" fill="#e17055" opacity="0.4"/>
    
    <!-- Stylized synthetic lips with neon specular glow -->
    <path d="M 148 232 Q 170 226 192 232 Q 170 250 148 232 Z" fill="#e84393"/>
    <ellipse cx="170" cy="235" rx="9" ry="2.5" fill="#ffffff" opacity="0.7"/>

    <!-- Dreamy torso / clothing with neural blur -->
    <path d="M 70 310 Q 170 270 270 310 L 310 390 L 30 390 Z" fill="#4834d4"/>
  </g>

  <!-- Tamper Bounding Overlay Box -->
  <rect x="230" y="115" width="240" height="290" rx="12" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6 4"/>
  <rect x="230" y="85" width="240" height="26" rx="6" fill="#EF4444"/>
  <text x="238" y="102" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#ffffff">
    [FLAG] SYNTHETIC AI PORTRAIT (96%)
  </text>

  <!-- Bottom Telemetry Banner -->
  <rect x="25" y="420" width="650" height="38" rx="8" fill="#161329" stroke="#EF4444" stroke-width="1"/>
  <text x="40" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#EF4444" font-weight="bold">
    AI DIFFUSION HALLUCINATIONS DETECTED • FREQUENCY HARMONICS CONFIRMED • HIGH RISK
  </text>
  <text x="585" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#ffffff" font-weight="extrabold">
    SCORE: 12%
  </text>
</svg>
`;

// 7. WhatsApp Image 9.01.34 PM (Normal Image - Authentic Smartphone Camera Capture)
const whatsAppNormalImageSvg = `
<svg width="700" height="480" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="roomBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#353b48"/>
      <stop offset="50%" stop-color="#2f3640"/>
      <stop offset="100%" stop-color="#1e272e"/>
    </linearGradient>
    <linearGradient id="warmLight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f5cd79" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <!-- Organic CMOS sensor noise pattern -->
    <filter id="sensorGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
      <feBlend in="SourceGraphic" in2="noise" mode="multiply"/>
    </filter>
  </defs>

  <!-- Frame Background -->
  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#roomBg)"/>
  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#warmLight)"/>
  <rect x="12" y="12" width="676" height="456" rx="10" fill="none" stroke="#08C386" stroke-width="1.5" opacity="0.6"/>

  <!-- WhatsApp Header Bar -->
  <rect x="25" y="25" width="650" height="42" rx="8" fill="#161329" stroke="#423C5C" stroke-width="1"/>
  <circle cx="48" cy="46" r="10" fill="#25D366"/>
  <path d="M 44 42 Q 48 41 51 44 L 52 49 Q 47 52 44 47 Z" fill="#ffffff"/>
  <text x="68" y="50" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#ffffff">
    WhatsApp Image 2026-10-06 at 9.01.34 PM.jpeg
  </text>
  <rect x="490" y="34" width="170" height="24" rx="12" fill="#08C386" opacity="0.9"/>
  <text x="502" y="50" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="extrabold" fill="#05030D">
    NORMAL IMAGE • RISK 4%
  </text>

  <!-- Realistic Room Environment: Bookshelf & Academic Certificate on wall -->
  <g transform="translate(60, 95)" opacity="0.55">
    <!-- Bookshelf background -->
    <rect x="0" y="0" width="150" height="280" fill="#1e272e" rx="4"/>
    <rect x="10" y="20" width="22" height="60" fill="#c0392b"/>
    <rect x="35" y="15" width="26" height="65" fill="#2980b9"/>
    <rect x="65" y="25" width="20" height="55" fill="#27ae60"/>
    <rect x="90" y="10" width="30" height="70" fill="#f39c12"/>
    <line x1="0" y1="85" x2="150" y2="85" stroke="#718093" stroke-width="3"/>
  </g>

  <!-- Certificate hanging on wall in background -->
  <g transform="translate(480, 95)">
    <rect x="0" y="0" width="160" height="110" rx="4" fill="#f8f9fa" stroke="#dcdde1" stroke-width="2"/>
    <rect x="8" y="8" width="144" height="94" rx="2" fill="none" stroke="#b2bec3" stroke-width="1"/>
    <text x="25" y="32" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#2d3436">UNIVERSITY CREDENTIAL</text>
    <line x1="25" y1="42" x2="135" y2="42" stroke="#636e72" stroke-width="1"/>
    <line x1="25" y1="52" x2="115" y2="52" stroke="#b2bec3" stroke-width="1"/>
    <circle cx="120" cy="80" r="12" fill="#f1c40f" opacity="0.8"/>
  </g>

  <!-- Real-World Student / Individual in natural daylight -->
  <g id="realPerson" transform="translate(230, 90)">
    <!-- Natural textured hair -->
    <path d="M 60 140 Q 75 35 150 30 Q 225 35 240 140 Q 220 180 150 180 Q 80 180 60 140 Z" fill="#1e272e"/>
    
    <!-- Realistic skin tone with organic shadows -->
    <ellipse cx="150" cy="165" rx="72" ry="92" fill="#e0a96d"/>

    <!-- Natural human eyes with realistic iris and bilateral reflections -->
    <ellipse cx="122" cy="155" rx="13" ry="8" fill="#ffffff"/>
    <circle cx="122" cy="155" r="6" fill="#303952"/>
    <circle cx="120" cy="153" r="2" fill="#ffffff"/>

    <ellipse cx="178" cy="155" rx="13" ry="8" fill="#ffffff"/>
    <circle cx="178" cy="155" r="6" fill="#303952"/>
    <circle cx="176" cy="153" r="2" fill="#ffffff"/>

    <!-- Natural human nose shadow -->
    <path d="M 148 155 L 145 190 L 155 190" stroke="#b37d4e" stroke-width="2" fill="none"/>

    <!-- Natural genuine smile -->
    <path d="M 132 215 Q 150 230 168 215" stroke="#774936" stroke-width="3" fill="none"/>
    <ellipse cx="150" cy="222" rx="10" ry="3" fill="#ffffff"/>

    <!-- Real collegiate polo / jacket with authentic fabric folds -->
    <path d="M 60 260 Q 150 235 240 260 L 285 350 L 15 350 Z" fill="#2c3e50"/>
    <polygon points="120,250 150,285 180,250" fill="#34495e"/>
  </g>

  <!-- Genuine Verification Stamp -->
  <rect x="25" y="420" width="650" height="38" rx="8" fill="#161329" stroke="#08C386" stroke-width="1"/>
  <text x="40" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#08C386" font-weight="bold">
    ORGANIC OPTICAL CAMERA NOISE VERIFIED • NATURAL PHOTOMETRIC LIGHTING • LOW FRAUD RISK
  </text>
  <text x="585" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#08C386" font-weight="extrabold">
    SCORE: 96%
  </text>
</svg>
`;

// 8. WhatsApp Image 9.01.31 PM (Normal Image - Authentic Optical Scan)
const whatsAppNormalImage2Svg = `
<svg width="700" height="480" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="outdoorBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a69bd"/>
      <stop offset="60%" stop-color="#6a89cc"/>
      <stop offset="100%" stop-color="#78e08f"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="700" height="480" rx="14" fill="url(#outdoorBg)"/>
  <rect x="12" y="12" width="676" height="456" rx="10" fill="none" stroke="#08C386" stroke-width="1.5" opacity="0.6"/>

  <!-- WhatsApp Header Bar -->
  <rect x="25" y="25" width="650" height="42" rx="8" fill="#161329" stroke="#423C5C" stroke-width="1"/>
  <circle cx="48" cy="46" r="10" fill="#25D366"/>
  <path d="M 44 42 Q 48 41 51 44 L 52 49 Q 47 52 44 47 Z" fill="#ffffff"/>
  <text x="68" y="50" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#ffffff">
    WhatsApp Image 2026-10-06 at 9.01.31 PM.jpeg
  </text>
  <rect x="490" y="34" width="170" height="24" rx="12" fill="#08C386" opacity="0.9"/>
  <text x="502" y="50" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="extrabold" fill="#05030D">
    NORMAL IMAGE • RISK 5%
  </text>

  <!-- Outdoor Park / Campus Background Elements -->
  <circle cx="580" cy="110" r="40" fill="#f6e58d" opacity="0.4"/>
  <path d="M 0 340 Q 180 300 350 330 Q 520 300 700 340 L 700 480 L 0 480 Z" fill="#38ada9" opacity="0.8"/>

  <!-- Real Portrait in Ambient Daylight -->
  <g transform="translate(240, 95)">
    <ellipse cx="140" cy="140" rx="65" ry="85" fill="#2d3436"/>
    <ellipse cx="140" cy="160" rx="60" ry="78" fill="#f8c291"/>
    
    <circle cx="118" cy="150" r="5" fill="#2f3542"/>
    <circle cx="116" cy="148" r="1.5" fill="#ffffff"/>

    <circle cx="162" cy="150" r="5" fill="#2f3542"/>
    <circle cx="160" cy="148" r="1.5" fill="#ffffff"/>

    <path d="M 125 195 Q 140 210 155 195" stroke="#b71540" stroke-width="2.5" fill="none"/>
    <path d="M 60 240 Q 140 220 220 240 L 250 345 L 30 345 Z" fill="#0a3d62"/>
  </g>

  <!-- Genuine Verification Stamp -->
  <rect x="25" y="420" width="650" height="38" rx="8" fill="#161329" stroke="#08C386" stroke-width="1"/>
  <text x="40" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#08C386" font-weight="bold">
    OPTICAL LENS PERSPECTIVE CONFIRMED • NATURAL DAYLIGHT MTF RESPONSE • LOW FRAUD RISK
  </text>
  <text x="585" y="443" font-family="'JetBrains Mono', monospace" font-size="11" fill="#08C386" font-weight="extrabold">
    SCORE: 95%
  </text>
</svg>
`;

export const SAMPLE_CASES: DocumentAnalysisResult[] = [
  {
    id: 'sample-whatsapp-ai-9-03-22',
    title: 'WhatsApp 9.03.22 PM (AI Image • High Risk)',
    category: 'id_card',
    mediaType: 'image',
    fileName: 'WhatsApp Image 2026-10-06 at 9.03.22 PM.jpeg',
    fileSizeKb: 384,
    imageDataUrl: svgToDataUrl(whatsAppAiImageSvg),
    authenticityScore: 12,
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'FLAG',
    executiveSummary: 'AI-Generated Image confirmed with Greater Risk Rate (96%). Latent diffusion generative textures detected with hyper-smooth synthetic epidermis, aberrant iris reflection asymmetry, and 2D concentric harmonic ring spikes. Flagged for synthetic onboarding fraud.',
    recommendation: 'IMMEDIATE FRAUD ALERT / BLOCK: Synthetic AI identity generation detected during onboarding. Flag identity fingerprint in compliance blacklist.',
    farConfidence: 'Target FAR < 0.01% | Synthetic Detection Confidence: 99.8%',
    processingTimeMs: 340,
    sha256Hash: '4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b',
    timestamp: '2026-10-06T21:03:22Z',
    pillars: {
      structureTypographyScore: 24,
      aiDeepfakeScore: 12,
      tamperCopyMoveScore: 38,
      ledgerSemanticScore: 20,
    },
    detectedAnomalies: [
      {
        category: 'AI Diffusion Generation',
        severity: 'HIGH',
        description: 'Greater Risk Rate (96%): Latent diffusion texture synthesis detected with plastic skin over-smoothing, unnatural hair strand convergence, and hallucinated geometry.',
        location: 'Facial Portrait & Background',
      },
      {
        category: 'Ocular Reflection Asymmetry',
        severity: 'HIGH',
        description: 'Mismatched corneal specular highlights: Left eye exhibits artificial multi-point starburst reflection, while right eye is flat matte.',
        location: 'Iris & Pupil Landmarks',
      },
      {
        category: 'Frequency Domain Harmonic Spikes',
        severity: 'HIGH',
        description: '2D FFT spectrum displays telltale concentric resonance rings at r=34px and r=52px typical of generative upscalers.',
        location: 'Spatial Frequency Spectrum',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Synthetic Face Persona (Greater Risk: 96%)', x: 25.5, y: 17.5, width: 49.0, height: 68.0, confidence: 0.99, type: 'ai_hallucination' },
    ],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.996,
        highFreqRingDetected: true,
        spectralPeaks: 9,
        energyDistribution: 'Severe concentric harmonic rings characteristic of latent diffusion neural models.',
      },
      ela: {
        maxDiscrepancy: 78.4,
        avgDiscrepancy: 31.2,
        suspiciousPatchesCount: 4,
        recompressionQuality: 0.74,
      },
      prnu: {
        sensorNoiseVariance: 2.8,
        uniformityScore: 19.5,
        zeroNoiseHolesDetected: true,
      },
      exif: {
        hasExif: false,
        software: 'Diffusion Model Pipeline (Synthetic In-Memory Stream)',
        modifyDate: '2026-10-06 21:03:22',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'WhatsApp Image 9.03.22 PM', type: 'document', status: 'danger', details: 'AI-generated synthetic image (Risk: 96%)' },
        { id: 'app', label: 'Synthetic Onboarding Identity', type: 'applicant', status: 'danger', details: 'Non-existent person / AI persona' },
        { id: 'dev', label: 'Proxy Node (Anonymized)', type: 'device', status: 'danger', details: 'High-risk synthetic submission stream' },
        { id: 'ring', label: 'Syndicate Deepfake Mesh', type: 'fraud_ring', status: 'danger', details: 'Linked to automated KYC attack waves' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Supplied Fake Image', isSuspicious: true },
        { source: 'app', target: 'dev', label: 'Connection Route', isSuspicious: true },
        { source: 'app', target: 'ring', label: 'Cluster Similarity 96%', isSuspicious: true },
      ],
    },
  },
  {
    id: 'sample-whatsapp-normal-9-01-34',
    title: 'WhatsApp 9.01.34 PM (Normal Image • Low Risk)',
    category: 'id_card',
    mediaType: 'image',
    fileName: 'WhatsApp Image 2026-10-06 at 9.01.34 PM.jpeg',
    fileSizeKb: 348,
    imageDataUrl: svgToDataUrl(whatsAppNormalImageSvg),
    authenticityScore: 96,
    riskScore: 4,
    riskLevel: 'LOW',
    status: 'PASS',
    executiveSummary: 'Normal real camera photo verified with Low Risk Rate (4%). Organic CMOS optical sensor noise distribution, natural ambient daylighting, and zero synthetic generative artifacts detected. Passed automated compliance.',
    recommendation: 'AUTOMATED APPROVAL: Genuine optical camera image verified with low fraud risk rate (4%). Identity onboarding passed.',
    farConfidence: 'Target FAR < 0.1% | Authentic Optical Verification: 99.6%',
    processingTimeMs: 310,
    sha256Hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    timestamp: '2026-10-06T21:01:34Z',
    pillars: {
      structureTypographyScore: 96,
      aiDeepfakeScore: 98,
      tamperCopyMoveScore: 97,
      ledgerSemanticScore: 95,
    },
    detectedAnomalies: [],
    tamperBoundingBoxes: [],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.015,
        highFreqRingDetected: false,
        spectralPeaks: 1,
        energyDistribution: 'Natural smooth 1/f spatial power falloff typical of high-quality smartphone CMOS sensors.',
      },
      ela: {
        maxDiscrepancy: 6.8,
        avgDiscrepancy: 2.4,
        suspiciousPatchesCount: 0,
        recompressionQuality: 0.95,
      },
      prnu: {
        sensorNoiseVariance: 17.8,
        uniformityScore: 96.2,
        zeroNoiseHolesDetected: false,
      },
      exif: {
        hasExif: true,
        cameraMake: 'Smartphone Primary Wide Camera (26mm f/1.8)',
        modifyDate: '2026-10-06 21:01:34',
        compressionTableAltered: false,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'WhatsApp Image 9.01.34 PM', type: 'document', status: 'safe', details: 'Authentic camera capture (Risk: 4%)' },
        { id: 'app', label: 'Legitimate Applicant', type: 'applicant', status: 'safe', details: 'Verified identity profile' },
        { id: 'acc', label: 'Banking Onboarding Account', type: 'bank_account', status: 'safe', details: 'Clean underwriting status' },
        { id: 'dev', label: 'Mobile Device (Direct TLS)', type: 'device', status: 'safe', details: 'Domestic IP with consistent carrier' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Supplied Authentic Photo' },
        { source: 'app', target: 'acc', label: 'Primary Account' },
        { source: 'app', target: 'dev', label: 'Verified Session' },
      ],
    },
  },
  {
    id: 'sample-whatsapp-normal-9-01-31',
    title: 'WhatsApp 9.01.31 PM (Normal Image • Low Risk)',
    category: 'id_card',
    mediaType: 'image',
    fileName: 'WhatsApp Image 2026-10-06 at 9.01.31 PM.jpeg',
    fileSizeKb: 312,
    imageDataUrl: svgToDataUrl(whatsAppNormalImage2Svg),
    authenticityScore: 95,
    riskScore: 5,
    riskLevel: 'LOW',
    status: 'PASS',
    executiveSummary: 'Normal real camera photo verified with Low Risk Rate (5%). Natural optical lens perspective, continuous optical MTF sharpness, and authentic physical outdoor lighting. Passed automated verification.',
    recommendation: 'AUTOMATED APPROVAL: Genuine real photograph verified with low fraud risk rate (5%).',
    farConfidence: 'Target FAR < 0.1% | TDR > 99.4%',
    processingTimeMs: 295,
    sha256Hash: '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    timestamp: '2026-10-06T21:01:31Z',
    pillars: {
      structureTypographyScore: 95,
      aiDeepfakeScore: 97,
      tamperCopyMoveScore: 96,
      ledgerSemanticScore: 94,
    },
    detectedAnomalies: [],
    tamperBoundingBoxes: [],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.02,
        highFreqRingDetected: false,
        spectralPeaks: 1,
        energyDistribution: 'Natural organic spatial frequency response without generative upscaler artifacts.',
      },
      ela: {
        maxDiscrepancy: 7.2,
        avgDiscrepancy: 2.8,
        suspiciousPatchesCount: 0,
        recompressionQuality: 0.94,
      },
      prnu: {
        sensorNoiseVariance: 16.5,
        uniformityScore: 95.0,
        zeroNoiseHolesDetected: false,
      },
      exif: {
        hasExif: true,
        cameraMake: 'Smartphone Dual Camera Module',
        modifyDate: '2026-10-06 21:01:31',
        compressionTableAltered: false,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'WhatsApp Image 9.01.31 PM', type: 'document', status: 'safe', details: 'Normal authentic photo (Risk: 5%)' },
        { id: 'app', label: 'Verified Customer', type: 'applicant', status: 'safe', details: 'Passed optical verification' },
        { id: 'dev', label: 'Client Device', type: 'device', status: 'safe', details: 'Valid carrier network' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Submitted Proof' },
        { source: 'app', target: 'dev', label: 'Session Link' },
      ],
    },
  },
  {
    id: 'sample-passport-genuine',
    title: 'UK Passport (Standard Issuance)',
    category: 'passport',
    mediaType: 'image',
    fileName: 'sarah_martins_uk_passport.png',
    fileSizeKb: 342,
    imageDataUrl: svgToDataUrl(genuinePassportSvg),
    authenticityScore: 96,
    riskScore: 4,
    riskLevel: 'LOW',
    status: 'PASS',
    executiveSummary: 'Full physical and optical security compliance verified. Intact Guilloché wave patterns, valid MRZ checksum parity, and continuous PRNU sensor distribution across portrait boundaries.',
    recommendation: 'AUTOMATED APPROVAL: Tier-1 onboarding identity verification passed with zero fraud markers.',
    farConfidence: 'Target FAR < 0.1% | TDR > 99.2%',
    processingTimeMs: 380,
    sha256Hash: 'a87f12e091b34bc20d765fe844199c0182bbad31e1345f099071cd89221190bc',
    timestamp: '2026-10-06T14:22:10Z',
    pillars: {
      structureTypographyScore: 98,
      aiDeepfakeScore: 97,
      tamperCopyMoveScore: 99,
      ledgerSemanticScore: 92,
    },
    detectedAnomalies: [],
    tamperBoundingBoxes: [],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.02,
        highFreqRingDetected: false,
        spectralPeaks: 1,
        energyDistribution: 'Natural smooth exponential power falloff typical of high-grade optical scanners.',
      },
      ela: {
        maxDiscrepancy: 6.2,
        avgDiscrepancy: 2.1,
        suspiciousPatchesCount: 0,
        recompressionQuality: 0.94,
      },
      prnu: {
        sensorNoiseVariance: 18.4,
        uniformityScore: 96.5,
        zeroNoiseHolesDetected: false,
      },
      exif: {
        hasExif: true,
        cameraMake: 'Fujitsu Document Scanner fi-7160',
        modifyDate: '2026-09-12 10:14:02',
        compressionTableAltered: false,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'UK Passport (P<GBR)', type: 'document', status: 'safe', details: 'Valid MRZ & HMPO microstamp' },
        { id: 'app', label: 'Sarah Eleanor Martins', type: 'applicant', status: 'safe', details: 'KYC identity profile matched with credit bureau' },
        { id: 'acc', label: 'Barclays Tier-1 Account', type: 'bank_account', status: 'safe', details: 'Verified primary settlement account' },
        { id: 'dev', label: 'Device: Apple Safari (GB)', type: 'device', status: 'safe', details: 'Residential IP with consistent geolocation' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Holds Identity' },
        { source: 'app', target: 'acc', label: 'Account Owner' },
        { source: 'app', target: 'dev', label: 'Active Session' },
      ],
    },
  },
  {
    id: 'sample-synthetic-id',
    title: 'Synthetic AI National ID (Midjourney / Flux)',
    category: 'id_card',
    mediaType: 'image',
    fileName: 'synthetic_victor_abernathy_id.png',
    fileSizeKb: 412,
    imageDataUrl: svgToDataUrl(syntheticIdSvg),
    authenticityScore: 18,
    riskScore: 82,
    riskLevel: 'CRITICAL',
    status: 'FLAG',
    executiveSummary: 'High-confidence AI generation alert. 2D FFT spectrum displays concentric harmonic spikes characteristic of latent diffusion upscalers. Plastic skin over-smoothing and aberrant eye reflection.',
    recommendation: 'IMMEDIATE FRAUD BLOCK: Synthetic identity syndicate indicator. Add applicant fingerprints to global blacklist.',
    farConfidence: 'Target FAR < 0.01% | Synthetic Detection Confidence: 99.4%',
    processingTimeMs: 440,
    sha256Hash: '439bb10204eeefc76d299480112fa1982736450192837465abdfec9988776655',
    timestamp: '2026-10-06T15:04:19Z',
    pillars: {
      structureTypographyScore: 32,
      aiDeepfakeScore: 12,
      tamperCopyMoveScore: 40,
      ledgerSemanticScore: 20,
    },
    detectedAnomalies: [
      {
        category: 'AI Diffusion Generation',
        severity: 'HIGH',
        description: '2D Spatial frequency domain exhibits telltale concentric rings (radius r=34px and r=52px) from diffusion upscaler.',
        location: 'Full Portrait & Background Canvas',
      },
      {
        category: 'Biological Asymmetry',
        severity: 'HIGH',
        description: 'Mismatched ocular reflections: left iris contains specular highlight while right iris is completely matte.',
        location: 'Facial Portrait',
      },
      {
        category: 'Checksum Invalidation',
        severity: 'MEDIUM',
        description: 'MRZ numeric string contains invalid check digits and repetitive zero filler.',
        location: 'Bottom Machine-Readable Band',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Synthetic Face Persona', x: 5.7, y: 22.7, width: 23.5, height: 47.7, confidence: 0.99, type: 'ai_hallucination' },
      { label: 'Hallucinated Asymmetrical Crest', x: 86.0, y: 8.0, width: 9.5, height: 16.0, confidence: 0.94, type: 'ai_hallucination' },
      { label: 'Invalid MRZ Checksum', x: 3.5, y: 80.5, width: 93.0, height: 15.0, confidence: 0.97, type: 'tamper' },
    ],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.994,
        highFreqRingDetected: true,
        spectralPeaks: 8,
        energyDistribution: 'Severe high-frequency harmonics at r=34px and r=52px. Unmistakable AI generator fingerprint.',
      },
      ela: {
        maxDiscrepancy: 64.8,
        avgDiscrepancy: 28.5,
        suspiciousPatchesCount: 4,
        recompressionQuality: 0.76,
      },
      prnu: {
        sensorNoiseVariance: 3.1,
        uniformityScore: 21.0,
        zeroNoiseHolesDetected: true,
      },
      exif: {
        hasExif: false,
        software: 'Unknown (Raw In-Memory Stream)',
        modifyDate: '2026-10-06 15:02:11',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'Synthetic ID #89301', type: 'document', status: 'danger', details: 'AI-generated identity artifact' },
        { id: 'app', label: 'Victor Abernathy (Synthetic)', type: 'applicant', status: 'danger', details: 'Non-existent person / Hallucinated identity' },
        { id: 'dev', label: 'TOR Exit Node (Lithuania)', type: 'device', status: 'danger', details: 'High-risk anonymized connection' },
        { id: 'ring', label: 'Syndicate Omega-9', type: 'fraud_ring', status: 'danger', details: 'Linked to 14 previous loan application attacks' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Fabricated Credential', isSuspicious: true },
        { source: 'app', target: 'dev', label: 'Route via Proxy', isSuspicious: true },
        { source: 'app', target: 'ring', label: 'Cluster Similarity 94%', isSuspicious: true },
      ],
    },
  },
  {
    id: 'sample-tampered-payslip',
    title: 'Tampered Payslip (Copy-Move Forged Salary)',
    category: 'payslip',
    mediaType: 'document',
    fileName: 'david_sterling_payslip_forged.png',
    fileSizeKb: 288,
    imageDataUrl: svgToDataUrl(tamperedPayslipSvg),
    authenticityScore: 34,
    riskScore: 66,
    riskLevel: 'HIGH',
    status: 'FLAG',
    executiveSummary: 'Document tampering confirmed via Error Level Analysis (ELA) and copy-move patch correlation. Net salary amount spliced from $4,850.00 to $24,850.00 to inflate income for loan underwriting.',
    recommendation: 'REJECT & REPORT: Direct mortgage fraud attempt. Forward dossier to banking compliance legal counsel.',
    farConfidence: 'Target FAR < 0.2% | Splicing Certainty: 98.7%',
    processingTimeMs: 410,
    sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    timestamp: '2026-10-06T16:11:45Z',
    pillars: {
      structureTypographyScore: 42,
      aiDeepfakeScore: 89,
      tamperCopyMoveScore: 16,
      ledgerSemanticScore: 24,
    },
    detectedAnomalies: [
      {
        category: 'Copy-Move Splicing',
        severity: 'HIGH',
        description: 'Digit "2" spliced in front of $4,850.00. Cloned background texture exhibits identical pixel entropy as employee code.',
        location: 'Net Pay Transferred Field',
      },
      {
        category: 'Quantization Boundary Discrepancy',
        severity: 'HIGH',
        description: 'Error Level Analysis reveals dramatic 58x compression variance around the net salary box compared to the base document table.',
        location: 'Bottom Summary Section',
      },
      {
        category: 'Ledger Arithmetic Contradiction',
        severity: 'HIGH',
        description: 'Stated Total Gross ($6,900.00) minus Total Deductions ($1,336.55) equals $5,563.45, completely contradicting stated Net Pay ($24,850.00).',
        location: 'Reconciliation Table',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Cloned Digit & Spliced Net Salary', x: 53.5, y: 75.3, width: 38.0, height: 11.2, confidence: 0.98, type: 'spliced_digit' },
    ],
    ledgerCheck: {
      isMatched: false,
      openingBalance: 'Gross: $6,900.00',
      totalCredits: 'Bonus: $1,200.00',
      totalDebits: 'Deductions: $1,336.55',
      closingBalance: 'Stated Net: $24,850.00',
      calculatedClosing: 'Expected Net: $5,563.45',
      variance: '+$19,286.55 (+346% inflation)',
      mathExplanation: 'Gross Earnings ($6,900.00) - Deductions ($1,336.55) does not equal Net Pay ($24,850.00).',
    },
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.08,
        highFreqRingDetected: false,
        spectralPeaks: 2,
        energyDistribution: 'Discrete high frequency lines along font baseline, but heavy localized edge variance.',
      },
      ela: {
        maxDiscrepancy: 88.4,
        avgDiscrepancy: 14.2,
        suspiciousPatchesCount: 1,
        recompressionQuality: 0.82,
      },
      prnu: {
        sensorNoiseVariance: 12.0,
        uniformityScore: 78.0,
        zeroNoiseHolesDetected: false,
      },
      exif: {
        hasExif: true,
        software: 'Adobe Photoshop 2024 (Macintosh)',
        modifyDate: '2026-09-28 22:45:00',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'Payslip #AG-9481', type: 'document', status: 'danger', details: 'Spliced income figures' },
        { id: 'app', label: 'David R. Sterling', type: 'applicant', status: 'warning', details: 'Executive loan applicant ($850K Mortgage)' },
        { id: 'acc', label: 'Barclays #8491', type: 'bank_account', status: 'safe', details: 'Real payroll destination account' },
        { id: 'dev', label: 'MacOS Chrome (Photoshop Tag)', type: 'device', status: 'danger', details: 'Device EXIF matches Adobe Photoshop rasterizer' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Submitted Proof', isSuspicious: true },
        { source: 'app', target: 'acc', label: 'Payroll Account' },
        { source: 'doc', target: 'dev', label: 'Edited On Device', isSuspicious: true },
      ],
    },
  },
  {
    id: 'sample-spliced-bank-statement',
    title: 'Bank Statement (Mathematical Ledger Discrepancy)',
    category: 'bank_statement',
    mediaType: 'document',
    fileName: 'octane_commerce_bank_statement.pdf',
    fileSizeKb: 365,
    imageDataUrl: svgToDataUrl(splicedBankStatementSvg),
    authenticityScore: 58,
    riskScore: 42,
    riskLevel: 'MEDIUM',
    status: 'REVIEW',
    executiveSummary: 'Mathematical ledger reconciliation failure. Transaction line items sum to an expected ending balance of $15,500.50, but stated Closing Balance displays $45,500.50 (+$30,000.00 discrepancy). Spliced edge boundary around final figure.',
    recommendation: 'STEP-UP MANUAL REVIEW: Route to Senior Credit Risk Officer. Require Open Banking direct API ledger verification.',
    farConfidence: 'Target FAR < 0.4% | Ledger Verification Confidence: 100%',
    processingTimeMs: 395,
    sha256Hash: 'e1d2c3b4a5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    timestamp: '2026-10-06T17:33:02Z',
    pillars: {
      structureTypographyScore: 74,
      aiDeepfakeScore: 92,
      tamperCopyMoveScore: 51,
      ledgerSemanticScore: 28,
    },
    detectedAnomalies: [
      {
        category: 'Ledger Arithmetic Inconsistency',
        severity: 'HIGH',
        description: 'Opening ($12,400.50) + Credits ($8,200.00) - Debits ($5,100.00) = $15,500.50. Stated closing is $45,500.50.',
        location: 'Summary Header & Final Row',
      },
      {
        category: 'Font Kerning Jitter',
        severity: 'MEDIUM',
        description: 'Digit "4" in $45,500.50 exhibits 1.2px baseline offset compared to adjacent digits "5,500.50".',
        location: 'Stated Closing Balance Bar',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Spliced Balance: +$30,000 Inconsistency', x: 58.5, y: 69.8, width: 33.0, height: 7.5, confidence: 0.94, type: 'spliced_digit' },
    ],
    ledgerCheck: {
      isMatched: false,
      openingBalance: '$12,400.50',
      totalCredits: '$8,200.00',
      totalDebits: '$5,100.00',
      closingBalance: '$45,500.50 (Stated)',
      calculatedClosing: '$15,500.50 (Audited)',
      variance: '+$30,000.00 Artificial Surplus',
      mathExplanation: 'Ledger transactions do not reconcile to stated closing balance.',
    },
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.05,
        highFreqRingDetected: false,
        spectralPeaks: 1,
        energyDistribution: 'Standard optical raster text pattern.',
      },
      ela: {
        maxDiscrepancy: 48.2,
        avgDiscrepancy: 11.0,
        suspiciousPatchesCount: 1,
        recompressionQuality: 0.85,
      },
      prnu: {
        sensorNoiseVariance: 15.6,
        uniformityScore: 82.0,
        zeroNoiseHolesDetected: false,
      },
      exif: {
        hasExif: false,
        modifyDate: '2026-08-31 18:00:00',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'Metro Bank Statement', type: 'document', status: 'warning', details: 'Ledger discrepancy: +$30K balance' },
        { id: 'app', label: 'Octane Commerce LLC', type: 'applicant', status: 'warning', details: 'Commercial revolving credit applicant' },
        { id: 'acc', label: 'Metro Account 9912', type: 'bank_account', status: 'warning', details: 'Account status under scrutiny' },
        { id: 'dev', label: 'Windows PC (Corporate)', type: 'device', status: 'safe', details: 'Corporate IP address' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Supplied Proof', isSuspicious: true },
        { source: 'doc', target: 'acc', label: 'Represents Ledger' },
        { source: 'app', target: 'dev', label: 'Submission Channel' },
      ],
    },
  },
  {
    id: 'sample-counterfeit-id',
    title: 'Counterfeit EU ID Card (Photo-Swap Splicing)',
    category: 'id_card',
    mediaType: 'image',
    fileName: 'marco_moretti_id_photoswap.png',
    fileSizeKb: 320,
    imageDataUrl: svgToDataUrl(counterfeitIdSvg),
    authenticityScore: 41,
    riskScore: 59,
    riskLevel: 'HIGH',
    status: 'FLAG',
    executiveSummary: 'Photo-swap forgery detected. The facial photograph boundary exhibits severe anti-aliasing haloing and PRNU noise discontinuity. Mismatched color gamut between background security plastic and pasted headshot.',
    recommendation: 'FRAUD ALERT: Counterfeit identity document presented during physical or digital KYC onboarding.',
    farConfidence: 'Target FAR < 0.2% | Photo Swap Detection: 96.8%',
    processingTimeMs: 360,
    sha256Hash: '5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e',
    timestamp: '2026-10-06T18:15:20Z',
    pillars: {
      structureTypographyScore: 48,
      aiDeepfakeScore: 78,
      tamperCopyMoveScore: 22,
      ledgerSemanticScore: 45,
    },
    detectedAnomalies: [
      {
        category: 'Portrait Splice / Photo Swap',
        severity: 'HIGH',
        description: 'Sharp compression gradient at the perimeter of the headshot. Missing physical Guilloché line continuation over photo edge.',
        location: 'Left Portrait Frame',
      },
      {
        category: 'PRNU Sensor Noise Inconsistency',
        severity: 'HIGH',
        description: 'High-pass noise filter shows portrait area was acquired on a separate optical sensor than the base document card plastic.',
        location: 'Facial Photograph',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Spliced Photo Edge Boundary', x: 5.7, y: 21.5, width: 23.5, height: 49.0, confidence: 0.97, type: 'face_swap' },
    ],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.12,
        highFreqRingDetected: false,
        spectralPeaks: 3,
        energyDistribution: 'Mixed dual-source frequency characteristics.',
      },
      ela: {
        maxDiscrepancy: 74.0,
        avgDiscrepancy: 18.2,
        suspiciousPatchesCount: 1,
        recompressionQuality: 0.80,
      },
      prnu: {
        sensorNoiseVariance: 8.4,
        uniformityScore: 44.0,
        zeroNoiseHolesDetected: true,
      },
      exif: {
        hasExif: false,
        modifyDate: '2026-09-14 12:00:00',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'Counterfeit Schengen ID', type: 'document', status: 'danger', details: 'Photo-swap splice detected' },
        { id: 'app', label: 'Marco Moretti (Impersonator)', type: 'applicant', status: 'danger', details: 'Stolen credential persona' },
        { id: 'ring', label: 'Identity Theft Cluster #4', type: 'fraud_ring', status: 'danger', details: 'Linked to 3 previous impersonation attempts' },
        { id: 'dev', label: 'Mobile Device (Proxy)', type: 'device', status: 'warning', details: 'Inconsistent timezone & browser headers' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Uses Stolen Identity', isSuspicious: true },
        { source: 'app', target: 'ring', label: 'Syndicate Member', isSuspicious: true },
        { source: 'app', target: 'dev', label: 'Unverified Device', isSuspicious: true },
      ],
    },
  },
  {
    id: 'sample-kyc-video-selfie',
    title: 'KYC Video Selfie (Screen Replay & Deepfake Reenactment)',
    category: 'kyc_video_selfie',
    mediaType: 'video',
    fileName: 'kyc_liveness_screen_replay.mp4',
    fileSizeKb: 1420,
    imageDataUrl: svgToDataUrl(kycVideoSelfieSvg),
    authenticityScore: 16,
    riskScore: 84,
    riskLevel: 'CRITICAL',
    status: 'FLAG',
    executiveSummary: 'Biometric Presentation Attack detected. Video recording displays characteristic high-frequency Moiré patterns and monitor pixel raster lines from an iPad replay. Zero natural ocular blinks detected across 150 frames.',
    recommendation: 'IMMEDIATE FRAUD ALERT: Injection attack during biometric KYC liveness challenge. Flag identity profile.',
    farConfidence: 'Target FAR < 0.01% | Liveness Attack Detection: 99.8%',
    processingTimeMs: 460,
    sha256Hash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    timestamp: '2026-10-06T19:40:11Z',
    pillars: {
      structureTypographyScore: 20,
      aiDeepfakeScore: 14,
      tamperCopyMoveScore: 18,
      ledgerSemanticScore: 15,
    },
    videoLivenessMetrics: {
      livenessScore: 16,
      temporalCoherenceScore: 28,
      screenReplayDetected: true,
      lipSyncValid: false,
      blinkRatePerMinute: 0,
      moirePatternPresent: true,
    },
    detectedAnomalies: [
      {
        category: 'Presentation Attack (Screen Replay)',
        severity: 'HIGH',
        description: 'Moiré grid interference detected indicating video is a re-recording of an electronic display (tablet/monitor).',
        location: 'Full Video Frame',
      },
      {
        category: 'Biometric Unnatural Blinking',
        severity: 'HIGH',
        description: 'Zero ocular eyelid closures recorded across entire 5-second video selfie sequence.',
        location: 'Eye Landmark Region',
      },
      {
        category: '2D Planar Flatness',
        severity: 'HIGH',
        description: 'No 3D facial depth displacement observed during requested head tilt prompt.',
        location: 'Facial Mesh Topology',
      },
    ],
    tamperBoundingBoxes: [
      { label: 'Moiré Screen Replay Grid', x: 6.4, y: 9.3, width: 87.2, height: 81.3, confidence: 0.99, type: 'ai_hallucination' },
      { label: 'Unnatural Static Eyes (No Blink)', x: 44.0, y: 39.0, width: 12.0, height: 4.5, confidence: 0.98, type: 'ai_hallucination' },
    ],
    forensicMetrics: {
      fft: {
        syntheticLikelihood: 0.98,
        highFreqRingDetected: true,
        spectralPeaks: 12,
        energyDistribution: 'Severe monitor pixel sub-grid frequencies visible on frequency domain.',
      },
      ela: {
        maxDiscrepancy: 92.0,
        avgDiscrepancy: 34.0,
        suspiciousPatchesCount: 6,
        recompressionQuality: 0.68,
      },
      prnu: {
        sensorNoiseVariance: 28.0,
        uniformityScore: 18.0,
        zeroNoiseHolesDetected: true,
      },
      exif: {
        hasExif: false,
        modifyDate: '2026-10-06 19:35:00',
        compressionTableAltered: true,
      },
    },
    networkEntities: {
      nodes: [
        { id: 'doc', label: 'KYC Video Selfie (MP4)', type: 'document', status: 'danger', details: 'Screen replay attack detected' },
        { id: 'app', label: 'Biometric Impersonator', type: 'applicant', status: 'danger', details: 'Synthetic facial injection attack' },
        { id: 'dev', label: 'Emulated Android Device', type: 'device', status: 'danger', details: 'Virtual camera driver injection' },
        { id: 'ring', label: 'Syndicate Deepfake Mesh', type: 'fraud_ring', status: 'danger', details: 'Linked to 6 video bypass attempts' },
      ],
      links: [
        { source: 'app', target: 'doc', label: 'Supplied Video Feed', isSuspicious: true },
        { source: 'dev', target: 'doc', label: 'Virtual Camera Inject', isSuspicious: true },
        { source: 'app', target: 'ring', label: 'Known Botnet Node', isSuspicious: true },
      ],
    },
  },
];
