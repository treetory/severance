package com.treetory.severance;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenUtil {

    private static final Logger LOG = LoggerFactory.getLogger(TokenUtil.class);

    @Autowired
    private JWT JWT;

    JWTVerifier _v = JWT
            .require(Algorithm.HMAC256("treetory"))
            .withIssuer("treetory")
            .acceptExpiresAt(60*60*1)
            .build();

    public String issueToken(String userId) {
        return
        JWT.create()
                .withClaim("userId", userId)
                .withJWTId(userId)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(Math.addExact(System.currentTimeMillis(), 1000 * 60 * 60)))
                .withIssuer("treetory")
                .sign(Algorithm.HMAC256("treetory"));
    }

    public boolean verifyToken(String token) {

        try {

            String[] auth = token.split(" ");

            if (auth.length == 2) {

                DecodedJWT _decoded = _v.verify(auth[1]);
                //LOG.debug("{}[{}] : [{}]", System.lineSeparator(), _decoded.getKeyId(), _decoded.getExpiresAt());

                return true;
            }

        } catch (JWTVerificationException e) {
            //e.printStackTrace();
            LOG.error("{}", e.getMessage());
            LOG.debug("{}{}", System.lineSeparator(), "------------------------------");
            return false;
        }

        return false;
    }

    public String renewToken(String token) {

        Either<String, String> result = Either.left(token);

        String[] auth = token.split(" ");
        //LOG.debug("{}{}{}", System.lineSeparator(), System.lineSeparator(), auth[1]);

        DecodedJWT _decoded = _v.verify(auth[1]);
        LOG.debug("{}{}{}", System.lineSeparator(), System.lineSeparator(), _decoded.getExpiresAt().getTime() - System.currentTimeMillis());
        if (_decoded.getExpiresAt().getTime() - System.currentTimeMillis() < 10 * 1000) {
            result = Either.right(String.format("Bearer %s", this.issueToken(_decoded.getClaim("userId").asString())));
        }
        return result.isRight() ? result.get() : result.getLeft();
    }

}
