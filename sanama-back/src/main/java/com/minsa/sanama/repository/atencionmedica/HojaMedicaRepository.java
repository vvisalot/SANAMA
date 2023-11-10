package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
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
import java.util.List;
import java.util.Map;

@Repository
public class HojaMedicaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public HojaMedicaRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}
    private final TriajeMap triajeMap = new TriajeMap();

    public int registrarHojaMedica(HojaMedica hojaMedica,int pn_id_historial) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlParameter("pn_id_historial_clinico", Types.INTEGER),
                        new SqlParameter("pn_id_cita_medica", Types.INTEGER),
                        new SqlParameter("pn_id_hoja_referenciadad", Types.INTEGER),
                        new SqlParameter("pv_codigo", Types.VARCHAR),
                        new SqlParameter("pv_fecha_atencion", Types.DATE),
                        new SqlParameter("pt_hora_atencion", Types.TIME),
                        new SqlParameter("pb_firma", Types.BLOB),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();

        if(hojaMedica.getHojaRefencia() != null){
            mapSqlParameterSource
                    .addValue("pn_id_historial_clinico", pn_id_historial)
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciadad", hojaMedica.getHojaRefencia().getIdHojaReferenciada())
                    .addValue("pv_codigo", hojaMedica.getCodigo())
                    .addValue("pv_fecha_atencion", hojaMedica.getFechaAtencion())
                    .addValue("pt_hora_atencion", hojaMedica.getHoraAtencion())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pn_estado", hojaMedica.getEstado());
        }
        else{

            mapSqlParameterSource
                    .addValue("pn_id_historial_clinico", pn_id_historial)
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciadad", hojaMedica.getHojaRefencia())
                    .addValue("pv_codigo", hojaMedica.getCodigo())
                    .addValue("pv_fecha_atencion", hojaMedica.getFechaAtencion())
                    .addValue("pt_hora_atencion", hojaMedica.getHoraAtencion())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pn_estado", hojaMedica.getEstado());
        }
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHojaMedica = (int)result.get("pn_id_hoja_medica");
            return idHojaMedica;
        }
    }

    public int eliminarHojaMedica(String pn_id_hoja_medica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_eliminar_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlParameter("pn_id_hoja_medica", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_hoja_medica", pn_id_hoja_medica);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            return 1;
        }
    }

    public List<Triaje> buscarTriajeCitaMedica(int pn_id_hoja_medica) {
        String procedureCall = "{call dbSanama.ssm_ate_buscar_triaje_x_cita_medica("+pn_id_hoja_medica+")};";
        return jdbcTemplate.query(procedureCall, triajeMap);
    }

    private static class TriajeMap implements RowMapper<Triaje> {
        @Override
        public Triaje mapRow(ResultSet rs, int rowNum) throws SQLException {

            Triaje triaje = new Triaje();
            // Mapea los campos de Triaje
            triaje.setIdTriaje(rs.getInt("id_triaje"));
            triaje.setCodigoTriaje(rs.getString("codigo_triaje"));
            triaje.setPeso(rs.getInt("peso"));
            triaje.setTalla(rs.getInt("talla"));
            triaje.setTemperatura(rs.getInt("temperatura"));
            triaje.setMotivoVisita(rs.getString("motivo_visita"));
            triaje.setPresionArterial(rs.getInt("presion_arterial"));
            triaje.setPrioridad(rs.getString("prioridad"));
            triaje.setEstado(rs.getInt("estado"));
            triaje.setFechaTriaje(rs.getDate("fecha").toLocalDate());
            triaje.setHoraTriaje(rs.getTime("hora").toLocalTime());
            triaje.setSaturacionOxigeno(rs.getString("saturacionOxigeno"));
            triaje.setFrecuenciaCardiaca(rs.getString("frecuenciaCardiaca"));
            triaje.setFrecuenciaRespiratoria(rs.getString("frecuenciaRespiratoria"));
            triaje.setNivelConciencia(rs.getString("nivelConciencia"));
            triaje.setNivelDolor(rs.getString("nivelDolor"));
            triaje.setCondicionesPrexistentes(rs.getString("condicionesPrexistentes"));

            return triaje;
        }
    }
}
