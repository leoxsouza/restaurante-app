export class AppConstants {

  public static get baseServidor(): string {
    return "http://localhost:8080/"
  }

  public static get baseLogin(): string {
    return this.baseServidor + "api/usuario/login"
  }

  public static get baseUrl(): string {
    return this.baseServidor + "api/usuario/"
  }

  public static get apiUrl(): string {
    return this.baseServidor + "api"
  }

}
