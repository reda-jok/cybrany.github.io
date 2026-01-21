// ===== Matrix background (canvas) =====
console.log("🔥 main.js LOADED");

(() => {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let drops = [];
  const chars = "01CybranyMohammedMazen";
  const charArray = chars.split("");
  const fontSize = 14;
  let columns = 0;
  let intervalId = null;

  const resizeCanvas = () => {
    // Use devicePixelRatio for sharper text
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(w / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -100);
  };

  const draw = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.fillStyle = "rgba(20, 20, 20, 0.05)";
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Vary opacity for depth effect
      const opacity = Math.random() * 0.5 + 0.1;
      ctx.fillStyle = `rgba(86, 227, 98, ${opacity})`;
      ctx.fillText(char, x, y);

      if (y > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  // Start
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let last = 0;
function animate(now) {
  if (now - last > 50) {
    draw();
    last = now;
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


  // // Optional: stop when tab not visible (saves CPU)
  // document.addEventListener("visibilitychange", () => {
  //   if (document.hidden) {
  //     clearInterval(intervalId);
  //     intervalId = null;
  //   } else if (!intervalId) {
  //     intervalId = setInterval(draw, 50);
  //   }
  // });
})();

document.documentElement.classList.add("js");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        fadeObserver.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);

function observeFadeIns(scope = document) {
  scope.querySelectorAll(".fade-in:not(.in-view)")
    .forEach(el => fadeObserver.observe(el));
}
document.addEventListener("DOMContentLoaded", () => {
  observeFadeIns();
});
console.log("Fade elements found:", document.querySelectorAll(".fade-in").length);

//the humberger menu
   const nav = document.getElementById("siteNav");
  const btn = nav.querySelector(".nav-toggle");
  const links = nav.querySelectorAll(".nav-links a");

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

 // Icons
    lucide.createIcons();

    // Footer year
    const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


    // Fade-in on view
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("in-view");
      }
    }, { threshold: 0.12 });
    console.log("Setting up fade-in observer");
    document.querySelectorAll(".fade-in").forEach(el => io.observe(el));

    // Counter animation (starts when the counter is visible)
    const counterObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;

        if (el.dataset.started === "true") continue;
        el.dataset.started = "true";

        const end = Number(el.dataset.end || 0);
        const suffix = el.dataset.suffix || "";
        const duration = 1200;

        const start = performance.now();
        const from = 0;

        function tick(now){
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          const value = Math.round(from + (end - from) * eased);
          el.textContent = value.toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        counterObserver.unobserve(el);
      }
    }, { threshold: 0.25 });

    document.querySelectorAll("[data-counter]").forEach(el => counterObserver.observe(el));

// Courses loading
function loadCourses() {
const courses = [
  {
    id: 1,
    title: "CEH v12 Certified Ethical Hacker",
    level: "Advanced",
    icon: "Shield", // Lucide Shield icon
    duration: "40 hours",
    category: "Cybersecurity",
    description: "Master ethical hacking methodologies, penetration testing, and vulnerability assessment techniques.",
    curriculum: [
      "Introduction to Ethical Hacking",
      "Footprinting and Reconnaissance",
      "Scanning Networks & Enumeration",
      "Vulnerability Analysis",
      "System Hacking Techniques",
      "Malware Threats & Countermeasures",
      "Social Engineering Attacks",
      "Web Application Penetration Testing",
      "Wireless Network Security",
      "Cryptography & Evasion Techniques",
      "Cloud Computing Security",
      "IoT Hacking & Mobile Platforms"
    ],
    certification: "CEH v12"
  },
  {
    id: 2,
    title: "Data Center and Networking",
    level: "Intermediate",
    icon: "Server", // Lucide Server icon
    duration: "35 hours",
    category: "Infrastructure",
    description: "Comprehensive training on data center architecture, network design, and infrastructure management.",
    curriculum: [
      "Data Center Fundamentals",
      "Network Topologies & Architectures",
      "Switching & Routing Protocols",
      "Storage Area Networks (SAN)",
      "Virtualization Technologies",
      "Network Security Implementation",
      "Disaster Recovery Planning",
      "Power & Cooling Management",
      "Monitoring & Performance Optimization"
    ]
  },
  {
    id: 3,
    title: "CompTIA Pentest+",
    level: "Intermediate",
    icon: "Bug", // Lucide Bug icon
    duration: "30 hours",
    category: "Cybersecurity",
    description: "Hands-on penetration testing and vulnerability management certification preparation.",
    curriculum: [
      "Planning & Scoping Penetration Tests",
      "Information Gathering & Vulnerability Scanning",
      "Attacks & Exploits",
      "Penetration Testing Tools",
      "Reporting & Communication",
      "Web Application Attacks",
      "Wireless & Mobile Security Testing",
      "Scripting for Penetration Testing"
    ],
    certification: "CompTIA PenTest+"
  },
  {
    id: 4,
    title: "CompTIA Server+",
    level: "Intermediate",
    icon: "Database", // Lucide Database icon
    duration: "25 hours",
    category: "Infrastructure",
    description: "Server installation, configuration, maintenance, and troubleshooting expertise.",
    curriculum: [
      "Server Hardware Installation & Configuration",
      "Server Administration",
      "Storage Technologies & RAID",
      "Server Security Implementation",
      "Disaster Recovery Planning",
      "Troubleshooting Methodology",
      "Virtualization Concepts",
      "Scripting for Server Management"
    ],
    certification: "CompTIA Server+"
  },
  {
    id: 5,
    title: "Cyber Security Essentials",
    level: "Beginner",
    icon: "shield-alert", // Lucide ShieldAlert icon
    duration: "20 hours",
    category: "Cybersecurity",
    description: "Fundamental cybersecurity principles, threats, and protective measures for beginners.",
    curriculum: [
      "Introduction to Cybersecurity",
      "Common Cyber Threats & Attacks",
      "Network Security Fundamentals",
      "Endpoint Protection",
      "Identity & Access Management",
      "Security Policies & Compliance",
      "Incident Response Basics",
      "Cryptography Fundamentals",
      "Security Awareness Best Practices"
    ]
  },
  {
    id: 6,
    title: "AT&T Fiber Optic and Ethernet Cabling",
    level: "Intermediate",
    icon: "Network", // Lucide Network icon
    duration: "15 hours",
    category: "Networking",
    description: "Practical fiber optic and Ethernet cabling installation, testing, and maintenance.",
    curriculum: [
      "Fiber Optic Cable Types & Properties",
      "Ethernet Cable Standards (Cat5e/6/6a/7)",
      "Cable Termination Techniques",
      "Testing & Certification Methods",
      "Network Rack Installation",
      "Safety Procedures & Standards",
      "Troubleshooting Connectivity Issues",
      "Documentation & Labeling Best Practices"
    ]
  },
  {
    id: 7,
    title: "GNS3 With VMware vSphere & Workstation",
    level: "Advanced",
    icon: "Workflow", // Lucide Workflow icon for network simulation
    duration: "25 hours",
    category: "Virtualization",
    description: "Network simulation using GNS3 with VMware virtualization platforms for complex lab environments.",
    curriculum: [
      "GNS3 Architecture & Installation",
      "VMware vSphere Fundamentals",
      "Virtual Network Device Integration",
      "Complex Topology Design",
      "Troubleshooting Virtual Networks",
      "Performance Optimization",
      "Automation with Python & APIs",
      "Real-World Scenario Simulations"
    ]
  },
  {
    id: 8,
    title: "MCSA (Microsoft Certified Solutions Associate)",
    level: "Intermediate",
    icon: "Monitor", // Lucide Monitor icon for Microsoft
    duration: "50 hours",
    category: "Microsoft",
    description: "Microsoft server administration, configuration, and management certification training.",
    curriculum: [
      "Windows Server Installation & Configuration",
      "Active Directory Domain Services",
      "Network Services (DNS, DHCP, IPAM)",
      "Group Policy Implementation",
      "Server Virtualization with Hyper-V",
      "Storage Solutions Configuration",
      "Identity Management",
      "High Availability & Disaster Recovery"
    ],
    certification: "MCSA"
  },
  {
    id: 9,
    title: "Sophos Firewall Administration",
    level: "Intermediate",
    icon: "Flame", // Lucide Flame icon for firewall
    duration: "18 hours",
    category: "Network Security",
    description: "Complete Sophos firewall configuration, management, and security policy implementation.",
    curriculum: [
      "Sophos Firewall Architecture",
      "Initial Configuration & Deployment",
      "Security Policy Creation & Management",
      "VPN Configuration (Site-to-Site & Remote Access)",
      "Web Filtering & Application Control",
      "Intrusion Prevention System (IPS)",
      "Log Analysis & Reporting",
      "High Availability Configuration",
      "Troubleshooting Common Issues"
    ]
  },
  {
    id: 10,
    title: "ISO 27001 Lead Implementer",
    level: "Advanced",
    icon: "Badge-check", // Lucide BadgeCheck for certification
    duration: "30 hours",
    category: "Compliance",
    description: "Information Security Management System (ISMS) implementation based on ISO 27001 standards.",
    curriculum: [
      "ISO 27001 Framework Overview",
      "Risk Assessment & Treatment",
      "ISMS Scope & Policy Development",
      "Asset Management & Classification",
      "Access Control Policies",
      "Incident Management Procedures",
      "Business Continuity Planning",
      "Internal Auditing Techniques",
      "Certification Preparation",
      "Continuous Improvement Strategies"
    ],
    certification: "ISO 27001 LI"
  },
  {
    id: 11,
    title: "Fortinet NSE4 - Network Security Professional",
    level: "Intermediate",
    icon: "shield-plus", // Lucide ShieldCheck for security
    duration: "35 hours",
    category: "Network Security",
    description: "Fortinet security fabric configuration, administration, and troubleshooting.",
    curriculum: [
      "FortiGate Security Fabric Architecture",
      "Firewall Policies & NAT Configuration",
      "VPN Technologies (IPsec, SSL)",
      "Intrusion Prevention System",
      "Web Filtering & Application Control",
      "Antivirus & Anti-malware Configuration",
      "Authentication & User Management",
      "High Availability & Clustering",
      "Monitoring & Logging Analysis",
      "Troubleshooting FortiGate Devices"
    ],
    certification: "Fortinet NSE4"
  }
];

const grid = document.getElementById("coursesGrid");

if (!grid) {
  console.log("Courses grid element not found, aborting course load.");
  return;
} //safety check

// 1. Detect if we are on the Home page
  const isHomePage = window.location.pathname.endsWith("index.html") || 
                     window.location.pathname === "/" || 
                     window.location.pathname === "";
coursesToShow = isHomePage ? courses.slice(0, 3) : courses;

coursesToShow.forEach((course, index) => {

  const wrapper = document.createElement("div");
  wrapper.className = "course-wrapper fade-in";
  wrapper.style.setProperty("--delay", `${index * 50}ms`);

  wrapper.innerHTML = `
  <div class="cyber-card course fade-in p-6">
    <div class="course-icon-wrap">
      <i data-lucide="${course.icon}" class="course-icon"></i>
    </div>

    <span class="pill">${course.level}</span>

    <h3 class="font-orbitron">${course.title}</h3>
    <p>${course.description}</p>

    <div class="mt-10">
      <strong class="gradient-text">${course.duration}</strong>
    </div>

    <button class="btn-outline mt-10 toggle-btn">
      View Details
    </button>
  </div>
    <div class="course-details">
      <ul class="muted">
        ${course.curriculum.map(i => `<li> ${i}</li>`).join("")}
      </ul>

      <a class="btn mt-10" herf="#" onclick="enroll(event, '${course.title}')">Enroll Now</a>
    </div>
  `;
  grid.appendChild(wrapper);
  lucide.createIcons();

  console.log("Added course card:", course.title);
});
observeFadeIns(grid);
}


function setupCourseToggles() {
  const wrappers = document.querySelectorAll(".course-wrapper");
  wrappers.forEach(wrapper => {
    const toggleBtn = wrapper.querySelector(".toggle-btn");
    const details = wrapper.querySelector(".course-details");

    toggleBtn.addEventListener("click", () => {
      const isOpen = details.classList.contains("open");

      details.classList.toggle("open");
      toggleBtn.textContent = isOpen ? "View Details" : "Hide Details";
    });
  });
}

if (document.getElementById("coursesGrid")) {
  loadCourses();
  setupCourseToggles();
}else {
  console.log("No courses grid found, skipping course load.");
}

function loadExperiences() {
  // === Data ===
const skills = [
  { name: "Penetration Testing", level: 95, icon: "shield" },
  { name: "Network Security", level: 90, icon: "server" },
  { name: "Malware Analysis", level: 85, icon: "code" },
  { name: "Incident Response", level: 88, icon: "lock" },
];

const experience = [
  {
    title: "Sr. Cyber Security Engineer",
    company: "Cyber Code",
    period: "2025 - Present",
    description: "Extensive experience with leading firewall technologies (Palo Alto, Fortinet, Cisco) and perimeter security solutions. In-depth knowledge of network infrastructure design, vulnerability management, and securing high-availability environments[cite: 39, 40, 41, 42, 43]."
  },
  {
    title: "IT & Cyber Security Trainer",
    company: "America University of Baghdad",
    period: "2024 - Present",
    description: "Conducting training in Cisco, CompTIA, Cyber Security, and Linux[cite: 71, 72, 73, 74, 75, 76]."
  },
  {
    title: "IT Team Leader",
    company: "Smart Oasis",
    period: "2024 - 2025",
    description: "Monitoring team performance, assisting with hiring and training, and providing functional guidance and management support to project teams[cite: 52, 65, 66]."
  },
  {
    title: "IT Manager",
    company: "Fajr Badeea",
    period: "2022 - 2023",
    description: "Refining long-term infrastructure strategies, managing cost reductions, and supervising company offices in Iraq while maintaining IT systems and personnel development[cite: 83, 84, 87, 88, 89, 93, 95]."
  },
  {
    title: "IT Manager",
    company: "Dijla International Foodstuff Trading L.L.C",
    period: "2021 - 2022",
    description: "Designed and implemented company infrastructure from scratch, led large IT projects, and managed IT staff and policy development[cite: 96, 97, 98, 101, 105, 107]."
  },
  {
    title: "Cisco Network Trainer",
    company: "RIRP by WFP",
    period: "2021 - 2021",
    description: "Conducted technical training for new graduates and employees, including help desk training and technical interview preparation[cite: 119, 121, 122, 123]."
  },
  {
    title: "Cyber Security Analyst",
    company: "TFA",
    period: "2021 (2 Month Contract)",
    description: "Used analytic tools for threat patterns, investigated security alerts, performed penetration testing, and directed installation of security devices[cite: 109, 110, 111, 112, 116, 118]."
  },
  {
    title: "Network Engineer",
    company: "Vital Touch",
    period: "2020 - 2021",
    description: "Provided network administration, installed monitoring systems like SolarWinds and Zabbix, and managed Cisco device configurations[cite: 124, 126, 129, 132]."
  },
  {
    title: "Network & Security Engineer",
    company: "CENTRAL BANK OF IRAQ",
    period: "2015 - 2020",
    description: "Administered network and security hardware/software, conducted bank audits for security standards, and researched security weaknesses[cite: 133, 134, 136, 138, 140]."
  },
  {
    title: "IT Network Engineer",
    company: "TALIA LIMITED",
    period: "2015 - 2015",
    description: "Served as Team Leader and IT Engineer focusing on systems administration, employee training, and LAN administration[cite: 142, 143, 146, 147, 148, 149]."
  },
  {
    title: "IT Network Engineer",
    company: "Atlas for GIS and Surveying Systems",
    period: "2014 - 2015",
    description: "Team lead for the Iraqi National ID Project, responsible for network installation, maintenance, and training[cite: 151, 152, 153, 154, 156]."
  },
  {
    title: "Wireless Network Engineer",
    company: "IQ NETWORKS",
    period: "2013 - 2014",
    description: "Installed and maintained wireless systems, handled network design, and provided first-line support for infrastructure[cite: 159, 160, 162, 163, 164, 165]."
  },
  {
    title: "IT Team Leader",
    company: "Larsa",
    period: "2011 - 2013",
    description: "Coordinated IT teams, managed ticketing systems, and provided customer support for multi-culture clients[cite: 166, 167, 168, 171, 172]."
  }
];

const certifications = [
  { name: "eCPPTv3", fullName: "eLearnSecurity Certified Penetration Tester v3" },
  { name: "CNSP", fullName: "Certified Network Security Professional" },
  { name: "CNVP", fullName: "Certified Network Vulnerability Professional" },
  { name: "CSAP+", fullName: "Certified Security Analyst Plus" },
  { name: "Pentest+", fullName: "CompTIA Pentest+" },
  { name: "CySA+", fullName: "CompTIA Cybersecurity Analyst+" },
  { name: "Sec+,N+,A+", fullName: "CompTIA Security+, Network+, and A+ certifications" },
  { name: "CAPT", fullName: "Certified Application Penetration Tester" },
  { name: "eJPTv2", fullName: "eLearnSecurity Junior Penetration Tester v2" },
  { name: "CCT", fullName: "Certified Cybersecurity Technician" },
  { name: "CCNP (RS | Sec)", fullName: "Cisco Certified Network Professional (Routing & Switching | Security)" },
  { name: "CCNA (RS | Sec | Cyber | Acad)", fullName: "Cisco Certified Network Associate (Routing & Switching | Security | Cybersecurity | Academic)" },
  { name: "Linux LPI", fullName: "Linux Professional Institute Certification" },
  { name: "NSE1,2,3 FCP", fullName: "(NSE1, NSE2, NSE3) Fortinet Certified Professional certifications" },
  { name: "PMI", fullName: "(Project Management Institute) Project Management Professional certification" },
  { name: "IBM Cyber Analyst Pro", fullName:"IBM Cyber Analyst Professional certification"},
  {name:"Google IT",fullName:"Google IT Support Professional Certificate"},
  {name:"CNSS",fullName:"(Certified Network Security Specialist)"},
  {name:"CSFPC",fullName:"(Certified Systems Forensic and Investigation Professional)"}
];


// === Render Skills ===
const skillContainer = document.getElementById("skillsGrid");
  if (!skillContainer) return;

  skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "skill-bar";
    div.innerHTML = `
      <div class="skill-label">
        <span>${skill.name}</span>
        <span>${skill.level}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="--skill-width: ${skill.level}%"></div>
      </div>
    `;
    skillContainer.appendChild(div);
  });
setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('style').split(': ')[1];
    });
  }, 100);
// === Render Experience ===
const expContainer = document.getElementById("experienceTimeline");

experience.forEach((exp, index) => {
  const div = document.createElement("div");
  div.className = "experience-item"; // Simplified class
  
  div.innerHTML = `
    <div class="timeline-dot"></div>

    <div class="experience-item-container">
      <div class="experience-card cyber-card p-6">
        <span class="pill">${exp.period}</span>
        <h4 class="font-orbitron text-lg font-semibold text-foreground mt-2">${exp.title}</h4>
        <p class="text-primary font-bold">${exp.company}</p>
        <p class="text-muted-foreground text-sm leading-relaxed">${exp.description}</p>
      </div>
    </div>

    <div class="hidden md:block w-[45%]"></div>
  `;
  expContainer.appendChild(div);
});
// === Render Certifications ===
const certGrid = document.getElementById("certGrid");
certifications.forEach(cert => {
  const div = document.createElement("div");
  div.className = "cyber-card p-4 text-center fade-in";
  div.innerHTML = `
    <div class=" mx-aut">
        <i data-lucide="graduation-cap" class="w-6 h-6 text-primary"></i>
      </div>
      <h4 class="font-orbitron text-sm font-bold text-foreground mb-1">${cert.name}</h4>
    <p class="text-muted-foreground text-xs">${cert.fullName}</p>
  `;
  certGrid.appendChild(div);
});

// === Activate Lucide Icons ===
lucide.createIcons();

}
if (document.getElementById("certGrid")) {
  loadExperiences();
}else {
  console.log("No experience section found, skipping load.");
}


function enroll(e,course) {
  e.preventDefault(); // 🚨 THIS IS IMPORTANT
  const phoneNumber = "9647708828800";
  if (course === "CTA") {
    const msg = encodeURIComponent(`Hello, I want to get started with Cybersecurity courses`);
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  } else {
  const msg = encodeURIComponent(`Hello, I want to enroll in the ${course} course`);
  window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
}; };
