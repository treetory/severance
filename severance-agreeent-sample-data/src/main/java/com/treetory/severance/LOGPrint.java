package com.treetory.severance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * 로그 찍을 때, 보기 편하게 하려고 pattern 화 시킨 것 뿐...
 *
 * @author treetory@gmail.com
 */
public class LOGPrint {

    private static final Logger LOG = LoggerFactory.getLogger(LOGPrint.class);

    public static <T> void printHttpServletRequest(HttpServletRequest request) {
        StringBuffer hsb = new StringBuffer();
        Enumeration enu = request.getHeaderNames();
        while(enu.hasMoreElements()) {
            String headerName = (String)enu.nextElement();
            hsb.append("    [");
            hsb.append(headerName);
            hsb.append("]");
            hsb.append(" : ");
            hsb.append(request.getHeader(headerName));
            hsb.append(System.lineSeparator());
        }

        LOG.debug("{}{}{}{}{}{}",
                System.lineSeparator(), System.lineSeparator(),
                String.format("    [URI] : %s", request.getRequestURI()), System.lineSeparator(),
                hsb.toString(), System.lineSeparator()
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