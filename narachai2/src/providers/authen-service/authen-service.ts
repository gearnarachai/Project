import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertMessage } from '../../models/msg';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthenServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenServiceProvider {

  apiUrl:string = "http://127.0.0.1/api_narachai2/crud_product.php";

  constructor(public http: HttpClient) {
    console.log('Hello AuthenServiceProvider Provider');
  }


  
search( p_code:string ): Observable<AlertMessage> {
  const header = { 'Content-Type' : 'application/json' };
  let data = {
    'cmd' : 'select',
    'p_code' : p_code
  };
  return this.http.post<AlertMessage>(this.apiUrl, data, { headers : header });
}



}
