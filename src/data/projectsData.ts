import landImg from "../assets/images/portfolio/land2.png";
import store3 from "../assets/images/portfolio/store3.png";
import storeImg from "../assets/images/portfolio/store2.png";

const projectsData = [
  {
    id: "comm-land",
    img: landImg,
    name: "comm.land",
    stack: ["< ReactJS />", "< ElectronJS />", "< Typescript />", "< MicroFrontend />" ,"< WebSockets />"],
    src: "https://www.comm.land/",
    source: "https://github.com/yourusername/comm-land",
    description:
      "Led the implementation of comm.land, a UCaaS solution for distributed workforces across multiple companies. Managed the deployment of the user portal and integration of real-time communication features using WebSockets.",
  },
  {
    id: "d-perlas",
    img: store3,
    name: "D'Perlas Jewelry E-commerce",
    stack: ["< Odoo />", "< Python />", "< PostgreSQL />"],
    src: "https://www.bisuteriadperlas.com/",
    source: "https://www.bisuteriadperlas.com/",
    description:
      "Utilized Odoo to develop a jewelry e-commerce platform with integrated payment systems and international shipping calculations, implemented across various company projects. Designed synchronization systems between internal inventory and Odoo for seamless operations.",
  },
  {
    id: "bou-outdoor",
    img: storeImg,
    name: "Bou Outdoor Store",
    stack: ["< Odoo />", "< Python />", "< Payment Gateway />"],
    src: "https://www.bououtdoorstore.com/",
    source: "https://www.bououtdoorstore.com/",
    description:
      "Created a retail e-commerce platform using Odoo, deployed in multiple company environments. Integrated payment systems and developed synchronization processes to maintain data integrity across platforms.",
  },
];

export { projectsData };
