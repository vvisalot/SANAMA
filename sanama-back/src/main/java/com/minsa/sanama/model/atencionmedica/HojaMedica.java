package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HojaMedica {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idHojaMedica=0;

    private int idHistorialClinico;
    private String codigo;
    private LocalTime horaAtencion;
    private LocalDate fechaAtencion;
    private LocalTime horaCierre;
    private LocalDate fechaCierre;
    private boolean estadoHojaMedica;
    private Especialidad especialidadDerivada;
    private Medico medicoAtendiente;
    private byte[] selloFirma;
    private LocalDate fechaProximaCita;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    //private CitaMedica citasMedica;
    private ArrayList<Resultado> resultados;
    private RecetaMedica recetaMedica;

    public HojaMedica() {
    }

    public int getIdHistorialClinico() {
        return idHistorialClinico;
    }

    public Medico getMedicoAtendiente() {
        return medicoAtendiente;
    }

    public LocalDate getFechaAtencion() {
        return fechaAtencion;
    }

    public void setFechaAtencion(LocalDate fechaAtencion) {
        this.fechaAtencion = fechaAtencion;
    }

    public LocalTime getHoraCierre() {
        return horaCierre;
    }

    public void setHoraCierre(LocalTime horaCierre) {
        this.horaCierre = horaCierre;
    }

    public LocalDate getFechaCierre() {
        return fechaCierre;
    }

    public void setFechaCierre(LocalDate fechaCierre) {
        this.fechaCierre = fechaCierre;
    }

    public boolean isEstadoHojaMedica() {
        return estadoHojaMedica;
    }

    public void setEstadoHojaMedica(boolean estadoHojaMedica) {
        this.estadoHojaMedica = estadoHojaMedica;
    }

    public byte[] getSelloFirma() {
        return selloFirma;
    }

    public void setSelloFirma(byte[] selloFirma) {
        this.selloFirma = selloFirma;
    }

    public LocalDate getFechaProximaCita() {
        return fechaProximaCita;
    }

    public void setFechaProximaCita(LocalDate fechaProximaCita) {
        this.fechaProximaCita = fechaProximaCita;
    }

    public void setMedicoAtendiente(Medico medicoAtendiente) {
        this.medicoAtendiente = medicoAtendiente;
    }

    public void setIdHistorialClinico(int idHistorialClinico) {
        this.idHistorialClinico = idHistorialClinico;
    }

    public Especialidad getEspecialidadDerivada() {
        return especialidadDerivada;
    }

    public void setEspecialidadDerivada(Especialidad especialidadDerivada) {
        this.especialidadDerivada = especialidadDerivada;
    }

    public int getIdHojaMedica() {
        return idHojaMedica;
    }

    public void setIdHojaMedica(int idHojaClinica) {
        this.idHojaMedica = idHojaClinica;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }



    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    /*
     * public ArrayList<CitaMedica> getCitasMedicas() {
     * return citasMedicas;
     * }
     * 
     * public void setCitasMedicas(ArrayList<CitaMedica> citasMedicas) {
     * this.citasMedicas = citasMedicas;
     * }
     */

    public LocalTime getHoraAtencion() {
        return horaAtencion;
    }

    public void setHoraAtencion(LocalTime horaAtencion) {
        this.horaAtencion = horaAtencion;
    }

    public ArrayList<Resultado> getResultados() {
        return resultados;
    }

    public void setResultados(ArrayList<Resultado> resultados) {
        this.resultados = resultados;
    }

    public RecetaMedica getRecetaMedica() {
        return recetaMedica;
    }

    public void setRecetaMedica(RecetaMedica recetaMedica) {
        this.recetaMedica = recetaMedica;
    }

}
