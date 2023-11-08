package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MedicamentoRecetado {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idMedicamentoRecetado=0;
    private String indicacion;
    private boolean otroMedicamento;
    private String otroNombreMedicamento;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private Medicamento medicamento;

    public MedicamentoRecetado() {
    }

    public int getIdMedicamentoRecetado() {
        return idMedicamentoRecetado;
    }

    public void setIdMedicamentoRecetado(int idMedicamentoRecetado) {
        this.idMedicamentoRecetado = idMedicamentoRecetado;
    }

    public String getIndicacion() {
        return indicacion;
    }

    public void setIndicacion(String indicacion) {
        this.indicacion = indicacion;
    }

    public boolean isOtroMedicamento() {
        return otroMedicamento;
    }

    public void setOtroMedicamento(boolean otroMedicamento) {
        this.otroMedicamento = otroMedicamento;
    }

    public String getOtroNombreMedicamento() {
        return otroNombreMedicamento;
    }

    public void setOtroNombreMedicamento(String otroNombreMedicamento) {
        this.otroNombreMedicamento = otroNombreMedicamento;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public Medicamento getMedicamento() {
        return medicamento;
    }

    public void setMedicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
    }
}
