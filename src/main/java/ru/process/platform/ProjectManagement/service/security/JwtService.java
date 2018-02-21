package ru.process.platform.ProjectManagement.service.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.process.platform.ProjectManagement.entity.jwt.Token;
import ru.process.platform.ProjectManagement.entity.user.User;
import ru.process.platform.ProjectManagement.utils.jwt.TokenUtils;
import ru.process.platform.ProjectManagement.utils.time.TimeUtils;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private long expiration;

    public String buildJwtToken(User user) {
        if (user == null) {
            return null;
        }
        Token token = new Token(user.getId(), TimeUtils.generateExpirationDate(expiration), new Date());
        return TokenUtils.convertTokenString(token, secret);
    }

    public Token getClaimsFromToken(String tokenHeader) {
        if(tokenHeader == null){
            return null;
        }
        return TokenUtils.claimsFromToken(tokenHeader, secret);
    }

    public boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    public boolean validateToken(Token token) {
        return isTokenExpired(token.getExpiration()) && (token.getExpiration() != null
                || token.getCreationDate() != null);
    }
}
