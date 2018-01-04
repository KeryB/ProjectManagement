package ru.process.platform.ProjectManagement.utils.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ru.process.platform.ProjectManagement.entity.jwt.Token;

import java.util.HashMap;
import java.util.Map;

public class TokenUtils {

    private static final String CLAIM_KEY_ID = "sub";
    private static final String CLAIM_KEY_ROLE = "role";
    private static final String CLAIM_KEY_CREATION_DATE = "cr";
    private static final String CLAIM_KEY_EXPIRATION_DATE = "ex";

    public static String convertTokenString(Token token, String secret){
        Map<String, Object> claims = new HashMap<String, Object>() {{
            put(CLAIM_KEY_ID, token.getId());
            put(CLAIM_KEY_EXPIRATION_DATE, token.getExpiration());
            put(CLAIM_KEY_CREATION_DATE, token.getCreationDate());
        }};
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(token.getExpiration())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
