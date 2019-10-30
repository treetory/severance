package com.treetory.severance;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(value="/sample")
public class SampleDataController {

    @Autowired
    private Gson gson;

    @RequestMapping(value="{path}",
            method= RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE },
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE }
    )
    public Map getData(@PathVariable String path) {

        Map result = null;

        try {

            File f = new File(String.format("./form-json/%s.json", path));

            if (f != null) {
                result = (Map)(gson.fromJson(new FileReader(f), Map.class));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }

}
