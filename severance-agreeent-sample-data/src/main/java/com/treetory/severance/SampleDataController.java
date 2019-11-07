package com.treetory.severance;

import com.google.gson.Gson;
import io.vavr.control.Either;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(value="/sample")
public class SampleDataController {

    private static final Logger LOG = LoggerFactory.getLogger(SampleDataController.class);

    @Autowired
    private Gson gson;

    @RequestMapping(value="/list",
            method= RequestMethod.GET,
            //consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String getList() {

        Either<String, ArrayList> result = null;

        try {

            File f = new File("./form-json/ConsentFormList.json");

            ArrayList<Map<String, String>> list = gson.fromJson(
                    new BufferedReader(
                            new InputStreamReader(new FileInputStream("./form-json/ConsentFormList.json"), "UTF-8")),
                    ArrayList.class);
            result = Either.right(list);

        } catch (Exception e) {
            LOG.error("{}{}    [{}]{}    [{}]{}", 
            System.lineSeparator(), System.lineSeparator(), 
            String.format("%s.%s(%d)", e.getStackTrace()[1].getClassName(), e.getStackTrace()[1].getMethodName(), e.getStackTrace()[1].getLineNumber()), System.lineSeparator(),
            e.getMessage(), System.lineSeparator());
            result = Either.left(String.format("Exception is occurred when read json file or parse json file."));
        }

        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }
    
    @RequestMapping(value="/data/{path}",
            method= RequestMethod.GET,
            //consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String getData(@PathVariable String path) {

        Either<String, ArrayList> result = null;

        try {
            /*
                인코딩 깨짐 (윈도우 환경) -> System 인코딩 읽어와서 깨짐
                result = (Map)(gson.fromJson(new FileReader(f), Map.class));
                reader 변경 -> 인코딩 지정할 수 있는 inputStreamReader 로 변경함
            */
            Map _temp = (Map<String, String>) gson.fromJson(new BufferedReader(
                new InputStreamReader(new FileInputStream(String.format("./form-json/%s.json", path)), "UTF-8")),
                Map.class);
            result = Either.right((ArrayList)((Map)((Map)((ArrayList)_temp.get("Regions")).get(0)).get("VisualTree")).get("Items"));

        } catch (Exception e) {
            LOG.error("{}{}    [{}]{}    [{}]{}", 
            System.lineSeparator(), System.lineSeparator(), 
            String.format("%s.%s(%d)", e.getStackTrace()[1].getClassName(), e.getStackTrace()[1].getMethodName(), e.getStackTrace()[1].getLineNumber()), System.lineSeparator(),
            e.getMessage(), System.lineSeparator());
            result = Either.left(String.format("Exception is occurred when read json file or parse json file."));
        }

        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }

}