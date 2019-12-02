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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author treetory@gmail.com
 */
@RestController
@RequestMapping(value="/sample")
public class SampleDataController {

    private static final Logger LOG = LoggerFactory.getLogger(SampleDataController.class);

    private final Gson gson;

    private final FileStorageProperties fileStorageProperties;

    public SampleDataController(Gson gson, FileStorageProperties fileStorageProperties) {
        this.gson = gson;
        this.fileStorageProperties = fileStorageProperties;
    }

    @RequestMapping(value="/list",
            method= RequestMethod.GET,
            //consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String getList(HttpServletRequest request, HttpServletResponse response) {

        Either<String, ArrayList> result = null;

        try {

            File consentFormFile = new File("./form-json/ConsentFormList.json");
            ArrayList<Map<String, String>> list = new ArrayList<>();
            if (consentFormFile.exists()) {
                list = gson.fromJson(
                        new BufferedReader(
                                new InputStreamReader(new FileInputStream("./form-json/ConsentFormList.json"), "UTF-8")),
                        ArrayList.class);
            }

            File uploadDir = new File(fileStorageProperties.getUploadDir());

            ArrayList<Map<String, String>> mergedList = (ArrayList<Map<String, String>>) list.stream().map(form -> {
                //LOG.debug(">>> {}", form);
                if (Arrays.asList(uploadDir.list()).stream().filter(s -> s.contains(form.get("FrmCd"))).findAny().isPresent()) {
                    //LOG.debug("--- {}", _opt);
                    form.put("color", "#0000FF");
                }
                return form;
            }).collect(Collectors.toList());

            result = Either.right(mergedList);

        } catch (Exception e) {
            LOGPrint.printException(e, this.getClass());
            result = Either.left(String.format("Exception is occurred when read json file or parse json file."));
        }

        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }
    
    @RequestMapping(value="/data/{path}",
            method= RequestMethod.GET,
            //consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String getData(HttpServletRequest request, HttpServletResponse response, @PathVariable String path) {

        //Either<String, ArrayList> result = null;
        Either<String, Map> result = null;

        try {
            /*
                인코딩 깨짐 (윈도우 환경) -> System 인코딩 읽어와서 깨짐
                result = (Map)(gson.fromJson(new FileReader(f), Map.class));
                reader 변경 -> 인코딩 지정할 수 있는 inputStreamReader 로 변경함
            */
            Map _temp = (Map<String, String>) gson.fromJson(new BufferedReader(
                new InputStreamReader(new FileInputStream(String.format("./uploads/%s", path)), "UTF-8")),
                Map.class);
            //result = Either.right((ArrayList)((Map)((Map)((ArrayList)_temp.get("Regions")).get(0)).get("VisualTree")).get("Items"));
            result = Either.right(_temp);
        } catch (Exception e) {
            LOGPrint.printException(e, this.getClass());
            result = Either.left(String.format("Exception is occurred when read json file or parse json file."));
        }

        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }

}