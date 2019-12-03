package com.treetory.severance;


import com.google.gson.Gson;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Map;
import java.util.concurrent.Future;

@Service
public class SendService {

    private String DEMO_URL = "";

    private final Gson gson;
    private final FileStorageProperties fileStorageProperties;

    @Autowired
    public SendService(Gson gson, FileStorageProperties fileStorageProperties) {
        this.gson = gson;
        this.fileStorageProperties = fileStorageProperties;
        this.DEMO_URL = fileStorageProperties.getDemoUrl();
    }

    public String sendJSONFileBySync(Map<String, Object> consentFormData) {

        try {

            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(DEMO_URL);
            post.addHeader("Content-Type", String.format("%s; charset=UTF-8", MediaType.APPLICATION_JSON_VALUE));
            post.setEntity(new StringEntity(gson.toJson(consentFormData), Charset.forName("UTF-8")));

            HttpResponse response = httpClient.execute(post);

            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
                return body;
            }

        } catch (Exception e) {
            LOGPrint.printException(e, Exception.class);
        }

        return "Can't send the consentFormData to DEMO_URL SERVER.";
    }

    public String sendJSONFileByASync(Map<String, Object> consentFormData) {

        String result = "";

        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();

        try {
            // Start the client
            httpclient.start();

            // Execute request
            final HttpPost post = new HttpPost(DEMO_URL);
            post.addHeader("Content-Type", String.format("%s; charset=UTF-8", MediaType.APPLICATION_JSON_VALUE));
            post.setEntity(new StringEntity(gson.toJson(consentFormData), Charset.forName("UTF-8")));
            Future<HttpResponse> future = httpclient.execute(post, null, null);
            HttpResponse response = future.get();

            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
                return body;
            }

        } catch (Exception e) {
            LOGPrint.printException(e, Exception.class);
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                LOGPrint.printValue(e, IOException.class);
            }
        }

        return "Can't send the consentFormData to DEMO_URL SERVER.";
    }
}
