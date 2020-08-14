package com.treetory.severance;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author treetory@gmail.com
 */
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

    private String uploadDir;
    private String writeDir;
    private String demoUrl;

    public String getUploadDir() {
        return this.uploadDir;
    }
    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public String getWriteDir() { return writeDir; }
    public void setWriteDir(String writeDir) { this.writeDir = writeDir; }

    public String getDemoUrl() { return demoUrl; }
    public void setDemoUrl(String demoUrl) { this.demoUrl = demoUrl; }

}
