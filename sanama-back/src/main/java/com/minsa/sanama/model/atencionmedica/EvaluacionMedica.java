package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class EvaluacionMedica {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idEvaluacion=0;
    private String motivoConsulta;
    private String antecedentes;
    private String examenGeneral;
    private String pielYFaneras;
    private String cabezaYCuello;
    private String toraxYPulmones;
    private String cardiovascular;
    private String abdomen;
    private String urogenital;
    private String extremidades;
    private String snc;
    private int glasgow;
    private int eyesOpen;
    private boolean talkingCorrectly;
    private boolean ableToMoveBody;
    private String observaciones;
    private String indicacionesFinales;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private List<Diagnostico> ldiagnosticos;

    public EvaluacionMedica(){

    }

    public int getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(int idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public String getAntecedentes() {
        return antecedentes;
    }

    public void setAntecedentes(String antecedentes) {
        this.antecedentes = antecedentes;
    }

    public String getExamenGeneral() {
        return examenGeneral;
    }

    public void setExamenGeneral(String examenGeneral) {
        this.examenGeneral = examenGeneral;
    }

    public String getPielYFaneras() {
        return pielYFaneras;
    }

    public void setPielYFaneras(String pielYFaneras) {
        this.pielYFaneras = pielYFaneras;
    }

    public String getCabezaYCuello() {
        return cabezaYCuello;
    }

    public void setCabezaYCuello(String cabezaYCuello) {
        this.cabezaYCuello = cabezaYCuello;
    }

    public String getToraxYPulmones() {
        return toraxYPulmones;
    }

    public void setToraxYPulmones(String toraxYPulmones) {
        this.toraxYPulmones = toraxYPulmones;
    }

    public String getCardiovascular() {
        return cardiovascular;
    }

    public void setCardiovascular(String cardiovascular) {
        this.cardiovascular = cardiovascular;
    }

    public String getAbdomen() {
        return abdomen;
    }

    public void setAbdomen(String abdomen) {
        this.abdomen = abdomen;
    }

    public String getUrogenital() {
        return urogenital;
    }

    public void setUrogenital(String urogenital) {
        this.urogenital = urogenital;
    }

    public String getExtremidades() {
        return extremidades;
    }

    public void setExtremidades(String extremidades) {
        this.extremidades = extremidades;
    }

    public String getSnc() {
        return snc;
    }

    public void setSnc(String snc) {
        this.snc = snc;
    }

    public int getGlasgow() {
        return glasgow;
    }

    public void setGlasgow(int glasgow) {
        this.glasgow = glasgow;
    }

    public int getEyesOpen() {
        return eyesOpen;
    }

    public void setEyesOpen(int eyesOpen) {
        this.eyesOpen = eyesOpen;
    }

    public boolean isTalkingCorrectly() {
        return talkingCorrectly;
    }

    public void setTalkingCorrectly(boolean talkingCorrectly) {
        this.talkingCorrectly = talkingCorrectly;
    }

    public boolean isAbleToMoveBody() {
        return ableToMoveBody;
    }

    public void setAbleToMoveBody(boolean ableToMoveBody) {
        this.ableToMoveBody = ableToMoveBody;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getIndicacionesFinales() {
        return indicacionesFinales;
    }

    public void setIndicacionesFinales(String indicacionesFinales) {
        this.indicacionesFinales = indicacionesFinales;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public List<Diagnostico> getLdiagnosticos() {
        return ldiagnosticos;
    }

    public void setLdiagnosticos(List<Diagnostico> ldiagnosticos) {
        this.ldiagnosticos = ldiagnosticos;
    }
}
