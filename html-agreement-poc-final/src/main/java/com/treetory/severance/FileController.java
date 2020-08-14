package com.treetory.severance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.gson.Gson;
import io.vavr.control.Either;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @author treetory@gmail.com
 */
@RestController
public class FileController {

    private static final Logger LOG = LoggerFactory.getLogger(FileController.class);

    private final FileStorageProperties fileStorageProperties;
    private final FileStorageService fileStorageService;
    private final SendService sendService;
    private final Gson gson;

    @Autowired
    public FileController(FileStorageProperties fileStorageProperties, FileStorageService fileStorageService, SendService sendService, Gson gson) {
        this.fileStorageProperties = fileStorageProperties;
        this.fileStorageService = fileStorageService;
        this.sendService = sendService;
        this.gson = gson;
    }

    //@PostMapping("/uploadFile")
    @RequestMapping(value="/uploadFile",
            method= RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String uploadFile(HttpServletRequest request, HttpServletResponse response, @RequestParam("file") MultipartFile file) {
        
        Either<String, List<UploadFileResponse>> result = null;
        try {

            final String fileName = fileStorageService.storeFile(file);
            File f = new File(fileStorageProperties.getUploadDir());
            List<UploadFileResponse> list = new ArrayList<>();
            if (f.isDirectory()) {
                Arrays.asList(f.listFiles()).stream().forEach(_f -> {
                    if (_f.isFile() && _f.getName().equals(fileName)) {
                        UploadFileResponse ufr = new UploadFileResponse(
                                fileName,
                                ServletUriComponentsBuilder.fromCurrentContextPath()
                                        .path("/downloadFile/")
                                        .path(fileName)
                                        .toUriString(),
                                "",
                                _f.length()
                        );
                        list.add(ufr);
                    }
                });
            }
            result = Either.right(list);

        } catch (FileStorageException e) {
            LOGPrint.printException(e, this.getClass());
            result = Either.left(String.format("Exception is occurred when store file in server."));
        }

        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }

    @RequestMapping(value="/updateJSON",
            method= RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public String uploadConsentFormJSON(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> consentFormData) {
        Either<String, String> result = Either.left("");

        //result = Either.right(fileStorageService.writeJSONFile(consentFormData));
        //result = Either.right(sendService.sendJSONFileBySync(consentFormData));
        result = Either.right(sendService.sendJSONFileByASync(consentFormData));
        return result.isLeft() ? gson.toJson(result.getLeft()) : gson.toJson(result.get());
    }

}