import DoctorSchedules from "./DoctorSchedules"
import LegalResponsibility from "./LegalResponsibility"
import TriageForm from "./TriageForm"

const AppointementForm = ({ legalResponsibilityForm, setLegalResponsibilityForm, doctorId, setDoctorId, schedule, setSchedule, triageRequirement, setTriageRequirement }) => {

    return (
        <div>
            <LegalResponsibility
                legalResponsibilityForm={legalResponsibilityForm}
                setLegalResponsibilityForm={setLegalResponsibilityForm}
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



        </div>
    )
}

export default AppointementForm