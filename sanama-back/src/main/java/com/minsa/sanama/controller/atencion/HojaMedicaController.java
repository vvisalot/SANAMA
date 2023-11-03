package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.services.atencion.HistorialClinicoService;
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
    public int registrarHojaMedica(@RequestBody HojaMedica hojaMedica){
        int n;
        n = hojaMedicaService.registrarHojaMedica(hojaMedica);
        return n;
    }



}
