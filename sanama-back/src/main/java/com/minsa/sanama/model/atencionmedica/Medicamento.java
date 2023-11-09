package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Medicamento {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idMedicamento=0;
    private String nombre;
    private int vecesSeleccionado;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;

    public Medicamento(){
    }

    public int getIdMedicamento() {
        return idMedicamento;
    }

    public void setIdMedicamento(int idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getVecesSeleccionado() {
        return vecesSeleccionado;
    }

    public void setVecesSeleccionado(int vecesSeleccionado) {
        this.vecesSeleccionado = vecesSeleccionado;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
