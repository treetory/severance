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

import io.vavr.control.Option;

import javax.annotation.PostConstruct;

@RestControllerAdvice(assignableTypes = { SampleDataController.class, FileController.class })
public class SampleControllerAdvice implements ResponseBodyAdvice {

    private static final Logger LOG = LoggerFactory.getLogger(SampleControllerAdvice.class);

    private final WebApplicationContext appContext;
    private TokenUtil tokenUtil;

    @Autowired
    public SampleControllerAdvice(WebApplicationContext appContext) {
        this.appContext = appContext;
    }

    @PostConstruct
    private void init() {
        tokenUtil = (TokenUtil) appContext.getBean("tokenUtil");
    }

    @Override
    public boolean supports(MethodParameter methodParameter, final Class aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, final Class aClass, ServerHttpRequest request, ServerHttpResponse response) {

        if(response instanceof ServletServerHttpResponse) {

            ServletServerHttpResponse res= (ServletServerHttpResponse)(response);
            int status = res.getServletResponse().getStatus(); //get the status code

            if (status == 200) {
                Option<String> _opt = Option.of(tokenUtil.renewToken(request.getHeaders().get("authorization").get(0)));
                LOGPrint.printValue(_opt.get(), String.class);

                if (!_opt.isEmpty()) {
                    res.getHeaders().set("Authorization", String.format("%s", _opt.get()));
                }
            }

            //LOG.debug("{}", request.getHeaders().get("authorization").get(0));

        }

        return body;
    }

}
