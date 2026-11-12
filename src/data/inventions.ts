/**
 * The Invention Cards. Each card is an idea that was IMAGINED and later REALISED.
 * Artwork for each id lives in src/scene/art.tsx (thenArt / nowArt).
 */
export type InventionId =
  | "flight"
  | "limb"
  | "comms"
  | "imaging"
  | "ai"
  | "print"
  | "rotor"
  | "cart"
  | "power"
  | "calc";

export interface Invention {
  id: InventionId;
  imagined: { title: string; by: string; year: string };
  realised: { title: string; year: string };
  story: string;
  atTechnex: string[];
}

export const inventions: Invention[] = [
  {
    id: "flight",
    imagined: { title: "Flying Machine", by: "Leonardo da Vinci", year: "c. 1488" },
    realised: { title: "Modern Aircraft", year: "Today" },
    story:
      "Leonardo filled notebooks with bat-winged ornithopters powered by human muscle. Five centuries later, the same dream carries billions of passengers every year.",
    atTechnex: ["Aeromodelling", "RC Flight Challenge"],
  },
  {
    id: "limb",
    imagined: { title: "Mechanical Limb", by: "Renaissance engineers", year: "c. 1500" },
    realised: { title: "Robotic Arm & Prosthetics", year: "Today" },
    story:
      "Pulleys, cables and iron joints once sketched a knight's moving arm. Now sensors and actuators give back touch, grip and motion.",
    atTechnex: ["Robo Wars", "Pick & Place"],
  },
  {
    id: "comms",
    imagined: { title: "Voices Across Distance", by: "Telegraph pioneers", year: "1837" },
    realised: { title: "Smartphone & Global Network", year: "Today" },
    story:
      "A tapping key turned language into pulses on a wire. Today a device in every pocket links the whole planet in milliseconds.",
    atTechnex: ["Hackathon", "App Development"],
  },
  {
    id: "imaging",
    imagined: { title: "Seeing Inside the Body", by: "Anatomists & lens makers", year: "c. 1510" },
    realised: { title: "MRI & Medical Imaging", year: "Today" },
    story:
      "Artists drew the body by dissection and lamplight. Magnetic fields and radio waves now reveal it slice by slice without a single cut.",
    atTechnex: ["Biomedical Expo", "Paper Presentation"],
  },
  {
    id: "ai",
    imagined: { title: "The Analytical Engine", by: "Charles Babbage & Ada Lovelace", year: "1837" },
    realised: { title: "Artificial Intelligence", year: "Today" },
    story:
      "Columns of brass gears were designed to compute anything. Ada imagined they might one day compose music. Machines that learn now do exactly that.",
    atTechnex: ["AI/ML Challenge", "Code Sprint"],
  },
  {
    id: "print",
    imagined: { title: "The Printing Press", by: "Johannes Gutenberg", year: "c. 1440" },
    realised: { title: "3D Printing", year: "Today" },
    story:
      "A wooden screw press multiplied ideas on paper. Additive manufacturing now multiplies them in metal, polymer and living tissue.",
    atTechnex: ["Design-a-thon", "CAD Modelling"],
  },
  {
    id: "rotor",
    imagined: { title: "Aerial Screw", by: "Leonardo da Vinci", year: "c. 1489" },
    realised: { title: "Drones", year: "Today" },
    story:
      "A linen helix was meant to screw itself into the air. Its descendants map farms, deliver medicine and race through gates at 150 km/h.",
    atTechnex: ["Drone Race", "Aerial Robotics"],
  },
  {
    id: "cart",
    imagined: { title: "Self-Propelled Cart", by: "Leonardo da Vinci", year: "c. 1478" },
    realised: { title: "Autonomous Vehicle", year: "Today" },
    story:
      "Spring-driven gears let a cart move along a pre-programmed path. Autonomous vehicles now read the road with lidar, cameras and neural networks.",
    atTechnex: ["Line Follower", "Autonomous Rover"],
  },
  {
    id: "power",
    imagined: { title: "Harnessing Lightning", by: "Leyden jar experimenters", year: "1745" },
    realised: { title: "Batteries & EV Power", year: "Today" },
    story:
      "A glass jar wrapped in foil once caught a spark. Lithium cells now store enough charge to drive a car across a country.",
    atTechnex: ["EV Design", "Circuitrix"],
  },
  {
    id: "calc",
    imagined: { title: "Calculating Machine", by: "Blaise Pascal", year: "1642" },
    realised: { title: "Microprocessor", year: "Today" },
    story:
      "Brass dials carried digits by hand-crank. A sliver of silicon now carries out billions of operations every second.",
    atTechnex: ["Embedded Systems", "Electronics Quiz"],
  },
];
