package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HojaMedica {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idHojaMedica=0;
    private HojaMedica hojaMedica;
    private String codigo;
    private LocalTime horaAtencion;
    private LocalDate fechaAtencion;
    private byte[] firma;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private CitaMedica citaMedica;
    private ArrayList<Resultado> resultados;
    private RecetaMedica recetaMedica;
    private EvaluacionMedica evaluacionMedica;

    public HojaMedica() {
    }

    public int getIdHojaMedica() {
        return idHojaMedica;
    }

    public void setIdHojaMedica(int idHojaMedica) {
        this.idHojaMedica = idHojaMedica;
    }

    public HojaMedica getHoja() {
        return hojaMedica;
    }

    public void setHoja(HojaMedica hojaMedica) {
        this.hojaMedica = hojaMedica;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalTime getHoraAtencion() {
        return horaAtencion;
    }

    public void setHoraAtencion(LocalTime horaAtencion) {
        this.horaAtencion = horaAtencion;
    }

    public LocalDate getFechaAtencion() {
        return fechaAtencion;
    }

    public void setFechaAtencion(LocalDate fechaAtencion) {
        this.fechaAtencion = fechaAtencion;
    }

    public byte[] getFirma() {
        return firma;
    }

    public void setFirma(byte[] firma) {
        this.firma = firma;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public CitaMedica getCitaMedica() {
        return citaMedica;
    }

    public void setCitaMedica(CitaMedica citaMedica) {
        this.citaMedica = citaMedica;
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

    public EvaluacionMedica getEvaluacionMedica() {
        return evaluacionMedica;
    }

    public void setEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        this.evaluacionMedica = evaluacionMedica;
    }
}
