"use client"
const PatientInfo = ({ gender, dni, dateofbirth, patientState, insuranceCode, insuranceType }) => {


    return (
        <div className="block p-6 h-[300px] bg-white border border-gray-200 rounded-2xl shadow">
            <div className="p-2 text-2xl font-bold tracking-wider text-gray-900">
                Informacion personal:
            </div>

            <div className="flex text-large py-5 text-gray-700">
                <div className="pr-10">
                    <div className=" text-sm px-5 py-7">
                        <div>Genero</div>
                        <div className="font-bold">{gender}</div>
                    </div>

                    <div className=" text-sm px-5 py-7">
                        <div>DNI</div>
                        <div className="font-bold">{dni}</div>
                    </div>


                </div>

                <div className="pr-10">
                    <div className="text-sm px-5 py-7">
                        <div>Codigo de seguro</div>
                        <div className="font-bold">{insuranceCode}</div>
                    </div>

                    <div className="text-sm px-5 py-7">
                        <div>Tipo de seguro</div>
                        <div className="font-bold">{insuranceType}</div>
                    </div>
                </div>

                <div>
                    <div className=" text-sm px-5 py-3">
                        <div>Estado</div>
                        <div className="font-bold">
                            {patientState == 1 ? "Activo" : "Inactivo"}
                        </div>
                    </div>
                    <div className=" text-sm px-5 py-3">
                        <div>Fecha de nacimiento </div>
                        <div className="font-bold">{dateofbirth}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientInfo