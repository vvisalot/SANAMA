package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.atencionmedica.HojaMedica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Map;

@Repository
public class HojaMedicaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
/*
    public int registrarHojaMedica(HojaMedica hojaMedica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlParameter("pn_id_historial_clinico", Types.INTEGER),
                        new SqlParameter("pn_id_especialidad_derivada", Types.INTEGER),
                        new SqlParameter("pn_id_medico_atendiente", Types.INTEGER),
                        new SqlParameter("pb_sello_firma", Types.BLOB),
                        new SqlParameter("pd_fecha_proxima_cita", Types.DATE)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_historial_clinico", hojaMedica.getIdHistorialClinico())
                .addValue("pn_id_especialidad_derivada", hojaMedica.getEspecialidadDerivada().getIdEspecialidad())
                .addValue("pn_id_medico_atendiente", hojaMedica.getMedicoAtendiente().getIdPersona())
                .addValue("pb_sello_firma", hojaMedica.getSelloFirma())
                .addValue("pd_fecha_proxima_cita", hojaMedica.getFechaProximaCita());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHojaMedica = (int)result.get("pn_id_hoja_medica");
            return idHojaMedica;
        }
    }
*/
}
