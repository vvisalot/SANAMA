package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.repository.atencionmedica.HojaMedicaRepository;
import com.minsa.sanama.repository.laboratorio.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HojaMedicaService {
    @Autowired
    HojaMedicaRepository hojaMedicaRepository;
/*
    public int registrarHojaMedica(HojaMedica hojaMedica){
        int valido;
        valido = hojaMedicaRepository.registrarHojaMedica(hojaMedica);

        return valido;
    }

 */
}
