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

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav
      className={`top-0 left-0 min-h-screen transition-all duration-500 rounded-r-lg transform 
        ${
          isSidebarOpen
            ? "w-80 bg-primary-periwinkle text-white"
            : "w-22 bg-primary-dusk-blue text-white"
        }`}
      aria-label="Sidebar"
    >
      <div
        className={`pt-8 pl-4 pb-8 pr-4 w-full ${
          isSidebarOpen ? "justify-between flex" : "justify-around"
        }`}
      >
        <SidebarHeader className="w-full" isOpen={isSidebarOpen} />
        <SidebarToggleButton toggleSidebar={toggleSidebar}>
          <MenuIcon />
        </SidebarToggleButton>
      </div>

      <ul className={`w-full font-medium text-lg`}>
        <SidebarItem
          name={"Pacientes"}
          route={"/patients"}
          isOpen={isSidebarOpen}
          Icon={PatientIcon}
        ></SidebarItem>
        <SidebarItem
          name={"Medicos"}
          route={"/doctors"}
          isOpen={isSidebarOpen}
          Icon={DoctorIcon}
        ></SidebarItem>
        <SidebarItem
          name={"Citas"}
          route={"/appointments"}
          isOpen={isSidebarOpen}
          Icon={AppointmentIcon}
        ></SidebarItem>
        <SidebarItem
          name={"Triajes"}
          route={"/triajes"}
          isOpen={isSidebarOpen}
          Icon={TriageIcon}
        ></SidebarItem>
        <SidebarItem
          name={"Laboratorio"}
          route={"/laboratories"}
          isOpen={isSidebarOpen}
          Icon={LabIcon}
        ></SidebarItem>
        <SidebarItem
          name={"ModalLaboratorio"}
          route={"/addLab"}
          isOpen={isSidebarOpen}
          Icon={helpIcon}
        ></SidebarItem>
      </ul>
    </nav>
  );
};
export default Sidebar;
