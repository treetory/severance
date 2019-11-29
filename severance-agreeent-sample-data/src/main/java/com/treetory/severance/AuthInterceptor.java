package com.treetory.severance;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.vavr.control.Option;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * To verify the JWT authorization token
 * if you want to some patterns don't check the authorization header,
 * please add the patterns name to "addInterceptors method' exclusive pattern" in Configuration class.
 *
 * @author treetory@gmail.com
 */
@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {

    private static final Logger LOG = LoggerFactory.getLogger(AuthInterceptor.class);

    @Autowired
    private WebApplicationContext appContext;

    private TokenUtil tokenUtil = new TokenUtil();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        LOGPrint.printHttpServletRequest(request);

        Option<String> _opt = Option.of(request.getHeader("Authorization"));

        if (_opt.isEmpty()) {
            return false;
        } else {

            LOG.debug("{}", _opt.get());

            return tokenUtil.verifyToken(_opt.get());
        }

    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        /*
        Option<String> _opt = Option.of(request.getHeader("Authorization"));

        //LOGPrint.printValue(_opt.get(), String.class);

        Option<String> _renewedToken = Option.of(tokenUtil.renewToken(_opt.get()));

        if (!_opt.isEmpty()) {
            response.addHeader("Authorization", String.format("Bearer %s", _renewedToken.get()));
        }
        */
        LOGPrint.printHttpServletResponse(response);

    }

}
