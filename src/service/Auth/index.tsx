import axios from 'axios';

interface ILoginConfig {
  username: string;
  password: string;
}

class AuthService{
  private _baseUrl = 'http://localhost:3000';
  private _loginUrl = this._baseUrl+'/login';
  async login(body: ILoginConfig){
    axios.post(`${this._baseUrl}/login`, body);
  }

  get baseUrl(){
    return this._baseUrl;
  }

  get loginUrl(){
    return this._loginUrl;
  }
}

export default new AuthService();