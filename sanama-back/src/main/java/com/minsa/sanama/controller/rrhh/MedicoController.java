package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.services.rrhh.MedicoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class MedicoController {
    @Autowired
    MedicoService medicoService;

    @GetMapping(value = "/get/medico")
    @ResponseBody
    public List<Medico> listarMedicos() {
        List<Medico> medicos;
        medicos = medicoService.listarMedicos();
        return medicos;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarMedicosPorEspecialidadNombreCmp")
    @ResponseBody
    public List<Medico> listarMedicosPorEspecialidad(@RequestBody String pv_filtro) {
        List<Medico> medicos = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String pv_medico = job.get("pv_medico").toString();
            String pv_especialidad = job.get("pv_especialidad").toString();
            // Llama al servicio para listar médicos por especialidad usando pv_medico y
            // pv_especialidad
            medicos = medicoService.listarMedicosporEspecialidad(pv_medico, pv_especialidad);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
        }
        return medicos;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/horarios_por_medico_y_fecha")
    @ResponseBody
    public List<TurnoAtencion> listarHorariosDisponibles(@RequestBody String pv_datos) {
        List<TurnoAtencion> horarios = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha = job.get("pd_fecha").toString();
            System.out.println(pv_datos);
            horarios = medicoService.listarHorariosDisponibles(pn_id_medico, pd_fecha);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return horarios;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/horarios_por_medico_e_intervaloFechas")
    @ResponseBody
    public List<TurnoAtencion> listarHorariosDisponiblesIntervalo(@RequestBody String pv_datos) {
        List<TurnoAtencion> horarios = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            String pd_fecha_fin = job.get("pd_fecha_fin").toString();
            System.out.println(pv_datos);
            horarios = medicoService.listarHorariosDisponiblesIntervalo(pn_id_medico, pd_fecha_inicio, pd_fecha_fin);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return horarios;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/dias_disponibles_por_medico")
    @ResponseBody
    public List<LocalDate> listarDiasDisponibles(@RequestBody String pv_datos) {
        List<LocalDate> dias = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            System.out.println(pv_datos);
            dias = medicoService.listarDiasDisponibles(pn_id_medico);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return dias;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarMedico")

    @ResponseBody
    public List<Medico> buscarMedicoFiltro(@RequestBody String pv_filtro) {
        List<Medico> medicos = null;
        try {
            System.out.println(pv_filtro);
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            medicos = medicoService.buscarMedicoFiltro(cadena);

        } catch (Exception ex) {

        }
        return medicos;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/registrarMedico")
    @ResponseBody
    public int registrarMedicos(@RequestBody String pv_filtro) {
        int idMedico=0;
        Medico medico=new Medico();
        Especialidad especialidad=new Especialidad();
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_id_especialidad = Integer.parseInt(job.get("pn_id_especialidad").toString());
            String pv_nombres = job.get("pv_nombres").toString();
            String pv_apellido_paterno = job.get("pv_apellido_paterno").toString();
            String pv_apellido_materno = job.get("pv_apellido_materno").toString();
            String pv_dni = job.get("pv_dni").toString();
            SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");
            String fechaComoTexto  = job.get("pd_fecha_nacimiento").toString();
            LocalDate pd_fecha_nacimiento = LocalDate.parse(fechaComoTexto);
            String pv_sexo = job.get("pv_sexo").toString();
            String pv_telefono = job.get("pv_telefono").toString();
            byte [] pb_foto = (byte[]) job.get("pb_foto");
            String pv_area = job.get("pv_area").toString();
            String pv_cmp = job.get("pv_cmp").toString();
            String pv_correo = job.get("pv_correo").toString();
            especialidad.setIdEspecialidad(pn_id_especialidad);
            medico.setEspecialidad(especialidad);
            medico.setNombres(pv_nombres);
            medico.setApellidoPaterno(pv_apellido_paterno);
            medico.setApellidoMaterno(pv_apellido_materno);
            medico.setDni(pv_dni);
            medico.setFechaNacimiento(pd_fecha_nacimiento);
            medico.setSexo(pv_sexo);
            medico.setTelefono(pv_telefono);
            medico.setFoto(pb_foto);
            medico.setArea(pv_area);
            medico.setCmp(pv_cmp);
            medico.setcorreoElectronico(pv_correo);
            idMedico = medicoService.registrarMedico(medico);
        } catch (Exception ex) {

        }
        return idMedico;
    }

    @PutMapping(value = "/put/actualizarMedicoShort")
    @ResponseBody
    public int actualizarMedicoShort(@RequestBody String pv_filtro) {
        int idMedico=0;
        Medico medico=new Medico();
        Especialidad especialidad=new Especialidad();
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_id_medico = Integer.parseInt(job.get("pn_id_medico").toString());
            String pv_telefono = job.get("pv_telefono").toString();
            byte [] pb_foto = (byte[]) job.get("pb_foto");
            String pv_correo = job.get("pv_correo").toString();
            medico.setIdPersona(pn_id_medico);
            medico.setTelefono(pv_telefono);
            medico.setFoto(pb_foto);
            medico.setcorreoElectronico(pv_correo);
            idMedico = medicoService.actualizarMedicoShort(medico);
        } catch (Exception ex) {

        }
        return idMedico;
    }

    /* Cambios en el actualizar y en el eliminar Medico */
    @PutMapping(value = "/put/actualizarMedico")
    @ResponseBody
    public int actualizarMedico(@RequestBody Medico medico) {
        int n;
        n = medicoService.actualizarMedico(medico);
        return n;
    }

    @DeleteMapping(value = "/delete/eliminarMedico")
    @ResponseBody
    public int eliminarMedico(@RequestBody Medico medico) {
        int n;
        n = medicoService.eliminarMedico(medico);
        return n;
    }

}
