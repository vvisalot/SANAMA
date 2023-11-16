package com.minsa.sanama;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
@SpringBootApplication
public class SanamaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SanamaApplication.class, args);
		System.out.println("Hello Enrique");

		// Crear un JSONArray con dos objetos JSONObject
		JSONArray jsonArray = new JSONArray();

		// Primer objeto
		JSONObject jsonObject1 = new JSONObject();
		jsonObject1.put("nombre", "Paracetamol");
		jsonObject1.put("indicacion", "Tomar después de las comidas");
		jsonArray.add(jsonObject1);

		// Segundo objeto
		JSONObject jsonObject2 = new JSONObject();
		jsonObject2.put("nombre", "Ibuprofeno");
		jsonObject2.put("indicacion", "Tomar con agua");
		jsonArray.add(jsonObject2);

		// Imprimir el resultado
		System.out.println(jsonArray.toJSONString());
	}
	//Forma1
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*");
		config.addAllowedMethod("*");
		config.addAllowedHeader("*");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	/*//Forma 2
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("*")
						.allowedHeaders("*");
			}
		};
	}*/

}
