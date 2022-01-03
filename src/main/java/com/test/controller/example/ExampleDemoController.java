package com.test.controller.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ExampleDemoController {
    @GetMapping("/example/demo")
    public ModelAndView demo() {
        return new ModelAndView();
    }
}
