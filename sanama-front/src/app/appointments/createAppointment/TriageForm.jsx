import Picker from "@/components/buttons/Picker"

const TriageForm = ({ triageForm, setTriageForm }) => {

    return (
        <section id='section-4'>
            <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">Solicitud de triaje  </h2>
            <Picker
                name1={"sitriaje"}
                name2={"notriaje"}
                text={"¿El paciente necesita triaje?"}
                option1={"Si"}
                option2={"No"}
                value={triageForm}
                setValue={setTriageForm}
            >
            </Picker>
        </section>
    )
}

export default TriageForm