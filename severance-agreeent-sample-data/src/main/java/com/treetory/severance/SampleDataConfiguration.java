package com.treetory.severance;

import com.google.gson.Gson;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@Configuration
public class SampleDataConfiguration {
    @Bean(name = "gson")
    public Gson gson() {
        return new Gson();
    }
}
