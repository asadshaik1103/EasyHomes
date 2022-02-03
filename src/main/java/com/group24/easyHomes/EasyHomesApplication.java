package com.group24.easyHomes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class EasyHomesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasyHomesApplication.class, args);
	}

}
