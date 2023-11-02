package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.repository.rrhh.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class HistorialClinicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final HistorialMapper historialMapper = new HistorialMapper();
    private final HojaMedicaMapper hojaMedicaMapper = new HojaMedicaMapper();

    public int registrarHistorialClinico(Paciente paciente){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_historial_clinico")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_historial_clinico ", Types.INTEGER),
                        new SqlParameter("pn_id_paciente ", Types.INTEGER),
                        new SqlParameter("pv_codigo", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_paciente", paciente.getIdPersona())
                .addValue("pv_codigo", paciente.getHistorialClinico().getCodigo())
                .addValue("pn_estado", 1);
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHistorialClinico = (int)result.get("pn_id_historial_clinico");
            return idHistorialClinico;
        }
    }

    public HistorialClinico buscarHistorialClinico(String pn_id_paciente) {

        HistorialClinico historialClinico=null;
        String procedureCall ="{call dbSanama.ssm_ate_buscar_historial_clinico_x_paciente("+pn_id_paciente+")}";
        List<HistorialClinico> historiales=jdbcTemplate.query(procedureCall, historialMapper);
        if(!historiales.isEmpty()){
            historialClinico = historiales.get(0);
            procedureCall="{call dbSanama.ssm_ate_listar_hoja_medica_x_hitorial_clinico("+historialClinico.getIdHistorialClinico()+")}";
            historialClinico.setHojasMedicas((ArrayList<HojaMedica>)jdbcTemplate.query(procedureCall, hojaMedicaMapper));
            return historialClinico;
        }
        return null;
    }

    private static class HistorialMapper implements RowMapper<HistorialClinico> {
        @Override
        public HistorialClinico mapRow(ResultSet rs, int rowNum) throws SQLException {

            HistorialClinico historialClinico = new HistorialClinico();

            historialClinico.setIdHistorialClinico(rs.getInt("id_historial_clinico"));
            historialClinico.setCodigo(rs.getString("codigo_hc"));
            return historialClinico;
        }
    }

    private static class HojaMedicaMapper implements RowMapper<HojaMedica> {
        @Override
        public HojaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            HojaMedica hojaMedica = new HojaMedica();

            hojaMedica.setIdHojaMedica(rs.getInt("id_hoja_medica"));
            hojaMedica.setCodigo(rs.getString("codigo_hm"));
            return hojaMedica;
        }
    }

}
