package com.treetory.severance;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.stream.Stream;

@Aspect
@Component
public class AuthAspect {

    private static final Logger LOG = LoggerFactory.getLogger(AuthAspect.class);

    @Around("execution(* com.treetory.severance.LoginController.*(..))")
    public Object verifyToken(ProceedingJoinPoint pjp)  throws Throwable {

        Object[] args = pjp.getArgs();

        Object result = pjp.proceed();

        LOG.debug("{}", (String)result);

        return result;
    }

}
