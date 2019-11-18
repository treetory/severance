package com.treetory.severance;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * issue the JWT authorization token
 *
 * @author treetory@gmail.com
 */
@Service
public class LoginService {

    private static final Logger LOG = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private JWT JWT;

    @Autowired
    private UserCredentialProperties userCredentialProperties;

    public Either<String, Map<String, String>> generateToken(Map<String, String> user) {

        Either<String, Map<String, String>> result;

        {

            if (userCredentialProperties.getUserId().equals(user.get("userId")) &&
            userCredentialProperties.getPassword().equals(user.get("password"))) {

                Map<String, String> _t = new HashMap<>();
                _t.put("token", JWT.create()
                        .withJWTId(user.get("userId"))
                        //.withExpiresAt(new Date(Math.addExact(System.currentTimeMillis(), 1000 * 60/* * 10*/)))
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withExpiresAt(new Date(Math.addExact(System.currentTimeMillis(), 1000 * 60/* * 10*/)))
                        .withIssuer("treetory")
                        .sign(Algorithm.HMAC256("treetory")));
                _t.put("page", "/poc");
                result = Either.right(_t);

            } else {
                result = Either.left("Wrong user id or password.");
            }

        }

        return result;
    }

}
