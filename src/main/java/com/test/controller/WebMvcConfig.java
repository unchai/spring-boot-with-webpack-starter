package com.test.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.File;
import java.io.IOException;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
	private Logger logger = LoggerFactory.getLogger(WebMvcConfig.class);

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		try {
			registry.addResourceHandler("/static/bundle/**").addResourceLocations("file://" + new File("./target/deploy/static/bundle").getCanonicalPath() + "/");
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
}
