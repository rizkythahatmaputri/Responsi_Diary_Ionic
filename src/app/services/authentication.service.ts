import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'token-saya';
@Injectable({
providedIn: 'root'
})
export class AuthenticationService {
// Inisialisasi is auth
isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
token = '';
constructor(private http: HttpClient) {
this.loadToken();
}
//async loadToken() {
//const token = await Preferences.get({ key: TOKEN_KEY });
//if (token && token.value) {
//console.log('set token: ', token.value);
//this.token = token.value;
//this.isAuthenticated.next(true);
//} else {
//this.isAuthenticated.next(false);
//}
//}
loadToken() {
  return localStorage.getItem(TOKEN_KEY);
}
apiURL() {
//return "http://localhost/mobile/backend/";
return " https://api-auth.dalhaqq.xyz/";

}
//logout(): Promise<void> {
//this.isAuthenticated.next(false);
//return Preferences.remove({ key: TOKEN_KEY });
//}
logout() {
  localStorage.clear();
  return true;
}
}