import hotIns1 from '../assets/images/products/hot-insulation-1.png';
import hotIns2 from '../assets/images/products/hot-insulation-2.png';
import hotIns3 from '../assets/images/products/hot-insulation-3.png';
import hotIns4 from '../assets/images/products/hot-insulation-4.png';
import hotIns5 from '../assets/images/products/hot-insulation-5.png';
import hotIns6 from '../assets/images/products/hot-insulation-6.png';
import hotIns7 from '../assets/images/products/hot-insulation-7.png';

export const productsData = [
  {
    id: "lrb-mattresses",
    name: "LRB Mattresses",
    category: "Hot Insulation",
    description: "Light Resin Bonded rockwool mattresses stitched on wire mesh, ideal for boilers, large vessels, and high-magnitude pipelines.",
    image: hotIns1,
    specs: ["Max Temp: 750°C", "Density: 70 to 140 kg/m³", "IS: 8183 Compliant"]
  },
  {
    id: "resin-bonded-slabs",
    name: "Resin Bonded Slabs",
    category: "Hot Insulation",
    description: "High-density rigid and semi-rigid rockwool slabs suited for flat surface insulation, ducting, and tanks.",
    image: hotIns2,
    specs: ["Max Temp: 750°C", "Thickness: 25 to 100mm", "Low Thermal Conductivity"]
  },
  {
    id: "pipe-sections",
    name: "Pipe Sections",
    category: "Hot Insulation",
    description: "Pre-formed rockwool pipe sections designed for rapid slip-on application on high-temperature process pipelines.",
    image: hotIns3,
    specs: ["Sizes: 1/2\" to 20\" Pipes", "Thickness: 25 to 100mm", "Excellent Snap-on Fit"]
  },
  {
    id: "ceramic-wool-rope",
    name: "Ceramic Wool Rope",
    category: "Hot Insulation",
    description: "Flexible high-temperature insulation rope constructed of ceramic fibers, ideal for sealing furnace doors and expansion joints.",
    image: hotIns4,
    specs: ["Max Temp: 1260°C", "Sizes: 6mm to 40mm Diameter", "High Tensile Strength"]
  },
  {
    id: "ceramic-blanket",
    name: "Ceramic Blanket",
    category: "Hot Insulation",
    description: "Lightweight, highly flexible thermal barrier blanket with low heat storage, perfect for furnace linings and kiln backs.",
    image: hotIns5,
    specs: ["Max Temp: 1260°C - 1425°C", "Low Thermal Conductivity", "Acid & Alkali Resistant"]
  },
  {
    id: "calcium-silicate-block",
    name: "Calcium Silicate Block",
    category: "Hot Insulation",
    description: "Super-rigid, high-strength calcium silicate blocks providing structural backing and thermal protection in heat-intensive systems.",
    image: hotIns6,
    specs: ["Max Temp: 1000°C", "High Flexural Strength", "Non-Combustible Material"]
  },
  {
    id: "ceramic-fiber-board",
    name: "Ceramic Fibre Board",
    category: "Hot Insulation",
    description: "Rigid refractory board fabricated with ceramic fibers, excellent for backing insulation, combustion chambers, and flue linings.",
    image: hotIns7,
    specs: ["Max Temp: 1260°C", "Excellent Board Flatness", "Resists High Velocity Gas"]
  }
];

// Additional capability categories based on website menu structure:
// - Cold Insulation Materials (Expanded Polystyrene, Polyurethane Foam)
// - Insulation Covering Materials (Aluminium Coils and Cladding sheets)
// - Ancillaries (Accessories like banding, sealants)
export const additionalCapabilities = [
  { name: "Cold Insulation Slabs & Pipes", desc: "PUF / PIR preformed sections, nitrile rubber, and expanded polystyrene for low-temp ducting & pipelines." },
  { name: "Cladding & Weather Barriers", desc: "Aluminium coils, sheets, and galvanized iron cladding for mechanical shielding." },
  { name: "Ancillary Accessories", desc: "Tension bands, toggle clips, screws, rivets, insulation pins, and specialized thermal sealants." }
];
