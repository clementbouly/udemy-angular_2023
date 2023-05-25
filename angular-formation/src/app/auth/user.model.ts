export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {
    // localStorage.setItem('token', _token);
  }

  // getter
  get token() {
    // check if token is expired
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  // method to get token from localStorage
  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }
}
