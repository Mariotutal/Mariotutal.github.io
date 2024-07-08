const experienceData = [
  {
    id: 1,
    jobtitle: "Front-end Developer",
    companyname: "2600Hz – Ooma / FocusServices",
    worktype: "Full-time",
    duration: "Jun 2021 - Present",
    location: "Remote",
    responsibility: [
      `Develop and implement beautiful and engaging user interfaces for web/desktop/mobile UCaaS cross-platform solution using ReactJS and TypeScript.`,
      `Build desktop applications using Electron that integrate with the web platform, providing a cohesive experience across devices.`,
      `Use WebSockets to enable real-time communication between web applications and servers, resulting in highly responsive and interactive applications.`,
      `Continuously improve the codebase and development processes to ensure that we are delivering real value to the business and the client.`,
      `Team lead for some initiatives.`,
      `Bootcamp teacher for ReactJS.`
    ],
    tools: ["API", "CSS", "Next.JS", "ReactJS", "JavaScript", "TypeScript", "ElectronJS", "SASS"]
  },
  {
    id: 2,
    jobtitle: "Full-stack Developer",
    companyname: "Premper",
    worktype: "Full-time",
    duration: "Sep 2018 - Jun 2021",
    location: "Remote",
    responsibility: [
      `Full-stack development experience on multiple projects using various technologies, including React-Native, Ruby on Rails, React JS, and Electron JS.`,
      `Implementation and launch of Open Source ERP platforms such as ODOO 12-13-14.`,
      `Development of transactional modules and websites for the ODOO 12-13-14 CMS ERP system, including the creation of payment platform modules integration.`,
      `Experience maintaining websites developed in Ruby on Rails / Solidus and a private CRM called Balloom.`,
      `Development of ETL processes using Python for synchronizing online stores with transactional systems.`
    ],
    tools: ["API", "Docker", "CSS", "ReactJS", "JavaScript", "ElectronJS", "React-native", "Postgres", "Python", "Ruby on Rails", "Odoo", "Solidus"]
  },
  {
    id: 3,
    jobtitle: "Backend Developer",
    companyname: "Freelance",
    worktype: "Freelance",
    duration: "May 2024 - Present",
    location: "Remote",
    responsibility: [
      `Developed an automated service in Go to update personal repositories on GitHub through console scripts in Linux.`,
      `Implemented secure authentication using GitHub personal access tokens and utilized the GitHub API to perform repository cloning and updating operations.`
    ],
    tools: ["Go", "GitHub", "Bash"]
  },
  {
    id: 4,
    jobtitle: "Full-stack Developer",
    companyname: "Saplic",
    worktype: "Full-time",
    duration: "Jul 2017 - Apr 2018",
    location: "San Salvador, El Salvador",
    responsibility: [
      `Created accounting modules for control software, specializing in merchandise return operations and inventory adjustments.`,
      `Engaged with clients to identify and assess new requirements, enabling effective system enhancements and modifications.`
    ],
    tools: ["Java", "Jboss", "JSP", "JSF", "PrimeFaces"]
  },
  {
    id: 5,
    jobtitle: "DB Administrator",
    companyname: "CAE (Centro de Asuntos Estudiantiles)",
    worktype: "Full-time",
    duration: "Jun 2016 - Dec 2016",
    location: "San Salvador, El Salvador",
    responsibility: [
      `Managed PostgreSQL databases to oversee the movie lending system, ensuring data integrity and optimal performance.`,
      `Developed and maintained database schemas, stored procedures, and triggers to facilitate seamless transactions and efficient data retrieval.`,
      `Designed and implemented database backup and recovery strategies to safeguard critical data and ensure business continuity.`,
      `Provided technical support and troubleshooting for database-related issues.`
    ],
    tools: ["Postgres", "DBadmin"]
  }
];

const educationData = [
  {
    name: "Central America University José Simeón Cañas (UCA)",
    status: "Postgraduate in Business Intelligence and Corporate Strategy",
    year: "2021",
  },
  {
    name: "Central America University José Simeón Cañas (UCA)",
    status: "Bachelor's Degree in Computer Science",
    year: "2018",
  }
];

const certificationData = [
  {
    name: "Kanban Essentials Professional Certificate (KEPC)",
    source: "CertiProf",
    date: "Issued Apr 2023 · No Expiration Date"
  },
  {
    name: "Scrum Foundation Professional Certificate (SFPC)",
    source: "CertiProf",
    date: "Issued Feb 2022 · No Expiration Date"
  }
];

export { experienceData, educationData, certificationData };