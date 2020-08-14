package com.treetory.severance;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author treetory@gmail.com
 */
@ConfigurationProperties(prefix = "user")
public class UserCredentialProperties {

    private String userId;
    private String password;

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
