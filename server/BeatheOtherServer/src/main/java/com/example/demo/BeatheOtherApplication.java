package com.example.demo;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.*;

@SpringBootApplication
@EnableWebSocket
public class BeatheOtherApplication implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(
	WebSocketHandlerRegistry registry) {
	registry.addHandler(characterHandler(), "/character").setAllowedOrigins("*");
	registry.addHandler(battleHandler(), "/battle").setAllowedOrigins("*");
	
	}
	
	@Bean
	public WebSocketCharacterHandler characterHandler() {
	return new WebSocketCharacterHandler();
	}
	
	@Bean
	public WebSocketBattleHandler battleHandler() {
	return new WebSocketBattleHandler();
	}

	public static void main(String[] args) {
		SpringApplication.run(BeatheOtherApplication.class, args);
	}

}
