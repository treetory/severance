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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * ViewController using verifying JWT authorization token from "GET parameter"
 *
 * @author treetory@gmail.com
 */
@Controller
public class ViewController {

    private static final Logger LOG = LoggerFactory.getLogger(ViewController.class);

    private final JWT JWT;

    public ViewController(JWT JWT) {
        this.JWT = JWT;
    }

    /**
     *  welcome page (login page)
     *
     * @param request
     * @param response
     * @return mav (the name of view to direct)
     */
    @RequestMapping("/")
    public ModelAndView goToIndex(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("index");
    }

    /**
     * the view page that prove the concept of agreement rendering function
     *
     * @param request
     * @param response
     * @param token (JWT token)
     * @return mav (the name of view to direct)
     */
    @RequestMapping("/poc")
    public ModelAndView goToPoc(HttpServletRequest request, HttpServletResponse response,
                                @RequestParam String token) {

        Either<ModelAndView, ModelAndView> mav = this.checkToken(token, request);

        return /*new ModelAndView("poc");*/ mav.isRight() ? mav.get() : mav.getLeft();
    }

    /**
     * the view page to upload the sample json file into server
     *
     * @param request
     * @param response
     * @param token (JWT token)
     * @return mav (the name of view to direct)
     */
    @RequestMapping("/upload")
    public ModelAndView goToUpload(HttpServletRequest request, HttpServletResponse response,
                                   @RequestParam String token) {

        Either<ModelAndView, ModelAndView> mav = this.checkToken(token, request);

        return /*new ModelAndView("upload");*/ mav.isRight() ? mav.get() : mav.getLeft();
    }

    /**
     * the view page for kim yoo chul
     *
     * @param request
     * @param response
     * @param token (JWT token)
     * @return mav (the name of view to direct)
     */
    @RequestMapping("/kim")
    public ModelAndView goToKim(HttpServletRequest request, HttpServletResponse response,
                                 @RequestParam String token) {

        Either<ModelAndView, ModelAndView> mav = this.checkToken(token, request);

        return /*new ModelAndView("upload");*/ mav.isRight() ? mav.get() : mav.getLeft();
    }

    /**
     * the view page for paik guem joo
     *
     * @param request
     * @param response
     * @param token (JWT token)
     * @return mav (the name of view to direct)
     */
    @RequestMapping("/paik")
    public ModelAndView goToPaik(HttpServletRequest request, HttpServletResponse response,
                                   @RequestParam String token) {

        Either<ModelAndView, ModelAndView> mav = this.checkToken(token, request);

        return /*new ModelAndView("upload");*/ mav.isRight() ? mav.get() : mav.getLeft();
    }

    /**
     *
     * @param authToken
     * @param request
     * @return result (when token is valid, the view page will be set to right side)
     */
    private Either<ModelAndView, ModelAndView> checkToken(String authToken, HttpServletRequest request) {

        LOGPrint.printHttpServletRequest(request);

        Either<ModelAndView, ModelAndView> result = Either.left(new ModelAndView("index"));

        try {

            JWTVerifier _v = JWT
                    .require(Algorithm.HMAC256("treetory"))
                    .withIssuer("treetory")
                    .acceptExpiresAt(60*1)
                    .build();
            DecodedJWT jwt = _v.verify(authToken);

            result = Either.right(new ModelAndView(request.getRequestURI()));

        } catch (JWTVerificationException e) {
            LOGPrint.printException(e, this.getClass());
        }

        return result;
    }
}
