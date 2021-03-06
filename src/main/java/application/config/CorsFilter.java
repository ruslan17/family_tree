package application.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Если запускать бэк и фронт отдельно, например с помощью среды разработки,
 * то фронт запускается на другом хосте и CORS нужен потому что в целях безопасности,
 * браузеры не разрешают делать  XMLHttpRequest запросы типа Ajax между разными доменами.
 * Если же собирать проект с помощью mvn clean install то и бэк и фронт будут на одном порте(в данном случае 7171),
 * и данный файл не нужен
 */
@Component
public class CorsFilter implements Filter {

    @Value("${application.token.header}")
    private String tokenHeader;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, " + tokenHeader);
        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void destroy() {}

}