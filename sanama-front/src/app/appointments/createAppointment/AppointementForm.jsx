import DoctorSchedules from "./DoctorSchedules"
import LegalResponsibility from "./LegalResponsibility"
import TriageForm from "./TriageForm"

const AppointementForm = (legalResponsibility, setLegalResponsibility, doctorId, setDoctorId, schedule, setSchedule, triageRequirement, setTriageRequirement) => {

    return (
        <div>
            <LegalResponsibility
                legalResponsibility={legalResponsibility}
                setLegalResponsibility={setLegalResponsibility}
            />

            <hr className="bg-gray-600 mt-10" />
            <DoctorSchedules
                doctorId={doctorId}
                setDoctorId={setDoctorId}
                schedule={schedule}
                setSchedule={setSchedule}
            />

            <hr className="bg-gray-600 mt-20" />
            <TriageForm
                triageForm={triageRequirement}
                setTriageForm={setTriageRequirement}

            ></TriageForm>


            <div className="flex flex-row-reverse">
                <button
                    type="submit"
                    className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center">Registrar cita
                </button>
            </div>
        </div>
    )
}

export default AppointementForm