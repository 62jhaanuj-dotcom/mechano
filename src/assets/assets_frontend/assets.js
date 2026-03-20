import header_img from "./header_img.webp";
import header_imgg from "./header_imgg.webp";
import header_imggg from "./header_imggg.webp";
import logo from "./logo.svg";


import Banner_img from "./Banner_img.png";
import mech1 from "./mech1.webp";
import mech2 from "./mech2.webp";
import mech3 from "./mech3.webp";
import mech4 from "./mech4.webp";
import mech5 from "./mech5.webp";
import mech6 from "./mech6.webp";
import mech7 from "./mech7.webp";
import mech8 from "./mech8.webp";
import mech9 from "./mech9.webp";
import mech10 from "./mech10.webp";

import PerformanceBrakeRotorsPads from "./PerformanceBrakeRotorsPads.png";
import CastrolOil from "./CastrolOil.png";
import Coldair from "./Coldair.webp";
import Sealight from "./Sealight.webp";
import Tire from "./Tire.png";
import battery from "./battery.webp";
import boschquiet from "./boschquiet.png";
import MobileOil from "./MobileOil.png";
import sc from "./sc.png";
import OilFilter from "./OilFilter.png";

import General_Service from "./General_Service.webp";
import Engine_Repair from "./Engine_Repair.webp";
import Electrical_Repair from "./Electrical_Repair.webp";
import AC_Service from "./AC_Service.webp";
import Denting_Painting from "./Denting_Painting.png";

export const assets = {
 
  header_img,
  header_imgg,
  header_imggg,
  logo,
  Banner_img,
};

export const specialityData = [
  {
    speciality: "General Service",
    image: General_Service,
  },
  {
    speciality: "Engine Repair",
    image: Engine_Repair,
  },
  {
    speciality: "Electrical Repair",
    image: Electrical_Repair,
  },
  {
    speciality: "AC Service",
    image: AC_Service,
  },
  {
    speciality: "Denting & Painting",
    image: Denting_Painting,
  },
];

export const productsData = [
  {
    _id: "prod_001",
    name: "Performance Brake Rotors & Pads",
    image: PerformanceBrakeRotorsPads,
    price: 18999,
    category: "Brake Pads",
    rating: 4.8,
  },
  {
    _id: "prod_002",
    name: "Castrol EDGE 5W-40 Advanced Synthetic",
    image: CastrolOil,
    price: 3499,
    category: "Engine Oil",
    rating: 4.9,
  },
  {
    _id: "prod_003",
    name: "Cold Air Intake System",
    image: Coldair,
    price: 11500,
    category: "Filters",
    rating: 4.7,
  },
  {
    _id: "prod_004",
    name: "SEALIGHT LED Headlight Bulbs",
    image: Sealight,
    price: 7999,
    category: "Accessories",
    rating: 4.6,
  },
  {
    _id: "prod_005",
    name: "Michelin Defender All-Season Tire",
    image: Tire,
    price: 8500,
    category: "Tires",
    rating: 4.8,
  },
  {
    _id: "prod_006",
    name: "Optima RedTop 12V Battery",
    image: battery,
    price: 5200,
    category: "Batteries",
    rating: 4.5,
  },
  {
    _id: "prod_007",
    name: "Bosch Premium Oil Filter",
    image: OilFilter,
    price: 850,
    category: "Filters",
    rating: 4.4,
  },
  {
    _id: "prod_008",
    name: "Mobil 1 High Mileage 10W-30",
    image: MobileOil,
    price: 2800,
    category: "Engine Oil",
    rating: 4.7,
  },
  {
    _id: "prod_009",
    name: "Bosch QuietCast Ceramic Brake Pads",
    image: boschquiet,
    price: 4200,
    category: "Brake Pads",
    rating: 4.9,
  },
  {
    _id: "prod_010",
    name: "Valleycomfy Microfiber Leather Steering Cover",
    image: sc,
    price: 1299,
    category: "Accessories",
    rating: 4.6,
  },
];
export const mechanics = [
  // --- MAIN MECHANICS (6 Experts) ---
  {
    _id: "mech1",
    name: "Rahul Sharma",
    image: mech1,
    speciality: "Engine Repair",
    Post: "Engine Specialist",
    degree: "Master Tech",
    experience: "8 Years",
    about:
      "Expert in engine overhauling, fuel injection systems, and performance tuning. Rahul ensures your powertrain is in top-notch condition.",
    fees: 500,
    address: {
      line1: "Sector 12, Workshop Hub",
      line2: "Near Highway, Bhopal",
    },
  },
  {
    _id: "mech2",
    name: "Amit Vishwakarma",
    image: mech2,
    speciality: "Electrical Repair",
    Post: "Auto Electrician",
    degree: "Certified Electrician",
    experience: "6 Years",
    about:
      "Specialist in ECU remapping, car wiring, and sensor diagnostics. If your dashboard lights are acting up, he is your man.",
    fees: 400,
    address: { line1: "Shop 5, Auto Market", line2: "Indore Road" },
  },
  {
    _id: "mech3",
    name: "Vikram Singh",
    image: mech3,
    speciality: "Engine Repair",
    Post: "Transmission Expert",
    degree: "Gearbox Specialist",
    experience: "10 Years",
    about:
      "Specializes in both Manual and Automatic transmissions. Expert in clutch assembly and dual-clutch repairs.",
    fees: 600,
    address: { line1: "Gully 4, Mechanical Zone", line2: "Jabalpur" },
  },
  {
    _id: "mech4",
    name: "Ankit Solanki", // Diversity maintained with an Indian female expert
    image: mech4,
    speciality: "Denting & Painting",
    Post: "Denting & Painting Expert",
    degree: "Finish Expert",
    experience: "7 Years",
    about:
      "Masters in denting, painting, and ceramic coating. She uses high-precision color matching for premium cars.",
    fees: 700,
    address: { line1: "Plot 45, Industrial Area", line2: "Gwalior" },
  },
  {
    _id: "mech5",
    name: "Deepak Verma",
    image: mech5,
    speciality: "AC Service",
    Post: "AC Specialist",
    degree: "HVAC Specialist",
    experience: "5 Years",
    about:
      "Expert in radiator maintenance, AC gas recharging, and cabin cooling optimization.",
    fees: 350,
    address: { line1: "Main Square, New Town", line2: "Ujjain" },
  },
  {
    _id: "mech6",
    name: "Manoj Ahirwar",
    image: mech6,
    speciality: "Engine Repair",
    Post: "Suspension Specialist",
    degree: "Safety Expert",
    experience: "9 Years",
    about:
      "Focuses on braking systems, ABS sensors, and shock absorber replacements for a smooth ride.",
    fees: 450,
    address: { line1: "Link Road, Sector 3", line2: "Bhopal" },
  },

  // --- ASSISTANTS (6 Junior/Support Staff) ---
  {
    _id: "mech7",
    name: "Karan Yadav",
    image: mech7,
    speciality: "General Service",
    Post: "General Assistant",
    degree: "Trainee",
    experience: "1 Year",
    about:
      "Assists in oil changes, filter replacements, and general car inspection. Fast and reliable support.",
    fees: 150,
    address: { line1: "Sector 12, Workshop Hub", line2: "Bhopal" },
  },
  {
    _id: "mech8",
    name: "Jatin Prajapati",
    image: mech8,
    speciality: "Electrical Repair",
    Post: "Electrician",
    degree: "Trainee",
    experience: "2 Years",
    about:
      "Helps in battery testing, bulb replacements, and basic wiring checks under senior supervision.",
    fees: 200,
    address: { line1: "Shop 5, Auto Market", line2: "Indore Road" },
  },
  {
    _id: "mech9",
    name: "Dinesh Chouhan",
    image: mech9,
    speciality: "Denting & Painting",
    Post: "Detailing Assistant",
    degree: "Cleaning Specialist",
    experience: "2 Years",
    about:
      "Expert in interior vacuuming, dashboard polishing, and exterior car washing.",
    fees: 100,
    address: { line1: "Gully 4, Mechanical Zone", line2: "Jabalpur" },
  },
  {
    _id: "mech10",
    name: "Ajay Rathore",
    image: mech10,
    speciality: "General Service",
    Post: "General Assistant",
    degree: "Trainee",
    experience: "1 Year",
    about:
      "Handles tire rotations, wheel balancing, and puncture repairs with high-speed equipment.",
    fees: 150,
    address: { line1: "Plot 45, Industrial Area", line2: "Gwalior" },
  },
];