package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.repository.atencionmedica.HojaMedicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HojaMedicaService {
    @Autowired
    HojaMedicaRepository hojaMedicaRepository;

    public int registrarHojaMedica(HojaMedica hojaMedica,int pn_id_historial_clinico) {
        int valido;
        valido = hojaMedicaRepository.registrarHojaMedica(hojaMedica,pn_id_historial_clinico);

        return valido;
    }

    public int eliminarHojaMedica(String pn_id_hoja_medica) {
        int valido;
        valido = hojaMedicaRepository.eliminarHojaMedica(pn_id_hoja_medica);

        return valido;
    }

    public ProgramacionCita buscarTriajeCitaMedica(int pn_id_cita) {
        ProgramacionCita cita;
        cita = hojaMedicaRepository.buscarTriajeCitaMedica(pn_id_cita).get(0);
        return cita;
    }
}
