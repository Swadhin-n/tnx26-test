import type { InventionId } from "./inventions";

/**
 * The scroll journey: each chapter is one idea travelling from notebook to machine,
 * with the TECHNEX events where students make it real.
 *
 * NOTE: event names, days, times and venues are PLACEHOLDERS — replace with the real schedule.
 */
export interface ChapterEvent {
  name: string;
  when: string;
  where: string;
}

export interface Chapter {
  id: string;
  numeral: string;
  word: string;
  art: InventionId;
  imagined: string;
  realised: string;
  headline: string;
  body: string;
  events: ChapterEvent[];
  /** Colour of the light pooling behind the scene. */
  light: string;
}

export const chapters: Chapter[] = [
  {
    id: "flight",
    numeral: "I",
    word: "Flight",
    art: "flight",
    imagined: "Ornithopter · c. 1488",
    realised: "Modern aircraft",
    headline: "It began with a man watching birds.",
    body: "Leonardo filled page after page with wings of wood and linen. Five centuries later the sketch has a cockpit. Design, build and fly your own.",
    events: [
      { name: "Aeromodelling", when: "Day 1 · 10:00", where: "Main Ground" },
      { name: "Drone Race", when: "Day 2 · 14:00", where: "Arena" },
    ],
    light: "240, 163, 92",
  },
  {
    id: "motion",
    numeral: "II",
    word: "Motion",
    art: "limb",
    imagined: "Mechanical limb · c. 1500",
    realised: "Robotic arm",
    headline: "Cables and pulleys learned to move like us.",
    body: "Renaissance engineers sketched a knight's arm that could bend on its own. Today it grips, senses and lifts. Bring the machine that fights for you.",
    events: [
      { name: "Robo Wars", when: "Day 1 · 16:00", where: "Robo Pit" },
      { name: "Pick & Place", when: "Day 2 · 11:00", where: "Lab Block" },
    ],
    light: "232, 200, 150",
  },
  {
    id: "vision",
    numeral: "III",
    word: "Vision",
    art: "imaging",
    imagined: "Anatomical studies · c. 1510",
    realised: "MRI & medical imaging",
    headline: "We wanted to see what skin was hiding.",
    body: "Anatomists drew the body by candlelight. Now magnets and radio waves see through it slice by slice. Build the device that sees what we can't.",
    events: [
      { name: "Biomedical Expo", when: "Day 1 · 12:00", where: "Seminar Hall" },
      { name: "Paper Presentation", when: "Day 2 · 10:00", where: "Auditorium" },
    ],
    light: "95, 200, 255",
  },
  {
    id: "intelligence",
    numeral: "IV",
    word: "Thought",
    art: "ai",
    imagined: "Analytical Engine · 1837",
    realised: "Artificial intelligence",
    headline: "Brass gears dreamed of composing music.",
    body: "Ada Lovelace imagined that a calculating engine might one day create. It learned to. Train the model, ship the code, beat the clock.",
    events: [
      { name: "Hackathon (24 hr)", when: "Day 1 → Day 2", where: "Innovation Lab" },
      { name: "AI/ML Challenge", when: "Day 2 · 13:00", where: "Lab Block" },
    ],
    light: "160, 210, 255",
  },
  {
    id: "power",
    numeral: "V",
    word: "Power",
    art: "power",
    imagined: "Leyden jar · 1745",
    realised: "Batteries & EV power",
    headline: "Someone caught lightning in a jar.",
    body: "A glass jar wrapped in foil held the first stored spark. Now a battery pack can carry a car across a country. Design what runs on it next.",
    events: [
      { name: "EV Design Challenge", when: "Day 1 · 11:00", where: "Workshop Bay" },
      { name: "Circuitrix", when: "Day 2 · 15:00", where: "Electronics Lab" },
    ],
    light: "240, 190, 110",
  },
  {
    id: "creation",
    numeral: "VI",
    word: "Form",
    art: "print",
    imagined: "Printing press · c. 1440",
    realised: "3D printing",
    headline: "Ideas learned to copy themselves.",
    body: "A wooden screw press multiplied words. Today additive machines print engines, bones and buildings, layer by layer. Model it, print it, prove it.",
    events: [
      { name: "Design-a-thon", when: "Day 1 · 14:00", where: "CAD Lab" },
      { name: "Project Expo", when: "Day 2 · All day", where: "Central Atrium" },
    ],
    light: "232, 200, 150",
  },
];
