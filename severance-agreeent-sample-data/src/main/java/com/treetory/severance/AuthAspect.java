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

/**
 * filter 적 관점에서 token verifying 후, 진행 여부의 컨트롤이 가능한지 보려했음
 * -> 딱히 진행 여부의 컨트롤이 되지 않는 것으로 보여 일단 aop 만 남겨놓고 처리 구현은 하지 않음
 *
 * @author treetory@gmail.com
 */
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
