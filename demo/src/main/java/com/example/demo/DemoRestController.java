package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
public class DemoRestController {

    private static final Logger LOG = LoggerFactory.getLogger(DemoRestController.class);

    private final FileStorageService fileStorageService;

    @Autowired
    public DemoRestController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @RequestMapping(value="/receiveJSON",
            method= RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String uploadConsentFormJSON(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> consentFormData) {

        LOG.debug("{}{}{}{}", System.lineSeparator(), System.lineSeparator(), consentFormData, System.lineSeparator());

        return fileStorageService.writeJSONFile(consentFormData);
    }

}
