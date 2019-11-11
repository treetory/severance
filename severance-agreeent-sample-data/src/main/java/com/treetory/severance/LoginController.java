package com.treetory.severance;

import com.google.gson.Gson;
import io.vavr.control.Either;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController {

    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private Gson gson;

    @RequestMapping(value="/login",
            method= RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE }
    )
    public @ResponseBody String doLogin(@RequestBody Map<String, String> user) {

        Either _e = loginService.generateToken(user);

        return _e.isLeft() ? gson.toJson(_e.getLeft()) : gson.toJson(_e.get());
    }

}
