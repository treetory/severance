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
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    private JWT JWT;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        LOGPrint.printHttpServletRequest(request);

        try {

            Option<String> _opt = Option.of(request.getHeader("Authorization"));

            if (!_opt.isEmpty()) {

                String[] auth = _opt.get().split(" ");

                if (auth.length == 2) {
                    JWTVerifier _v = JWT
                            .require(Algorithm.HMAC256("treetory"))
                            .withIssuer("treetory")
                            .acceptExpiresAt(60*1)
                            .build();
                    DecodedJWT jwt = _v.verify(auth[1]);
                    //LOG.debug("{}[{}] : [{}]", System.lineSeparator(), _v.verify(JWT.decodeJwt(auth[1])).getKeyId(), _v.verify(JWT.decodeJwt(auth[1])).getExpiresAt());
                    return true;
                }
            }

        } catch (JWTVerificationException e) {
            //e.printStackTrace();
            LOG.error("{}", e.getMessage());
            LOG.debug("{}{}", System.lineSeparator(), "------------------------------");
            return false;
        }

        return false;
    }

}
