package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.services.atencion.HojaMedicaService;
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
}
