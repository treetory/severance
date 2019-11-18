package com.treetory.severance;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author treetory@gmail.com
 */
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

    private String uploadDir;

    public String getUploadDir() {
        return this.uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

}
