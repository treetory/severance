package com.treetory.severance;

import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private UserCredentialProperties userCredentialProperties;

    @Autowired
    private TokenUtil tokenUtil;

    public Either<String, Map<String, String>> generateToken(Map<String, String> user) {

        Either<String, Map<String, String>> result;

        {

            if (userCredentialProperties.getUserId().equals(user.get("userId")) &&
            userCredentialProperties.getPassword().equals(user.get("password"))) {

                Map<String, String> _t = new HashMap<>();
                _t.put("token", String.format("Bearer %s", tokenUtil.issueToken(user.get("userId"))));
                _t.put("page", "/poc");
                result = Either.right(_t);

            } else {
                result = Either.left("Wrong user id or password.");
            }

        }

        return result;
    }

}
