package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.services.atencion.HojaMedicaService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/atencion")
@CrossOrigin
public class HojaMedicaController {
    @Autowired
    HojaMedicaService hojaMedicaService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/registrarHojaMedica")
    @ResponseBody
    public int registrarHojaMedica(@RequestBody HistorialClinico historialClinico){
        HojaMedica hojaMedica=null;
        int n;
        hojaMedica = historialClinico.getHojasMedicas().get(0);
        n = hojaMedicaService.registrarHojaMedica(hojaMedica,historialClinico.getIdHistorialClinico());
        return n;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/eliminarHojaMedica")
    @ResponseBody
    public int eliminarHojaMedica(@RequestBody String pv_datos){
        int n=0;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_hoja_medica = job.get("pn_id_hoja_medica").toString();
            n = hojaMedicaService.eliminarHojaMedica(pn_id_hoja_medica);
        }catch(Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return n;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarTriajeCitaHojaMedica")
    @ResponseBody
    public Triaje buscarTriajeCitaHojaMedica(@RequestBody String pv_datos) {
        Triaje triaje=null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita = Integer.parseInt(job.get("pn_id_cita").toString());
            triaje = hojaMedicaService.buscarTriajeCitaMedica(pn_id_cita);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return triaje;
    }
}
