import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarItem from "@/components/sidebar/SidebarItem";
import SidebarToggleButton from "@/components/sidebar/SidebarToggleButton";

import DoctorIcon from "@/components/icons/DoctorIcon.jsx";
import PatientIcon from "@/components/icons/PatientIcon";
import LabIcon from "@/components/icons/LabIcon.jsx";
import MenuIcon from "@/components/icons/MenuIcon.jsx";
import AppointmentIcon from "@/components/icons/AppointmentIcon.jsx";
import TriageIcon from "@/components/icons/TriageIcon";
import helpIcon from "@/components/icons/HelpIcon";

import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Pacientes", route: "/patients", Icon: PatientIcon },
  { name: "Medicos", route: "/doctors", Icon: DoctorIcon },
  { name: "Citas", route: "/appointments", Icon: AppointmentIcon },
  { name: "Triajes", route: "/triajes", Icon: TriageIcon },
  { name: "Laboratorio", route: "/laboratories", Icon: LabIcon },
  { name: "ModalLaboratorio", route: "/addLab", Icon: helpIcon },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const isActive = (route) => pathname.startsWith(route);

  const baseNavClass =
    "top-0 left-0 min-h-screen transition-all duration-500 rounded-r-lg transform";
  const openNavClass = "w-80 bg-primary-dusk-blue text-white";
  const closedNavClass = "w-22 bg-primary-dusk-blue text-white";

  return (
    <nav
      className={`${baseNavClass} ${
        isSidebarOpen ? openNavClass : closedNavClass
      }`}
      aria-label="Sidebar"
    >
      <div
        className={`pt-8 pl-4 pb-8 pr-4 w-full ${
          isSidebarOpen ? "justify-between" : "justify-around"
        } flex`}
      >
        <SidebarHeader className="w-full" isOpen={isSidebarOpen} />
        <SidebarToggleButton toggleSidebar={toggleSidebar}>
          <MenuIcon />
        </SidebarToggleButton>
      </div>

      <ul className="w-full font-medium text-lg">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.route}
            name={item.name}
            route={item.route}
            isOpen={isSidebarOpen}
            Icon={item.Icon}
            isActive={isActive(item.route)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
