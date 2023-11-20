import { usePathname } from "next/navigation";
import AppointmentIcon from "../icons/AppointmentIcon";
import DoctorIcon from "../icons/DoctorIcon";
import LabIcon from "../icons/LabIcon";
import PatientIcon from "../icons/PatientIcon";
import TriageIcon from "../icons/TriageIcon";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import MenuIcon from "../icons/MenuIcon";
import SanamaIcon from "../icons/SanamaIcon";

const Navbar = () => {
  const navbarItems = [
    { name: "Pacientes", route: "/patients", icon: PatientIcon },
    { name: "Doctores", route: "/doctors", icon: DoctorIcon },
    { name: "Citas", route: "/appointments", icon: AppointmentIcon },
    { name: "Triajes", route: "/triajes", icon: TriageIcon },
    { name: "Laboratorio", route: "/laboratories", icon: LabIcon },
  ];
  const pathname = usePathname();

  const isActive = (route) => pathname.startsWith(route);

  return (
    <nav class="bg-[#28539E] px-6 py-2 flex justify-between">
      <Link href="/">
        <div className="flex items-center">
          <SanamaIcon className="mr-4" />
          <span className="self-center text-2xl font-bold tracking-wider  text-white">
            SANAMA
          </span>
        </div>
      </Link>

      <div class="max-w-screen-xl flex flex-wrap items-center justify-between">
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-row rounded-lg text-md text-white">
            {navbarItems.map((item) => (
              <NavbarItem
                key={item.route}
                name={item.name}
                icon={item.icon}
                route={item.route}
                isActive={isActive(item.route)}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
