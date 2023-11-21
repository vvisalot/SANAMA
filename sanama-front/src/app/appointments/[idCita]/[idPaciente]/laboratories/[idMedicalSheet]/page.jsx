"use client";
import React, { useEffect, useState } from 'react';
import LaboratoryMSTable from './LaboratoryMSTable';
import { appointmentService } from '@/services/appointmentService';
import TitleWithIcon from '@/components/TitleWithIcon';
import LabIcon from '@/components/icons/LabIcon';
import { parseLaboratoryMSTable } from '@/util/laboratoryMSParser'; 

const LaboratoryMSPage = () => {
    const [laboratoryData, setLaboratoryData] = useState([]);

    
    const idHojaMedica = 30;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await appointmentService.listarLaboratorios(idHojaMedica);
                console.log("LA DATA SIN PARSEAR ES: ", data)
                const parsedData = parseLaboratoryMSTable(data);
                console.log("LA DATA ES: ", parsedData)
                setLaboratoryData(parsedData);
            } catch (error) {
                console.error('Error al obtener datos de laboratorioMS: ', error);
            }
        };

        fetchData();
    }, [idHojaMedica]);

    return (
        <section className="p-4 md:p-14">
            <TitleWithIcon name={"Resultados de Laboratorio"} Icon={LabIcon} />
            <section>
                <LaboratoryMSTable data={laboratoryData}></LaboratoryMSTable>
            </section>
        </section>
    );
};

export default LaboratoryMSPage;
