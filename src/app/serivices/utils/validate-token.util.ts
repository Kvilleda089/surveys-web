import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "src/app/auth-service.jwt";


export class ValidateTokenUtil {

  public static validateToken(authService: AuthService): HttpHeaders {
    const token = authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  };
}
