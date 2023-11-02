package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.repository.laboratorio.ExamenMedicoRepository;
import com.minsa.sanama.repository.laboratorio.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrdenLaboratorioService {
    @Autowired
    OrdenLaboratorioRepository ordenLaboratorioRepository;
    @Autowired
    ExamenMedicoRepository examenMedicoRepository;

    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin) {
        List<OrdenLaboratorio> lordenes;
        lordenes = ordenLaboratorioRepository.listarOrdenLaboratorioFiltro(pv_filtro, pd_fecha_inicio, pd_fecha_fin);
        return lordenes;
    }

    public OrdenLaboratorio buscarOrdenLaboratorio(String pn_id_orden_laboratorio) {
        OrdenLaboratorio ordenLaboratorio;
        List<ExamenMedico> lexamenes;
        ordenLaboratorio = ordenLaboratorioRepository.buscarOrdenLaboratorio(pn_id_orden_laboratorio).get(0);
        lexamenes = examenMedicoRepository.buscarExamenMedico(pn_id_orden_laboratorio);
        ordenLaboratorio.setExamenMedico(lexamenes);

        return ordenLaboratorio;
    }

    public int atenderOrdenLaboratorioV1(OrdenLaboratorio orden){
        List<ExamenMedico> lexamenes=null;
        int valido;
        valido = ordenLaboratorioRepository.atenderOrdenLaboratorioV1(orden);
        lexamenes = orden.getExamenMedico();
        if(valido==1){
            for (ExamenMedico examen : lexamenes) {
                examenMedicoRepository.registrarExamenMedico(examen,orden.getIdOrdenLaboratorio());
            }
            return 1;
        }
        return 0;
    }
}
