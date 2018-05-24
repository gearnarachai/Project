import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';
import { AlertMessage } from '../../models/msg';
import { Product } from '../../models/product';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data : any;
  alertMSG : AlertMessage; 
  ProductList: Product[];
  subscription : Subscription;
  p_code:any
  constructor(public navCtrl: NavController, 
    private barcodeScanner : BarcodeScanner,
    public navParams: NavParams,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private authenServiceProvider : AuthenServiceProvider) {

  }
  search(fromSearch){
    console.log(status);
    let p_code = fromSearch.p_code;
    this.test(p_code);
  }

  scan():void {
   
    //ถ้าเอา options ออกจะเป็นบาร์โค้ด
    let options = {
      formats : 'QR_CODE'
    }

    this.barcodeScanner.scan(options).then( (barcodeData) => {
        
    let p_code = barcodeData.text;
    this.test(p_code);
      },(error)=>{
        console.log(error);
      }
    );

  }



  test(p_code){
    let loader = this.loadingCtrl.create({
      content: "กำลังค้นหา....."
    });

    loader.present();

    this.authenServiceProvider.search(p_code).subscribe(
    (alertMSG:AlertMessage) => {
      this.alertMSG = alertMSG;

      if(this.alertMSG.status == 'ok') {
          let alert = this.alertCtrl.create({
          title:this.alertMSG.message,
          buttons : ['ตกลง']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title:this.alertMSG.message,
          buttons :['ตกลง']
        });
        alert.present();
      }

    },(error) => {
        console.log(error);
        loader.dismiss();
    },() => {
      loader.dismiss();
  });

  }
}
