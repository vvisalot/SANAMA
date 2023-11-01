package com.minsa.sanama.model.admision;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class  Paciente extends Persona{
    private String codigoSeguro;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int tipoSeguro=0;
    private String correo;
    private String direccion;
    private HistorialClinico historialClinico;
    private ArrayList<ProgramacionCita>  programacionesCitas;

    public Paciente() {

    }
    
    public String getCodigoSeguro() {
        return codigoSeguro;
    }

    public void setCodigoSeguro(String codigoSeguro) {
        this.codigoSeguro = codigoSeguro;
    }

    public int getTipoSeguro() {
        return tipoSeguro;
    }

    public void setTipoSeguro(int tipoSeguro) {
        this.tipoSeguro = tipoSeguro;
    }

    public HistorialClinico getHistorialClinico() {
        return historialClinico;
    }

    public void setHistorialClinico(HistorialClinico historialClinico) {
        this.historialClinico = historialClinico;
    }

    public ArrayList<ProgramacionCita> getProgramacionesCitas() {
        return programacionesCitas;
    }

    public void setProgramacionesCitas(ArrayList<ProgramacionCita> programacionesCitas) {
        this.programacionesCitas = programacionesCitas;
    }

   public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
