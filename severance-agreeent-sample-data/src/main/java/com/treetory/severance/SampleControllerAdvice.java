package com.treetory.severance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.annotation.PostConstruct;

@RestControllerAdvice(assignableTypes = { SampleDataController.class })
public class SampleControllerAdvice implements ResponseBodyAdvice {

    private static final Logger LOG = LoggerFactory.getLogger(SampleControllerAdvice.class);

    @Autowired
    private WebApplicationContext appContext;

    private TokenUtil tokenUtil;

    @PostConstruct
    private void init() {
        tokenUtil = (TokenUtil) appContext.getBean("tokenUtil");
    }

    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest request, ServerHttpResponse response) {

        if(response instanceof ServletServerHttpResponse) {

            ServletServerHttpResponse res= (ServletServerHttpResponse)(response);
            int status = res.getServletResponse().getStatus(); //get the status code

            if (status == 200) {
                if (res.getHeaders().containsKey("Authorization")) {
                    res.getHeaders().set("Authorization", String.format("%s", tokenUtil.renewToken(request.getHeaders().get("authorization").get(0))));
                } else {
                    res.getHeaders().add("Authorization", String.format("%s", tokenUtil.renewToken(request.getHeaders().get("authorization").get(0))));
                }
            }

            LOG.debug("{}", request.getHeaders().get("authorization").get(0));

        }

        return body;
    }

}
