package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.repository.laboratorio.ExamenMedicoRepository;
import com.minsa.sanama.repository.rrhh.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExamenMedicoService {

    @Autowired
    ExamenMedicoRepository examenMedicoRepository;



}
