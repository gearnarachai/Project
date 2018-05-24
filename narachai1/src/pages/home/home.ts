import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bmi : any;
  msg1 : any;
  msg2 : any;
  msgShow1 : any;
  msgShow2 : any;
  bmiShow : any;
  bmr:any;
  bmrShow:any;
  tdee:any;
  tdeeShow : any;
  
  constructor(public navCtrl: NavController,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController) {

  }

  calcul(fromCalculate){
    let myHeight = parseInt(fromCalculate.myHeight);
    let myWeight = parseInt(fromCalculate.myWeight);
    let myGender = fromCalculate.myGender;
    let myAge = parseInt(fromCalculate.myAge);
    let myTdee = fromCalculate.myTdee;

 
     
    

    this.bmi = (myWeight/((myHeight*0.01)^2));

    //console.log(myHeight,"+",myWeight,"=",this.bmi);
    //console.log("เพศ = ",myGender);


///////////////////// BMI
    if(this.bmi<18.50)
    {
      this.msg1 = "น้ำหนักน้อย/ผอม";
      this.msg2 = "มากกว่าตนปกติ";
    }else if(this.bmi>=18.50&&this.bmi<=22.90)
    {
      this.msg1 = "ปกติส(ุสุขภาพดี)";
      this.msg2 = "เท่าคนปกติ";
    }else if(this.bmi>=23&&this.bmi<=24.90)
    {
      this.msg1 = "ท้วม(ุโรคอ้วนระดับ1)";
      this.msg2 = "อันตรายระดับ1";
    }else if(this.bmi>=25&&this.bmi<=29.90)
    {
      this.msg1 = "อ้วน(ุโรคอ้วนระดับ2)";
      this.msg2 = "อันตรายระดับ2";
    }else if(this.bmi>30)
    {
      this.msg1 = "อ้วนมาก(ุโรคอ้วนระดับ3)";
      this.msg2 = "อันตรายระดับ3";
    }
    this.bmiShow ="ค่า BMI ของคุณคือ : "+this.bmi.toFixed(2);
    this.msgShow1 ="อยู่ในเกณฑ์ : "+this.msg1;
    this.msgShow2 ="เสี่ยงต่อโรค : "+this.msg2;
//////////////////////

/////////////// BMR

    if(myGender == 'm'){
      this.bmr = 66+(13.7*myWeight)+(5*myHeight)-(6.8*myAge);
    }else if(myGender == 'f'){
      this.bmr = 665+(9.6*myWeight)+(1.8*myHeight)-(4.7*myAge);
    }

    //console.log("BmR = ",this.bmr);
    this.bmrShow = "BMR : "+this.bmr.toFixed(2)+" แคลอรี่/วัน";

////////////////////////


//////// TDEE

    if(myTdee == '1'){
        this.tdee =(1.2*this.bmr);
    }else if(myTdee == '2'){
        this.tdee =(1.375*this.bmr);
    }else if(myTdee == '3'){
      this.tdee =(1.55*this.bmr);
    }else if(myTdee == '4'){
      this.tdee =(1.7*this.bmr);
    }else if(myTdee == '5'){
      this.tdee =(1.9*this.bmr);
    }

    this.tdeeShow = "TDEE : "+this.tdee.toFixed(2)+" แคลอรี่/วัน";
 
//////////////

//////// ShowData
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลของคุณ',
      subTitle: "- "+this.bmiShow+"<br>"+
                "- "+this.msg1+"<br>"+
                "- "+this.msgShow2+"<br>"+
                "- "+this.bmrShow+"<br>"+
                "- "+this.tdeeShow,
      buttons: ['รับทราบ']
    });
    alert.present();
//////////////////
  }

}
