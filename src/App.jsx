import React, { useState, useEffect, useRef } from 'react';

// ─── CONTENT (formerly data.js) ───
// ─── PAGE DATA ────────────────────────────────────────────────
const careerPages = {
  'multiply-labs': {
    resumeCompany: 'Multiply Labs Inc.',
    company: 'Multiply Labs',
    role: 'Senior Robotics HW Engineer – Consumables R&D',
    dates: 'Dec. 2024 – Present',
    location: 'San Francisco, CA',
    tagline: 'Automating the future of cell therapy manufacturing.',
    heroImage: null, // replace with: 'multiply_labs_hero.jpg'
    highlights: [{"heading": "Senior Robotics Hardware Engineer – Consumables R&D · May 2026 – Present", "items": ["Lead consumables designer for robotic automation of the Rotea cell-therapy instrument; designed the cartridge, consumable, and hardware interface that let a robotic arm run the Rotea autonomously, end to end.", "Led design of Multiply Labs' pharmaceutical-grade (GMP) bag cartridge through Alpha, Beta, and Gamma revisions, improving reliability, robotic pick-and-place success rate, and GMP manufacturability while reducing customer assembly time.", "Redesigned a peristaltic pumping bag cartridge attachment, cutting per-use cost from $100 to an estimated $2.50 (~97%) while simplifying assembly and improving cell-pumping performance.", "Support consumables and hardware for robotic cluster deployments and daily operation at 3 large cell-therapy customers.", "Managed a summer mechanical engineering intern: defined project scopes and goals, tracked progress, and provided day-to-day mentorship and technical direction."]}, {"heading": "Advanced Robotics Hardware Engineer – Consumables R&D · Dec. 2024 – May 2026", "items": ["Joined as the second hire on the consumables design team; designed injection-molded single-use and reusable pharmaceutical-grade consumables for robotic cell-therapy manufacturing.", "Led Multiply Labs' largest customer pilot to date (6 cell-therapy batches/day, 20 hrs/day, for 12 continuous days), achieving a 100% batch success rate.", "Owned the pilot's full consumables and hardware stack (cartridge and consumable manufacturing, robot builds, cluster upgrades, and hardware testing), keeping the system production-ready for the full run.", "Designed, fabricated, and tested calibration and leveling jigs used to bring up and calibrate 4 robotic clusters, enabling accurate pick-and-place across the fleet.", "Helped develop, deploy, and operate Multiply Labs' first customer robotic cell-therapy manufacturing system, built for Legend Biotech."]}],
    sections: [
      {
        heading: 'The Problem We\'re Solving',
        body: `CAR-T cell therapy is one of the most promising cancer treatments ever developed — a living medicine where a patient's own immune cells are reprogrammed to hunt and destroy tumors. But manufacturing it is painstakingly manual. Every batch requires dozens of precise, sterile handling steps performed by trained technicians in specialized cleanrooms. It's slow, expensive, and prone to variability that can affect patient outcomes.\n\nMultiply Labs is building the robotic infrastructure to automate this process end-to-end — making life-saving therapies faster, cheaper, and more reliably available to the patients who need them.`
      },
      {
        heading: 'My Role: Consumables & Cartridge Design',
        body: `I focus on the physical interface between the robotic system and the biological process — the consumables and cartridges that make sterile, automated cell manufacturing possible.\n\nDesigning consumables for therapeutic robotics is a uniquely constrained discipline. Every part must be biocompatible, sterilizable, and manufacturable at scale. Fluid paths must be dead-volume-minimized to avoid losing precious patient cells. Connections must be leak-proof under automation forces, yet simple enough for robotic end effectors to handle reliably. Tolerances must be tight enough for process repeatability, but forgiving enough for high-volume injection molding.\n\nI work at the intersection of mechanical design, materials science, and manufacturing engineering to develop cartridges that the robotic arms can load, engage, process through, and dispose of — all without human intervention.`
      },
      {
        heading: 'Design Philosophy',
        body: `Consumable design for biotech robotics is fundamentally different from industrial tooling. The parts are small, the stakes are high, and the manufacturing volumes range from early clinical (hundreds) to commercial scale (tens of thousands). This means designing for DFM&A from day one — not as an afterthought.\n\nI apply GD&T-driven tolerance stacks to ensure robotic pick-and-place reliability, use Onshape for rapid design iteration with full version control across the team, and prototype aggressively with 3D printing before committing to tooling. Every gram of material, every microliter of dead volume, and every assembly step gets scrutinized.`
      },
      {
        heading: 'Key Partners',
        body: `Our system integrates with best-in-class partners across the biotech and robotics ecosystem: ThermoFisher for bioprocessing instrumentation, Nvidia Isaac for simulation and robotics AI, AstraZeneca and Legend Biotech for cell therapy manufacturing collaboration. Building hardware that interfaces cleanly with each of these platforms is a core part of what I do.`
      }
    ],
    pressLinks: [
      { label: 'AstraZeneca Collaboration', href: 'https://www.businesswire.com/news/home/20260127453159/en/Multiply-Labs-Announces-New-Collaboration-to-Automate-Cell-Therapy-Manufacturing-with-Robotics' },
      { label: 'Nvidia Isaac Partnership', href: 'https://blogs.nvidia.com/blog/multiply-labs-isaac-omniverse/' },
      { label: 'Team Spotlight', href: 'https://www.linkedin.com/posts/engineeringexcellence-robotics-biomanufacturing-ugcPost-7344144321194901504-s3Ux' },
    ]
  },
  'ocado': {
    company: 'Ocado Technology',
    resumeCompany: 'Ocado Technology (formerly Kindred AI)',
    role: 'Mechanical Engineer II – Robotics Product Development',
    dates: 'Sept. 2022 – Dec. 2024',
    location: 'San Francisco, CA',
    tagline: 'Building the AI-driven robotic systems powering next-generation e-commerce fulfillment.',
    heroImage: 'depal.jpg',
    highlights: [{"heading": "Highlights", "items": ["Core mechanical contributor to Ocado's first AI/ML-driven robotic depalletizing system, from design through deployment at multiple European fulfillment centers.", "Raised robotic pick-and-place accuracy from 75% to 98% by selecting and integrating depth/RGB cameras, increasing system throughput by 30%.", "Co-designed and fabricated an electromechanical end-effector (sensors, actuators, pneumatics) that raised payload capacity to 80 lb and handled a wider range of items.", "Performed load calculations and structural FEA to anchor a 1,250 lb robotic arm and pedestal to concrete, specifying anchors and adhesives that met all safety requirements.", "Managed cross-functional installation and integration of the San Francisco proof-of-concept depalletizing test cell, which led to funding approval for the program."]}],
    sections: [
      {
        heading: 'The Work',
        body: `At Ocado Technology I was part of the team developing Ocado's first AI-driven case-handling robotics system — a depalletizing robot designed to autonomously identify, grasp, and place a wide variety of box sizes and weights on a moving conveyor.\n\nI led the design and integration of the camera hardware stack: selecting, benchmarking, and qualifying the depth/RGB sensors that feed the ML perception pipeline. Getting accurate depth data on reflective shrink-wrap and irregular box surfaces is genuinely hard — I developed a systematic KPI testing framework to evaluate sensors across dozens of real-world SKUs, which ultimately enabled the system to exceed 300 units per hour for bulky items.`
      },
      {
        heading: 'Hardware Design',
        body: `Beyond cameras, I contributed to the mechanical design of the robotic end-effector and arm pedestal — structural components that needed to be stiff enough for positioning accuracy while remaining within payload limits. I managed the hardware build at our San Francisco lab and worked closely with software, QA, and mechatronics teams throughout the product development cycle.\n\nThis experience gave me a complete view of what it takes to take a robotic system from concept through lab build to first deployment — our first installation launched in London in Q4 2024.`
      }
    ],
    pressLinks: []
  },
  'neato': {
    company: 'Neato Robotics',
    role: 'Jr. Mechanical Engineer – Product Design',
    dates: 'Aug. 2020 – Sept. 2022',
    location: 'San Jose, CA',
    tagline: 'Designing consumer robotics products from concept through injection molded production.',
    heroImage: 'Nexaro_NR1500.jpg',
    highlights: [{"heading": "Highlights", "items": ["Designed, prototyped, and tooled injection-molded parts for Neato's first commercial robotic vacuum, the Nexaro NR1500, now sold globally by Vorwerk.", "Redesigned a robotic vacuum drivetrain, improving motor efficiency, reducing noise by 30%, and cutting production cost by $2 per unit.", "Streamlined Neato's additive manufacturing operations, cutting design iteration time by 75% and saving $20,000 a year in vendor costs.", "Developed and scaled high-volume plastic accessories (pet brush, fragrance dustbin filter), adding 7 SKUs to the product line.", "Started and led Neato's emerging-technologies R&D program, developing dust-sensing technology that used accelerometer and gyroscope data to adjust suction automatically."]}],
    sections: [
      {
        heading: 'Commercial Cleaning Robot',
        body: `At Neato I was a mechanical design engineer on the company's first commercial (non-consumer) robotic vacuum — a product that ultimately shipped as the Nexaro NR1500 under Vorwerk after Neato dissolved. I designed, prototyped, and tested components including the dustbin, filter assemblies, drivetrains, motor mounts, wire routing, and LiDAR covers across the full DVT/EVT cycle.`
      },
      {
        heading: 'Plastic Part Design & Manufacturing',
        body: `A major focus of my time at Neato was developing injection-molded plastic components. I used Creo to design parts for manufacturability from the start — working directly with our overseas tooling partners to optimize gate locations, draft angles, and wall thicknesses. I created full GD&T drawing packages, ran tolerance stack analyses, and iterated on prototype tooling to hit functional requirements before production release.\n\nI was the lead designer on Neato's next-generation drivetrain modules and dustbin/filter assemblies — components that shipped in consumer products sold worldwide.`
      }
    ],
    pressLinks: []
  },
  'kohler': {
    company: 'Kohler Company',
    role: 'Mechanical Engineering Intern',
    dates: 'Summer 2019',
    location: 'Kohler, WI',
    tagline: 'Designing Kohler\'s first back-of-bath spout diverter from concept to prototype.',
    heroImage: 'Kohler_Bath_Spout.png',
    highlights: [{"heading": "Highlights", "items": ["Designed Kohler's first back-of-the-bath spout diverter, from benchmarking existing diverters through a SolidWorks model and Carbon 3D-printed prototypes.", "Reduced water leakage with a redesigned o-ring interface, improved laminar flow aesthetics, and lowered manufacturing cost."]}],
    sections: [
      {
        heading: 'The Project',
        body: `As a product design engineering intern at Kohler I was tasked with designing an entirely new diverter mechanism for back-of-bath spouts — a first for the company. I benchmarked existing market solutions, identified failure modes and aesthetic limitations, and developed a new design in SolidWorks that addressed all of them.\n\nMy design improved laminar flow aesthetics, reduced leakage through a redesigned o-ring interface, and lowered per-unit manufacturing cost. I prototyped using Kohler's Carbon 3D printing facility and iterated through multiple rounds of functional testing before presenting the final design to the product team.`
      }
    ],
    pressLinks: []
  }
};

const aboutCategories = {
  Hiking:   { photos: ['Hiking_1.JPG','Hiking_2.JPG','Hiking_3.JPG','Hiking_4.JPG','Hiking_5.jpeg'], desc: 'Exploring trails across California and beyond.' },
  Skiing:   { photos: ['Skiing_1.jpg','Skiing_2.JPG','Skiing_3.jpg','Skiing_4.JPG'], desc: 'Chasing powder from Tahoe to the Alps.' },
  Travel:   { photos: ['Travel_1.jpg','Travel_2.jpg','Travel_3.jpg','Travel_4.jpg','Travel_5.jpg'], desc: 'Finding inspiration everywhere.' },
  Robotics: { photos: ['Robotics_4.jpg','Robotics_1.jpg','Robotics_2.jpg','Robotics_3.jpg'], desc: 'The obsession that started it all.' },
};

// ─── DATA ────────────────────────────────────────────────────
const portfolioItems = [
    { slug:'multiply-labs-cell-therapy-cluster', featured:true, career:'multiply-labs', results:["Lead consumables designer for robotic automation of the Rotea cell-therapy instrument", "Led the GMP bag cartridge through its Alpha, Beta and Gamma revisions", "Largest customer pilot to date: 6 batches a day for 12 continuous days at a 100% batch success rate", "Peristaltic pumping cartridge attachment redesigned from $100 to about $2.50 per use (~97% lower)", "Calibration and leveling jigs used to bring up and calibrate 4 robotic clusters"],
       image:'Multiply_Labs_Cluster_Exterior.jpg', title:'Cell-Therapy Robotic Cluster', company:'Multiply Labs',
      images:['Multiply_Labs_Cluster_Exterior.jpg','Multiply_Labs_Robot_Arm.jpg','Multiply_Labs_Cluster_Floor.jpg','Multiply_Labs_1.jpg'],
      shortDescription:'Consumables, cartridges and hardware for robotic cell-therapy manufacturing',
      longDescription:"At Multiply Labs, I design the consumables, cartridges and hardware interfaces that let robotic clusters like this one manufacture cell therapies end to end. I'm the lead consumables designer for robotic automation of the Rotea cell-therapy instrument and for the pharmaceutical-grade (GMP) bag cartridge across its Alpha, Beta and Gamma revisions. I led the company's largest customer pilot to date (6 batches a day for 12 continuous days at a 100% batch success rate), built the calibration and leveling jigs used to bring up 4 robotic clusters, and redesigned a peristaltic pumping cartridge attachment from $100 to $2.50 per use." },
    { slug:'ocado-depalletizing-robot', featured:true, career:'ocado', results:["Ocado's first AI/ML-driven depalletizing system, deployed at multiple European fulfillment centers", "First deployment launched in London in Q4 2024", "Co-designed an electromechanical end-effector that raised payload capacity to 80 lb", "Load calculations and structural FEA to anchor a 1,250 lb robotic arm and pedestal to concrete", "San Francisco proof-of-concept test cell that led to funding approval for the program"],
       image:'depal.jpg', title:'Depalletizing Robot', company:'Ocado Technology',
      images:['depal.jpg','depal_2.jpg','depal_3.jpg'],
      shortDescription:'Automated depalletizing robotic system for e-commerce fulfillment',
      longDescription:"At Ocado Technology, I played a key role in developing Ocado's first AI-driven case-handling robotics system. I led the design and implementation of camera hardware, managed the hardware build at our SF lab, and contributed to designing critical components like the robotic end-effector and arm pedestal. My role involves close collaboration with software, QA, and mechatronics teams. Our first deployment launched in London in Q4 2024." },
    { slug:'depth-camera-system', featured:false, career:'ocado', results:["Robotic pick-and-place accuracy raised from 75% to 98%", "System throughput increased by 30%", "Over 300 units per hour for bulky items", "Became camera technology consultant for several Ocado teams"],
       image:'Camera_PC.png', title:'High-Resolution Camera System', company:'Ocado Technology',
      images:['Camera_PC.png','Camera_PC_2.jpg','Camera_PC_3.jpg','Camera_PC_4.png'],
      shortDescription:'Depth/RGB camera testing for robotic computer vision applications',
      longDescription:"RGB/Depth cameras are crucial for enabling ML models to segment and measure depth of items. I developed a KPI testing process to evaluate and integrate the best depth/RGB camera available. Improved depth accuracy boosted grasping and pick speed, reaching over 300 UPH for bulky items. This led to my role as camera technology consultant for several teams including Ocado's on-grid robotic pick and emerging technology teams." },
    { slug:'kindred-sort-camera-mount', featured:false, career:'ocado', results:["Now integral to the Sort system, which has sorted over 750 million items across retail warehouses"],
       image:'Kindred_Sort_Camera.jpg', title:'Sort Camera Mount', company:'Kindred AI',
      images:['Kindred_Sort_Camera.jpg','Kindred_Sort_Camera_2.jpg','Kindred_Sort_Camera_3.jpg','Kindred_Sort_Camera_4.jpg'],
      shortDescription:'Sheet metal camera mount for Sort robots — sustaining engineering',
      longDescription:"I designed a robust camera mount for Kindred AI's (now Ocado Technology) Sort robot, engineered to withstand the forces exerted by a robotic arm without compromising the underneath depth camera. Fabricated from durable sheet metal, the mount is securely bolted to the robot's housing. This camera mount is now integral to the Sort system, which has successfully sorted over 750 million items across retail warehouses." },
    { slug:'nexaro-nr1500', featured:true, career:'neato', results:["Designed, prototyped and tooled injection-molded parts for Neato's first commercial robotic vacuum", "Took the robot from concept through its first EVT phase", "Now sold globally by Vorwerk as the Nexaro NR1500"],
       image:'Nexaro_NR1500.jpg', title:'Nexaro NR1500 Cleaning Robot', company:'Neato Robotics',
      images:['Nexaro_NR1500.jpg','Nexaro_2.jpg','Nexaro_3.jpg','Nexaro_4.jpg','Nexaro_7.jpg'],
      shortDescription:"Neato's first autonomous commercial cleaning robot",
      longDescription:"At Neato, I was a key mechanical design engineer on the industrial robotic vacuum from concept through the first EVT phase. I designed, prototyped, and tested 3D printed parts for the robot's dustbin, filter, drivetrains, motors, wire layouts, and LiDAR covers. After Neato dissolved, the project was transferred to Vorwerk and now operates as 'Nexaro'." },
    { slug:'neato-mopping-robot', featured:false, career:'neato', results:[],
       image:'Mopping_Robot.jpg', title:'Advanced Mopping Robot', company:'Neato Robotics',
      images:['Mopping_Robot.jpg','Mopping_Robot_4.jpg','Mopping_Robot_2.jpg'],
      shortDescription:"Neato's first autonomous mopping robot",
      longDescription:"At Neato, I redesigned a self-extraction cleaning center to create a more intuitive, accessible system. My solution introduced a pivoting cover for hands-free filter bag access, along with a spring-damped mechanism and leak-proof seal. I also integrated a touchscreen interface and accessory storage to boost customer satisfaction." },
    { slug:'injection-molded-parts', featured:true, career:'neato', results:["Drivetrain redesign: 30% quieter and $2 per unit cheaper to produce", "High-volume plastic accessories (pet brush, fragrance dustbin filter) that added 7 SKUs to the product line"],
       image:'Neato_Parts.jpg', title:'Custom Injection Molded Parts', company:'Neato Robotics',
      images:['Neato_Parts.jpg','Neato_Filter.jpg','Neato_Drivetrain.jpg'],
      shortDescription:'Custom-designed injection molded parts for Neato robotic vacuums',
      longDescription:"At Neato, I specialized in plastic part design. I used Creo to design prototypes, 3D printing to verify functionality, and GD&T and injection molding fundamentals for manufacturing. I collaborated with our overseas manufacturing team to optimize injection molding tool designs, created GD&T drawings, conducted tolerance analyses, and ensured efficient assembly for robotic applications." },
    { slug:'kohler-bath-spout-diverter', featured:false, career:'kohler', results:[],
       image:'Kohler_Bath_Spout.png', title:'Kohler Bathroom Fixtures', company:'Kohler',
      images:['Kohler_Work.jpg','Kohler_Bath_Spout.png','Kohler_Bath_Spout_2.jpg','Kohler_Pres.jpg','Kohler_Pres_2.jpg'],
      shortDescription:"Innovative bath spout diverter technology for Kohler Co.",
      longDescription:"As a product design engineering intern at Kohler, I designed the company's first back-of-the bath spout diverter. I benchmarked existing diverters, created a 3D model in SolidWorks, and iterated through Carbon 3D printing prototypes. My design improved laminar flow aesthetics, reduced leakages with a new o-ring design, and lowered manufacturing costs." },
];

const experiences = [
    { company:'Multiply Labs', title:'Senior Robotics HW Engineer – Consumables R&D', location:'San Francisco, CA', dates:'Dec. 2024 – Present', isNew:true, pageKey:'multiply-labs',
      description:"Lead consumables designer for robotic automation of the Rotea cell-therapy instrument and Multiply Labs' GMP bag cartridge. Led the company's largest customer pilot to date (100% batch success over 12 continuous days) and cut a pumping cartridge attachment from $100 to $2.50 per use. Partnered with ThermoFisher, Nvidia, AstraZeneca, and Legend Biotech." },
    { company:'Ocado Technology', title:'Mechanical Engineer II – Robotics Product Development', location:'San Francisco, CA', dates:'Sept. 2022 – Dec. 2024', pageKey:'ocado',
      description:"Core contributor to Ocado's first AI/ML-driven robotic depalletizing system, deployed at multiple European fulfillment centers. Raised pick-and-place accuracy from 75% to 98% through camera selection and integration, boosting throughput 30%, and co-designed an 80 lb-payload end-effector." },
    { company:'Neato Robotics', title:'Jr. Mechanical Engineer – Product Design', location:'San Jose, CA', dates:'Aug. 2020 – Sept. 2022', pageKey:'neato',
      description:"Designed, prototyped, and mass-manufactured injection-molded parts for the Nexaro NR1500, Neato's first commercial robotic vacuum. Redesigned a drivetrain to cut noise 30% and cost $2 per unit, and led the emerging technologies R&D program." },
    { company:'Kohler Company', title:'Mechanical Engineering Intern', location:'Kohler, WI', dates:'Summer 2019', pageKey:'kohler',
      description:"Designed Kohler's first back-of-the-bath spout diverter. Reduced water leakage, improved laminar flow aesthetics, and lowered manufacturing costs through innovative prototyping with Carbon 3D printing." },
];


const SKILL_GROUPS = [
  ['Design',['Onshape','SolidWorks','Creo','Injection-Molded Part Design','DFM&A','GD&T','Root Cause Analysis (RCA)','First Article Inspection (FAI)']],
  ['Prototyping & manufacturing',['Additive Manufacturing','Machining (Milling)','Injection Molding','Sheet Metal','Laser Cutting']],
  ['Project management',['Arena PLM','Confluence','Jira','BOMs','Vendor Management']],
];
const EDU = [
  ['Education', 'B.S. Mechanical Engineering', 'Miami University · Oxford, OH · 2016–2020'],
  ['Certification', 'GD&T Certification', '2-B Quality · ASME Y14.5-2009'],
];
const STATS = [
  ['3 robots in the field','robotic systems taken from design to customer deployment: Neato\'s Nexaro vacuum, Ocado\'s European depalletizer, and Multiply Labs\' cell-therapy clusters'],
  ['Mass production','injection-molded parts taken from concept to mass production for Neato\'s first commercial robot vacuum, now sold globally by Vorwerk'],
  ['6+ years','designing consumables and hardware for robotic systems'],
];
// Career timeline (home page, under the headline stats). Add a new year by adding an entry.
const TIMELINE = [
  { year: '2016', items: [
    { title: 'Started a B.S. in Mechanical Engineering', sub: 'Miami University · Oxford, OH' } ] },
  { year: '2019', items: [
    { title: 'Mechanical Engineering Intern, Kohler', sub: 'Kohler, WI', page: 'kohler',
      points: ["Designed Kohler's first back-of-bath spout diverter", 'Prototyped with Carbon 3D printing'] } ] },
  { year: '2020', items: [
    { title: 'Graduated, B.S. Mechanical Engineering', sub: 'Miami University' },
    { title: 'Joined Neato Robotics', sub: 'Jr. Mechanical Engineer, Product Design', page: 'neato',
      points: ['Injection-molded parts for the Nexaro NR1500', 'Drivetrain redesign: 30% quieter, $2/unit cheaper', 'Led the emerging technologies R&D program'] } ] },
  { year: '2022', items: [
    { title: 'Joined Ocado Technology', sub: 'Mechanical Engineer II, Robotics Product Development', page: 'ocado',
      points: ["Ocado's first AI/ML depalletizing robot", 'Pick-and-place accuracy 75% → 98%', '80 lb-payload end-effector'] } ] },
  { year: '2024', items: [
    { title: 'First depalletizer deployment', sub: 'London · Q4 2024' },
    { title: 'Joined Multiply Labs', sub: 'Advanced Robotics HW Engineer, Consumables R&D', page: 'multiply-labs',
      points: ['Largest customer pilot: 100% batch success', 'Calibration jigs for 4 robotic clusters', 'First customer system, for Legend Biotech'] } ] },
  { year: '2026', now: true, items: [
    { title: 'Promoted to Senior Robotics HW Engineer', sub: 'Multiply Labs · May 2026', page: 'multiply-labs',
      points: ['Lead designer, Rotea cartridge', 'GMP bag cartridge: Alpha → Gamma', 'Pumping attachment: $100 → $2.50 per use'] } ] },
];

// Contact email is not stored in the code. The build fills it in from the
// CONTACT_EMAIL environment variable (on GitHub: Settings → Secrets and variables
// → Actions → Variables). Without it, the email links are simply left out.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || '';

const RESUME ="William%20Nuveen%27s%20Resume%20%28Nov.%20%2726%29.pdf";
const PRESS = [
  ['AstraZeneca','https://www.businesswire.com/news/home/20260127453159/en/Multiply-Labs-Announces-New-Collaboration-to-Automate-Cell-Therapy-Manufacturing-with-Robotics'],
  ['Legend Biotech','https://www.businesswire.com/news/home/20240924666477/en/Multiply-Labs-Announces-a-Collaboration-on-Automating-Cell-Therapy-Manufacturing-with-Legend-Biotech'],
  ['Nvidia','https://blogs.nvidia.com/blog/multiply-labs-isaac-omniverse/'],
  ['Team Spotlight','https://www.linkedin.com/posts/engineeringexcellence-robotics-biomanufacturing-ugcPost-7344144321194901504-s3Ux'],
];
const PHOTO_SLOTS = {
  'multiply-labs':['Multiply_Labs_Cluster_Floor.jpg','Multiply_Labs_Robot_Arm.jpg','Multiply_Labs_1.jpg','Multiply_Labs_4.jpg'],
  'ocado':['depal.jpg','Camera_PC_2.jpg','Camera_PC_3.jpg'],
  'neato':['Nexaro_NR1500.jpg','Mopping_Robot.jpg','Neato_Parts.jpg'],
  'kohler':['Kohler_Work.jpg','Kohler_Bath_Spout.png','Kohler_Pres.jpg'],
};

// ─── HELPERS ───────────────────────────────────────────────
const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: .08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="fade-up" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const Img = ({ src, alt, eager, ...rest }) =>
  <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" {...rest} />;

// Escape to close, page scroll lock, and focus in / focus restore
const useOverlay = (onClose, ref) => {
  useEffect(() => {
    if (!onClose) return;
    const onKey = e => { if (e.key === 'Escape' && !document.querySelector('.dropdown.open, .mobile-menu')) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  useEffect(() => {
    const prev = document.body.style.overflow;
    const opener = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (ref && ref.current) ref.current.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      if (opener && opener.focus && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);
};

// Renders and diagrams (white or transparent corners) are shown whole instead of cropped.
const fitCache = {};
const looksLikeRender = img => {
  try {
    const c = document.createElement('canvas'); c.width = c.height = 16;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, 16, 16);
    const d = x.getImageData(0, 0, 16, 16).data;
    return [0, 15, 240, 255].every(p => {
      const k = p * 4;
      return d[k + 3] < 20 || (d[k] > 232 && d[k + 1] > 232 && d[k + 2] > 232);
    });
  } catch (err) { return false; }
};
const SmartImg = ({ src, className = '', ...rest }) => {
  const ref = useRef(null);
  const [render, setRender] = useState(!!fitCache[src]);
  const check = () => {
    const img = ref.current;
    if (!img || !img.naturalWidth) return;
    if (fitCache[src] === undefined) fitCache[src] = looksLikeRender(img);
    setRender(fitCache[src]);
  };
  useEffect(() => { if (ref.current && ref.current.complete) check(); }, [src]);
  return <Img {...rest} ref={ref} src={src} onLoad={check} className={(className + (render ? ' fit-contain' : '')).trim()} />;
};

// Left/right swipe on touch screens
const useSwipe = go => {
  const start = useRef(null);
  return {
    onTouchStart: e => { start.current = e.touches[0].clientX; },
    onTouchEnd: e => {
      if (start.current == null) return;
      const dx = e.changedTouches[0].clientX - start.current;
      start.current = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    },
  };
};

// Left/right arrow keys while active
const useArrowKeys = (go, active = true) => {
  useEffect(() => {
    if (!active) return;
    const onKey = e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);
};

const GalleryNav = ({ i, n, go }) => n > 1 && (
  <>
    <button className="gal-nav prev" aria-label="Previous photo" onClick={e => { e.stopPropagation(); go(-1); }}>‹</button>
    <button className="gal-nav next" aria-label="Next photo" onClick={e => { e.stopPropagation(); go(1); }}>›</button>
    <span className="gal-count" aria-live="polite">{i + 1} / {n}</span>
  </>
);

// Full-screen viewer. onClose receives the photo index it was closed on.
const Lightbox = ({ images, start = 0, onClose }) => {
  const ref = useRef(null);
  const [i, setI] = useState(Math.max(0, start));
  const idx = useRef(i); idx.current = i;
  const n = images.length;
  const go = d => setI(x => (x + d + n) % n);
  const close = () => onClose(idx.current);
  useOverlay(close, ref);
  useArrowKeys(go, n > 1);
  useEffect(() => {
    if (n < 2) return;
    [1, -1].forEach(d => { const im = new Image(); im.src = images[(i + d + n) % n]; });
  }, [i]);
  const swipe = useSwipe(n > 1 ? go : () => {});
  return (
    <div ref={ref} tabIndex={-1} className="modal-overlay lb" role="dialog" aria-modal="true" aria-label="Image viewer"
         style={{ zIndex: 1300 }} onClick={close} {...swipe}>
      <img key={images[i]} className="lb-img" src={images[i]} alt="" onClick={e => e.stopPropagation()} />
      <button className="lb-close" onClick={close} aria-label="Close image">×</button>
      <GalleryNav i={i} n={n} go={go} />
    </div>
  );
};

// Clickable photo that hides itself if the file is missing
const Photo = ({ src, alt, onOpen, style }) => {
  const [bad, setBad] = useState(false);
  if (bad) return null;
  return (
    <button className="tile" style={style} onClick={() => onOpen(src)} aria-label={`Enlarge: ${alt}`}>
      <SmartImg src={src} alt={alt} onError={() => setBad(true)} />
    </button>
  );
};

// ─── NAV (shared by home + career pages) ───────────────────
const Nav = ({ onBack, onCareer, goTo, homeHref = '#', page = 'home' }) => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const go = id => { setMenu(false); goTo(id); };
  useEffect(() => {
    if (!menu) return;
    const onKey = e => { if (e.key === 'Escape') setMenu(false); };
    const onResize = () => { if (window.innerWidth > 900) setMenu(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [menu]);
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const onClick = e => { if (!e.target.closest('.dropdown')) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <a href={homeHref} className="logo" aria-label="William Nuveen, home" onClick={e => { if (onBack) { e.preventDefault(); onBack(); } }}>W<span>N</span></a>
        <div className="nav-links">
          {onBack
            ? <button className="nav-link" onClick={onBack}>← Back</button>
            : <a href={homeHref} className="nav-link hide-sm">Home</a>}
          <div className={'dropdown' + (open ? ' open' : '')} onMouseLeave={() => setOpen(false)}>
            <button className="dropdown-trigger" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(o => !o)}>
              Experience
              <svg className="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>
            </button>
            <div className="dropdown-menu"><div className="dropdown-menu-inner">
              {Object.entries(careerPages).map(([key, c], i) => (
                <button key={key} className={'dropdown-item' + (i === 0 ? ' featured' : '')}
                        onClick={() => { setOpen(false); onCareer(key); }}>
                  {i === 0 ? '✦ ' : ''}{c.company}
                </button>
              ))}
            </div></div>
          </div>
          <a className="nav-link" href={page === 'home' ? '#portfolio' : 'projects/'} aria-current={page === 'projects' ? 'page' : undefined}
             onClick={e => { if (page === 'home') { e.preventDefault(); goTo('portfolio'); } }}>Projects</a>
          <button className="nav-link hide-sm" onClick={() => goTo('about')}>Beyond Work</button>
          <a className="nav-link hide-sm" href="resume.html" aria-current={page === 'resume' ? 'page' : undefined}>Résumé</a>
          <button className="nav-link nav-cta" onClick={() => goTo('contact')}>Contact</button>
        </div>
        <button className="menu-btn" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(m => !m)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menu ? <path d="M6 6l12 12M18 6L6 18"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
          </svg>
        </button>
      </nav>
      {menu && (
        <div className="mobile-menu" id="mobile-menu">
          {onBack && <button className="mm-item" onClick={() => { setMenu(false); onBack(); }}>← Back to home</button>}
          <div className="mm-group">Experience</div>
          {Object.entries(careerPages).map(([key, c]) => (
            <button key={key} className="mm-item mm-sub" onClick={() => { setMenu(false); onCareer(key); }}>{c.company}</button>
          ))}
          <a className="mm-item" href={page === 'home' ? '#portfolio' : 'projects/'} onClick={e => { if (page === 'home') { e.preventDefault(); go('portfolio'); } }}>Projects</a>
          <button className="mm-item" onClick={() => go('about')}>Beyond Work</button>
          <a className="mm-item" href="resume.html">Résumé</a>
          <button className="mm-item mm-cta" onClick={() => go('contact')}>Contact</button>
        </div>
      )}
    </header>
  );
};

// ─── PROJECT CARD AND GALLERY ──────────────────────────────
const projectHref = p => `projects/${p.slug}/`;
const ProjectCard = ({ p }) => (
  <a className="pcard" href={projectHref(p)}>
    <div className="pcard-img"><SmartImg src={p.image} alt="" /></div>
    <div className="pcard-body">
      <div className="card-company">{p.company}</div>
      <h3 className="card-title">{p.title}</h3>
      <p className="card-sub">{p.shortDescription}</p>
      <span className="card-more" aria-hidden="true">View project →</span>
    </div>
  </a>
);

const Gallery = ({ images, title }) => {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const n = images.length;
  const go = d => setI(x => (x + d + n) % n);
  useArrowKeys(go, !zoom && n > 1);
  const swipe = useSwipe(go);
  return (
    <div className="pp-gallery">
      <div className="pm-stage" {...swipe}>
        <button className="pm-stage-img" onClick={() => setZoom(true)} aria-label={`View photo ${i + 1} of ${n} full screen`}>
          <SmartImg key={images[i]} src={images[i]} alt={`${title}, photo ${i + 1}`} eager />
        </button>
        <GalleryNav i={i} n={n} go={go} />
      </div>
      {n > 1 && (
        <div className="pm-thumbs" role="group" aria-label="Choose a photo">
          {images.map((src, j) => (
            <button key={src} className={'pm-thumb' + (j === i ? ' on' : '')} aria-label={`Photo ${j + 1}`} aria-current={j === i ? 'true' : undefined} onClick={() => setI(j)}>
              <SmartImg src={src} alt="" />
            </button>
          ))}
        </div>
      )}
      {zoom && <Lightbox images={images} start={i} onClose={last => { setZoom(false); setI(last); }} />}
    </div>
  );
};

const Footer = () => (
  <footer>
    <p>© 2026 William Nuveen. All rights reserved.</p>
    <div style={{ display: 'flex', gap: 20 }}>
      {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>}
      <a href="https://github.com/williamnuveen" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/williamnuveen/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </footer>
);

// ─── CAREER PAGE ───────────────────────────────────────────
const CareerPage = ({ pageKey, onClose, goHome }) => {
  const [lb, setLb] = useState(null);
  const [key, setKey] = useState(pageKey);
  const scroller = useRef(null);
  useOverlay(lb ? null : onClose, scroller);
  const data = careerPages[key];
  if (!data) return null;
  const photos = PHOTO_SLOTS[key] || [];
  const switchTo = k => { setKey(k); scroller.current && scroller.current.scrollTo(0, 0); };

  return (
    <div className="career" ref={scroller} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${data.company} career page`}>
      <Nav onBack={onClose} onCareer={switchTo} goTo={goHome} />
      <div className="career-hero" style={{ background: 'var(--navy)', padding: '80px 48px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div className="label on-dark" style={{ fontSize: '1rem', letterSpacing: '.16em' }}>{data.company}</div>
          <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.55)', marginBottom: 16 }}>{data.location} · {data.dates}</div>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>{data.role}</h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.65)', fontWeight: 300, maxWidth: 600 }}>{data.tagline}</p>
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
        {data.highlights && (
          <section style={{ marginBottom: 56 }}>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: '1.7rem', color: 'var(--navy)', marginBottom: 20 }}>Highlights</h2>
            {data.highlights.map(g => (
              <div key={g.heading} style={{ marginBottom: 28 }}>
                {g.heading !== 'Highlights' && <div className="label">{g.heading}</div>}
                <ul className="hl">{g.items.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </section>
        )}
        {data.sections.map((sec, i) => (
          <section key={i} style={{ marginBottom: 56 }}>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: '1.7rem', color: 'var(--navy)', marginBottom: 16 }}>{sec.heading}</h2>
            {sec.body.split('\n\n').map((p, j) => <p key={j} className="body" style={{ marginBottom: 16, maxWidth: '70ch' }}>{p}</p>)}
            {photos[i] && <Photo src={photos[i]} alt={`${data.company}, photo ${i + 1}`} onOpen={setLb} style={{ marginTop: 28, aspectRatio: '16/9' }} />}
          </section>
        ))}
        {data.pressLinks.length > 0 && (
          <div style={{ paddingTop: 40, borderTop: '1px solid rgba(0,0,0,.08)' }}>
            <div className="label">Press & links</div>
            <div className="links">
              {data.pressLinks.map(({ label, href }) => (
                <a key={label} className="btn btn-dark btn-sm" href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
              ))}
            </div>
          </div>
        )}
      </div>
      {lb && <Lightbox images={photos} start={photos.indexOf(lb)} onClose={() => setLb(null)} />}
    </div>
  );
};

// ─── PARALLAX PHOTO ────────────────────────────────────────
// The photo moves slower than the page while scrolling (like jamesbryant.engineer).
const ParallaxBand = ({ id, src, alt }) => {
  const box = useRef(null);
  const img = useRef(null);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = box.current, im = img.current;
      if (!el || !im) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (vh - r.top) / (vh + r.height);       // 0 entering → 1 leaving
      const travel = r.height * 0.28;                       // how far the photo drifts
      im.style.transform = `translate3d(0, ${((progress - 0.5) * travel).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);
  return (
    <figure id={id} className="hero-band" ref={box}>
      <img ref={img} src={src} alt={alt} decoding="async" />
    </figure>
  );
};

// ─── CAREER TIMELINE ───────────────────────────────────────
const Timeline = ({ onCareer }) => {
  const scroller = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = scroller.current; if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const nudge = dir => scroller.current && scroller.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  return (
    <section id="timeline" className="tl-section" aria-labelledby="tl-title">
      <div className="wrap">
        <div className="tl-head">
          <div>
            <div className="label">Career timeline</div>
            <h2 id="tl-title" className="h2">From intern to senior engineer</h2>
          </div>
          <div className="tl-arrows">
            <button className="tl-arrow" aria-label="Scroll timeline back" disabled={edge.start} onClick={() => nudge(-1)}>←</button>
            <button className="tl-arrow" aria-label="Scroll timeline forward" disabled={edge.end} onClick={() => nudge(1)}>→</button>
          </div>
        </div>
        <div className="tl-scroll" ref={scroller} onScroll={update} tabIndex={0} aria-label="Career timeline, scrolls sideways">
          <ol className="tl">
            {TIMELINE.map(({ year, now, items }) => (
              <li key={year} className={'tl-col' + (now ? ' now' : '')}>
                <span className="tl-dot" aria-hidden="true"></span>
                <div className="tl-year">{year}{now && <span className="tl-now">Now</span>}</div>
                <ul className="tl-items">
                  {items.map(it => (
                    <li key={it.title} className="tl-item">
                      <b>{it.title}</b>
                      {it.sub && <span className="tl-sub">{it.sub}</span>}
                      {it.points && <ul>{it.points.map(p => <li key={p}>{p}</li>)}</ul>}
                      {it.page && <button className="tl-link" onClick={() => onCareer(it.page)}>Read more →</button>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

// ─── SECTIONS ──────────────────────────────────────────────
const ML_PHOTOS = ['Multiply_Labs_Cluster_Exterior.jpg', 'Multiply_Labs_Robot_Arm.jpg', 'Multiply_Labs_Team_1.jpg', 'Multiply_Labs_Cluster_Floor.jpg', 'Multiply_Labs_4.jpg', 'Multiply_Labs_1.jpg'];

const MultiplyLabsSection = () => {
  const [lb, setLb] = useState(null);
  return (
    <section id="multiply-labs" className="ml">
      <div className="wrap two-col">
        <FadeUp><div>
          <div className="live"><i></i>Current role · Multiply Labs</div>
          <h2 className="serif" style={{ fontWeight: 400, fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Robotic systems for manufacturing biologics
          </h2>
          <p className="body" style={{ color: 'rgba(255,255,255,.7)', marginBottom: 14 }}>
            CAR-T cell therapy is a breakthrough cancer treatment where a patient's own T-cells are genetically engineered to recognize and kill cancer cells. Today it's a highly manual, contamination-prone process — we're automating it end to end.
          </p>
          <p className="body" style={{ color: 'rgba(255,255,255,.7)' }}>
            I design consumables and cartridges for next-generation therapeutic robotic manufacturing.
          </p>
          <div className="label on-dark" style={{ marginTop: 36, color: 'rgba(255,255,255,.5)' }}>Key partners</div>
          <div className="partners">
            {[['ThermoFisher','Global bioprocessing leader'],['Nvidia','Isaac robotics platform'],['AstraZeneca','Cell therapy collaboration'],['Legend Biotech','CAR-T manufacturing']].map(([n, s]) => (
              <div className="partner" key={n}><b>{n}</b><span>{s}</span></div>
            ))}
          </div>
          <a className="btn btn-gold btn-sm" href="https://www.multiplylabs.com/" target="_blank" rel="noopener noreferrer">Visit Multiply Labs ↗</a>
          <div className="press">
            <div className="press-label">In the press</div>
            {PRESS.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noopener noreferrer">{l} ↗</a>)}
          </div>
        </div></FadeUp>
        <FadeUp delay={120}>
          <div className="collage">
            <Photo src="Multiply_Labs_Cluster_Exterior.jpg" alt="Multiply Labs robotic cell-therapy manufacturing cluster" onOpen={setLb} style={{ gridColumn: 'span 2', height: 300 }} />
            <Photo src="Multiply_Labs_Robot_Arm.jpg" alt="Robotic arm inside a Multiply Labs cluster" onOpen={setLb} style={{ height: 170, borderRadius: 10 }} />
            <Photo src="Multiply_Labs_Team_1.jpg" alt="The Multiply Labs team" onOpen={setLb} style={{ height: 170, borderRadius: 10 }} />
          </div>
        </FadeUp>
      </div>
      {lb && <Lightbox images={ML_PHOTOS} start={ML_PHOTOS.indexOf(lb)} onClose={() => setLb(null)} />}
    </section>
  );
};

// "Beyond work" drawn as an exploded-view engineering drawing. Each hobby is a
// part with a balloon number, a leader line to the main assembly, and a spec
// callout. Scrolling the section into view pulls the assembly apart.
const PARTS = [
  { key: 'Hiking', pn: 'WN-101', name: 'Trail module', pos: 'xp-tl', cover: 'Hiking_1.JPG',
    specs: [['Terrain', 'California & beyond'], ['Drive', '2 legs, 4WD on scrambles'], ['Duty cycle', 'Every free weekend']] },
  { key: 'Skiing', pn: 'WN-102', name: 'Descent module', pos: 'xp-tr', cover: 'Skiing_1.jpg',
    specs: [['Range', 'Tahoe to the Alps'], ['Operating temp', 'Below 0 °C'], ['Known failure mode', 'Occasional yard sale']] },
  { key: 'Travel', pn: 'WN-103', name: 'Exploration module', pos: 'xp-bl', cover: 'Travel_3.jpg',
    specs: [['Range', 'Global'], ['Payload', 'Carry-on only'], ['Output', 'Inspiration, everywhere']] },
  { key: 'Robotics', pn: 'WN-104', name: 'Origin module', pos: 'xp-br', cover: 'Robotics_4.jpg',
    specs: [['Installed', 'Long before it was a job'], ['Material', 'Aluminum, PLA, persistence'], ['Status', 'Still the obsession']] },
];

const AboutSection = () => {
  const stage = useRef(null);
  const core = useRef(null);
  const parts = useRef({});
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(null);
  const [hot, setHot] = useState(null);

  // Leader lines + explode vectors, measured from the real layout
  useEffect(() => {
    const el = stage.current; if (!el) return;
    const measure = () => {
      // offsetLeft/Top give the resting layout, unaffected by the explode transform
      const c = core.current;
      const cx = c.offsetLeft + c.offsetWidth / 2;
      const cy = c.offsetTop + c.offsetWidth / 2;          // centre of the round portrait
      const r = c.offsetWidth / 2 + 6;
      const out = PARTS.map(p => {
        const node = parts.current[p.key]; if (!node) return null;
        const b = node.querySelector('.xp-balloon');
        const bx = node.offsetLeft + b.offsetLeft + b.offsetWidth / 2;
        const by = node.offsetTop + b.offsetTop + b.offsetHeight / 2;
        const dx = bx - cx, dy = by - cy, d = Math.hypot(dx, dy) || 1;
        const px = node.offsetLeft + node.offsetWidth / 2, py = node.offsetTop + node.offsetHeight / 2;
        node.style.setProperty('--vx', `${(cx - px).toFixed(0)}px`);
        node.style.setProperty('--vy', `${(cy - py).toFixed(0)}px`);
        return { key: p.key, x1: cx + dx / d * r, y1: cy + dy / d * r, x2: bx - dx / d * 16, y2: by - dy / d * 16 };
      }).filter(Boolean);
      setLines(out);
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll progress: 0 = assembled (parts tucked behind the core), 1 = exploded
  useEffect(() => {
    const el = stage.current; if (!el) return;
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (still || window.innerWidth <= 900) { el.style.setProperty('--p', 1); return; }
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.6)));
      const eased = 1 - Math.pow(1 - p, 3);
      el.style.setProperty('--p', eased.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    el.classList.add('xp-live');
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  const active = open && aboutCategories[open];
  return (
    <section id="about" className="xp-section" aria-labelledby="about-title">
      <div className="wrap">
        <div className="xp-sheet">
          <header className="xp-header">
            <div>
              <div className="label on-dark">Life outside the lab</div>
              <h2 id="about-title" className="xp-title">Beyond work</h2>
              <p className="xp-lede">An exploded view of what keeps me going outside the office. Select a part to see the photos.</p>
            </div>
            <div className="xp-sec">SECTION A–A</div>
          </header>

          <div className="xp-stage" ref={stage}>
            <svg className="xp-lines" aria-hidden="true">
              {lines.map(l => (
                <g key={l.key} className={hot === l.key ? 'on' : ''}>
                  <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
                  <circle cx={l.x1} cy={l.y1} r="3" />
                </g>
              ))}
            </svg>

            <div className="xp-core" ref={core}>
              <img src="William_Nuveen_Portrait.jpg" alt="William Nuveen" loading="lazy" />
              <div className="xp-core-tag"><b>ASSY-000</b><span>W. Nuveen · main assembly</span></div>
            </div>

            {PARTS.map((p, i) => (
              <div key={p.key} className={`xp-part ${p.pos}`} ref={n => { parts.current[p.key] = n; }}
                   onMouseEnter={() => setHot(p.key)} onMouseLeave={() => setHot(null)}>
                <button className="xp-photo" onClick={() => setOpen(p.key)}
                        onFocus={() => setHot(p.key)} onBlur={() => setHot(null)}
                        aria-label={`${p.key}: view ${aboutCategories[p.key].photos.length} photos`}>
                  <Img src={p.cover} alt="" />
                  <span className="xp-count">{aboutCategories[p.key].photos.length} photos ↗</span>
                </button>
                <span className="xp-balloon" aria-hidden="true">{i + 1}</span>
                <dl className="xp-spec">
                  <div className="xp-spec-head"><dt>{p.pn}</dt><dd>{p.key} · {p.name}</dd></div>
                  {p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </div>
            ))}
          </div>

          <footer className="xp-titleblock" aria-hidden="true">
            <div><span>Title</span><b>Beyond work — exploded view</b></div>
            <div><span>Dwg no.</span><b>WN-002</b></div>
            <div><span>Scale</span><b>1 : 1</b></div>
            <div><span>Drawn</span><b>W. Nuveen</b></div>
            <div><span>Sheet</span><b>1 of 1</b></div>
          </footer>
        </div>
      </div>
      {active && <Lightbox images={active.photos} start={0} onClose={() => setOpen(null)} />}
    </section>
  );
};

// ─── APP ───────────────────────────────────────────────────
const App = () => {
  const [career, setCareer] = useState(null);
  const goTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const goFromCareer = id => { setCareer(null); setTimeout(() => goTo(id), 60); };
  useEffect(() => {
    const m = window.location.hash.match(/^#career-(.+)$/);
    if (m && careerPages[m[1]]) setCareer(m[1]);
  }, []);

  return (
    <div>
      <a className="skip" href="#main">Skip to content</a>
      <Nav onCareer={setCareer} goTo={goTo} />

      <main id="main">
      <section className="hero">
        <div className="wrap hero-inner">
          <h1 className="hero-line">
            Hi, I'm William Nuveen — a <em>robotics hardware engineer</em> in San Francisco, designing consumables for cell‑therapy robots at <em>Multiply&nbsp;Labs</em>.
          </h1>
          <nav className="hero-links" aria-label="Quick links">
            <a href="#portfolio">Projects</a>
            <a href="resume.html">Résumé</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <a href="#hero-photo" className="hero-cue" aria-label="Scroll down"><span></span></a>
      </section>

      <ParallaxBand id="hero-photo" src="Multiply_Labs_Cluster.jpg" alt="William looking into a Multiply Labs robotic cell-therapy manufacturing cluster" />

      <section className="stats" aria-label="Highlights">
        <div className="wrap stats-grid">
          {STATS.map(([n, t]) => <div key={n}><div className="stat-num">{n}</div><div className="stat-txt">{t}</div></div>)}
        </div>
      </section>

      <Timeline onCareer={setCareer} />

      <MultiplyLabsSection />

      <section id="portfolio" className="section">
        <div className="wrap">
          <FadeUp><div className="proj-head">
            <div>
              <div className="label">Mechanical design</div>
              <h2 className="h2" style={{ fontSize: 'clamp(2.5rem,5vw,3.8rem)' }}>Selected projects</h2>
            </div>
            <a className="proj-all" href="projects/">All {portfolioItems.length} projects →</a>
          </div></FadeUp>
          <div className="cards cards-featured">
            {portfolioItems.filter(p => p.featured).map((p, i) => <FadeUp key={p.slug} delay={i * 50}><ProjectCard p={p} /></FadeUp>)}
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="wrap skills-grid">
          <FadeUp><div>
            <div className="label on-dark">Capabilities</div>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Skills &amp; education</h2>
            <p className="body" style={{ color: 'rgba(255,255,255,.62)', maxWidth: '36ch' }}>The tools and processes I use to take parts from CAD to mass production.</p>
          </div></FadeUp>
          <FadeUp delay={80}>
            <dl className="cap-list">
              {SKILL_GROUPS.map(([g, items]) => (
                <div key={g} className="cap-row">
                  <dt>{g}</dt>
                  <dd className="cap-tags">{items.map(s => <span key={s} className="cap-tag">{s}</span>)}</dd>
                </div>
              ))}
              {EDU.map(([g, title, detail]) => (
                <div key={g} className="cap-row">
                  <dt>{g}</dt>
                  <dd><b className="cap-title">{title}</b><span className="cap-detail">{detail}</span></dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      <AboutSection />

      <section id="resume" className="section" style={{ background: 'var(--warm-gray)' }}>
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <FadeUp><Img src="Resume-Screenshot-26.png" alt="Preview of William Nuveen's résumé" style={{ width: '100%', maxWidth: 380, borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,.14)', margin: '0 auto' }} /></FadeUp>
          <FadeUp delay={100}><div>
            <h2 className="h2" style={{ fontSize: 'clamp(2.5rem,5vw,3.8rem)', marginBottom: 20 }}>Résumé</h2>
            <p className="body" style={{ marginBottom: 32, maxWidth: '60ch' }}>
              Mechanical engineer with 6+ years of experience designing hardware for robotic systems in cell-therapy manufacturing, warehouse automation, and consumer robotics. I specialize in injection-molded and machined consumables and robot-facing interfaces built for mass manufacturability and reliable human and robotic operation.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn-gold" href="resume.html">Full résumé →</a>
              <a className="btn btn-dark" href={RESUME} target="_blank" rel="noopener noreferrer">Download PDF ↗</a>
            </div>
          </div></FadeUp>
        </div>
      </section>

      <section id="contact" style={{ background: 'var(--navy)', padding: '100px 0', textAlign: 'center' }}>
        <div className="wrap">
          <FadeUp>
            <div className="label on-dark">Get in touch</div>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#fff', lineHeight: 1.05, marginBottom: 24 }}>Let's build something great</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 520, margin: '0 auto 12px' }}>San Francisco, CA{CONTACT_EMAIL && ` · ${CONTACT_EMAIL}`}</p>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.92rem', maxWidth: 520, margin: '0 auto 44px' }}>
              Open to consulting on product design, consumables engineering, and robotics hardware. Email me about your project.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {CONTACT_EMAIL && <a className="btn btn-gold" href={`mailto:${CONTACT_EMAIL}?subject=Consulting%20inquiry`}>Email William</a>}
              <a className="btn btn-ghost" href="https://www.linkedin.com/in/williamnuveen/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </FadeUp>
        </div>
      </section>

      </main>

      <Footer />

      {career && <CareerPage pageKey={career} onClose={() => setCareer(null)} goHome={goFromCareer} />}
    </div>
  );
};

export default App;
export { CONTACT_EMAIL, Nav, careerPages, experiences, SKILL_GROUPS, RESUME, portfolioItems, ProjectCard, Gallery, Footer, FadeUp, projectHref };
