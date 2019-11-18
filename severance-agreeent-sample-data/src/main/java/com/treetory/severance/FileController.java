package com.treetory.severance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.gson.Gson;
import io.vavr.control.Either;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author treetory@gmail.com
 */
@RestController
public class FileController {

    private static final Logger LOG = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageProperties fileStorageProperties;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private Gson gson;

    @PostMapping("/uploadFile")
    public String uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        
        Either<String, List<UploadFileResponse>> result = null;
        String fileName =  "";
        try {

            fileName = fileStorageService.storeFile(file);
            File f = new File(fileStorageProperties.getUploadDir());
            List<UploadFileResponse> list = new ArrayList<>();
            if (f.isDirectory()) {
                Arrays.asList(f.listFiles()).stream().forEach(_f -> {
                    if (_f.isFile()) {
                        UploadFileResponse ufr = new UploadFileResponse(
                                _f.getName(),
                                ServletUriComponentsBuilder.fromCurrentContextPath()
                                        .path("/downloadFile/")
                                        .path(_f.getName())
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
        //return fileName;
    }

}