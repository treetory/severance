package com.treetory.severance;

import com.auth0.jwt.JWT;
import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.thymeleaf.spring5.ISpringTemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 *  Configuration class
 *
 * @author treetory@gmail.com
 *
 */
@EnableSwagger2
@EnableAsync
@EnableConfigurationProperties({FileStorageProperties.class, UserCredentialProperties.class})
@Configuration
public class SampleDataConfiguration implements ApplicationListener<ApplicationEvent>, WebMvcConfigurer {

    @Autowired
    private WebApplicationContext appContext;

    @Bean(name = "JWT")
    public static final JWT JWT() {
        JWT jwt = new JWT();
        return new JWT();
    }
    @Bean(name = "gson")
    public Gson gson() {
        return new Gson();
    }
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).build();
    }
    @Bean(name = "templateResolver")
    @Description("Thymeleaf template resolver serving HTML")
    public ITemplateResolver templateResolver() {
        // SpringResourceTemplateResolver automatically integrates with Spring's own
        // resource resolution infrastructure, which is highly recommended.
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setSuffix(".html");
        // HTML is the default value, added here for the sake of clarity.
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding("UTF-8");
        // Template cache is true by default. Set to false if you want
        // templates to be automatically updated when modified.
        templateResolver.setCacheable(false);
        return templateResolver;
    }
    @Bean(name = "templateEngine")
    @Description("Thymeleaf template engine with Spring integration")
    public ISpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver((ITemplateResolver)appContext.getBean("templateResolver"));
        return templateEngine;
    }
    @Bean(name = "thymeleafViewResolver")
    @Description("Thymeleaf view resolver")
    public ViewResolver thymeleafViewResolver() {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine((ISpringTemplateEngine)appContext.getBean("templateEngine"));
        return viewResolver;
    }
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.viewResolver((ViewResolver) appContext.getBean("thymeleafViewResolver"));
    }
    @Override
    @Description("Every resources for requesting from view is registerd in here.")
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        /**
         * swagger-ui 의 웹 리소스를 찾을 수 있도록 리소스 핸들러에 리소스 경로와 위치를 등록한다.
         */
        registry.addResourceHandler("/api/swagger-ui.html**")
                .addResourceLocations("classpath:/META-INF/resources/swagger-ui.html");

        registry.addResourceHandler("/api/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        /**
         * JSON 파일 위치
         */
        registry
                .addResourceHandler("/formJSON/**")
                .addResourceLocations("file:./form-json/")
                .setCachePeriod(300);

    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        /**
         * swagger-ui 의 url path 의 redirect 주소를 등록한다.
         */
        registry.addRedirectViewController("/api", "/api/swagger-ui.html");
        registry.addRedirectViewController("/api/v2/api-docs", "/v2/api-docs");
        registry.addRedirectViewController("/api/swagger-resources/configuration/ui", "/swagger-resources/configuration/ui");
        registry.addRedirectViewController("/api/swagger-resources/configuration/security", "/swagger-resources/configuration/security");
        registry.addRedirectViewController("/api/swagger-resources", "/swagger-resources");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(new AuthInterceptor())
                /**
                 *  page redirect 처리하는 경우는 header 에 authorization token 을 담을 수 없다.
                 *  파라미터로 넘겨야만 한다.
                 *  그러므로 auth check 를 하는 interceptor 에서 페이지 이동 URL 패턴을 제외시킨다.
                 */
                .excludePathPatterns("/")
                .excludePathPatterns("/poc")
                .excludePathPatterns("/upload")
                .excludePathPatterns("/error")
                // REST API URL
                .excludePathPatterns("/login")
                // Static Resource Path
                .excludePathPatterns("/js/*")
                .excludePathPatterns("/css/*")
                .excludePathPatterns("/favicon.ico")
                ;
    }

    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
        /*
        StringBuffer sb = new StringBuffer();
        sb.append("*************************************************************************");
        sb.append(System.lineSeparator());
        sb.append("#     #                                                                                                                   ###                                              ");
        sb.append(System.lineSeparator());
        sb.append("#  #  # ###### #       ####   ####  #    # ######    #####  ####     ##### #####  ###### ###### #####  ####  #####  #   # ###  ####     #    #  ####  #####  #      #####  ");
        sb.append(System.lineSeparator());
        sb.append("#  #  # #      #      #    # #    # ##  ## #           #   #    #      #   #    # #      #        #   #    # #    #  # #   #  #         #    # #    # #    # #      #    # ");
        sb.append(System.lineSeparator());
        sb.append("#  #  # #####  #      #      #    # # ## # #####       #   #    #      #   #    # #####  #####    #   #    # #    #   #   #    ####     #    # #    # #    # #      #    # ");
        sb.append(System.lineSeparator());
        sb.append("#  #  # #      #      #      #    # #    # #           #   #    #      #   #####  #      #        #   #    # #####    #            #    # ## # #    # #####  #      #    # ");
        sb.append(System.lineSeparator());
        sb.append("#  #  # #      #      #    # #    # #    # #           #   #    #      #   #   #  #      #        #   #    # #   #    #       #    #    ##  ## #    # #   #  #      #    # ");
        sb.append(System.lineSeparator());
        sb.append(" ## ##  ###### ######  ####   ####  #    # ######      #    ####       #   #    # ###### ######   #    ####  #    #   #        ####     #    #  ####  #    # ###### #####  ");
        sb.append(System.lineSeparator());
        sb.append("*************************************************************************");

        LOG.info("{}{}{}", System.lineSeparator(), sb.toString(), System.lineSeparator());
        */
    }
}
