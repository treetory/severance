package com.treetory.severance;

import com.google.gson.Gson;
import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * LoginController using JWT
 *
 * @author treetory@gmail.com
 */
@RestController
public class LoginController {

    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

    private final LoginService loginService;

    private final Gson gson;

    public LoginController(LoginService loginService, Gson gson) {
        this.loginService = loginService;
        this.gson = gson;
    }

    /**
     *
     * @param user (userId, password)
     * @return String (JWT token and the view page name to redirect)
     */
    @RequestMapping(value="/login",
            method= RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public @ResponseBody String doLogin(@RequestBody Map<String, String> user) {

        Either _e = loginService.generateToken(user);

        return _e.isLeft() ? gson.toJson(_e.getLeft()) : gson.toJson(_e.get());
    }

}
