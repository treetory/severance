package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Enumeration;

/**
 * 로그 찍을 때, 보기 편하게 하려고 pattern 화 시킨 것 뿐...
 *
 * @author treetory@gmail.com
 */
public class LOGPrint {

    private static final Logger LOG = LoggerFactory.getLogger(LOGPrint.class);

    public static <T> void printHttpServletRequest(HttpServletRequest request) {
        StringBuffer reqSb = new StringBuffer();
        Enumeration enu = request.getHeaderNames();
        while(enu.hasMoreElements()) {
            String headerName = (String)enu.nextElement();
            reqSb.append("    [");
            reqSb.append(headerName);
            reqSb.append("]");
            reqSb.append(" : ");
            reqSb.append(request.getHeader(headerName));
            reqSb.append(System.lineSeparator());
        }

        LOG.debug("{}{}{}{}{}{}",
                System.lineSeparator(), System.lineSeparator(),
                String.format("    [URI] : %s", request.getRequestURI()), System.lineSeparator(),
                reqSb.toString(), System.lineSeparator()
        );
    }

    public static <T> void printHttpServletResponse(HttpServletResponse response) {
        StringBuffer resSb = new StringBuffer();
        ArrayList<String> headerNames = (ArrayList) response.getHeaderNames();
        headerNames.stream().forEach(o -> {

            resSb.append("    [");
            resSb.append(o);
            resSb.append("]");
            resSb.append(" : ");
            resSb.append(response.getHeader(o));
            resSb.append(System.lineSeparator());

        });

        LOG.debug("{}{}{}{}{}{}",
                System.lineSeparator(), System.lineSeparator(),
                String.format("    [STATUS] : %d", response.getStatus()), System.lineSeparator(),
                resSb.toString(), System.lineSeparator()
        );
    }

    public static <T> void printValue(T t, Class<?> clazz) {
        LOG.debug("{}{}    [{}]{}    [{}]{}", 
            System.lineSeparator(), System.lineSeparator(), 
            clazz.getName(), System.lineSeparator(), 
            t, System.lineSeparator()
            );
    }

    public static void printException(Exception e, Class<?> clazz) {
        LOG.error("{}{}    [{}]{}    [{}]{}    [{}]{}", 
            System.lineSeparator(), System.lineSeparator(), 
            clazz.getName(), System.lineSeparator(), 
            String.format("%s.%s(%d)", e.getStackTrace()[1].getClassName(), e.getStackTrace()[1].getMethodName(), e.getStackTrace()[1].getLineNumber()), System.lineSeparator(),
            e.getMessage(), System.lineSeparator()
            );
    }

}