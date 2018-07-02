package com.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DemoController {
	@GetMapping("/demo")
	public ModelAndView demo() {
		return new ModelAndView();
	}
}
