import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database/database.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode-generator',
  templateUrl: './qrcode-generator.page.html',
  styleUrls: ['./qrcode-generator.page.scss'],
})
export class QrcodeGeneratorPage implements OnInit {

  public customEyeColorChecked:boolean;
  public eyeColor:string;
  public secondaryEyeColor:string;
  public backgroundColor:string = "#00000";
  public color:string;
  public secondaryColor:string;
  public foregroundColorOption:string="single color";
  public selectedBodyShapeIndex:number = 0;
  public selectedEyeFrameIndex:number = 0;
  public selectedEyeBallIndex:number = 0;

  //#region Shapes
  bodyShapes=[
  {
    imageUrl:'assets/qrcodes/qrcode0.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode1.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode2.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode3.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode4.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode5.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode6.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode7.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode8.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode9.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode10.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode11.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode12.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode13.png'
  },
  {
    imageUrl:'assets/qrcodes/qrcode14.png'
  },
]

eyeFrames=[
{
  imageUrl:'assets/eyeframeshape/eyeshape0.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape1.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape2.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape3.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape4.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape5.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape6.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape7.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape8.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape9.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape10.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape11.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape12.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape13.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape14.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape15.png'
},
{
  imageUrl:'assets/eyeframeshape/eyeshape16.png'
}
]

eyeBalls=[
{
  imageUrl:'assets/eyeballshape/eyeballshape0.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape1.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape2.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape3.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape4.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape5.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape6.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape7.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape8.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape9.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape10.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape11.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape12.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape13.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape14.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape15.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape16.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape17.png'
},
{
  imageUrl:'assets/eyeballshape/eyeballshape18.png'
}
]
//#endregion

  constructor(private db:DatabaseService) { }

  ngOnInit() {
  }

  //#region Select
  selectBodyShape(index:number){
    this.selectedBodyShapeIndex=index;
  }

  selectEyeFrameShape(index:number){
    this.selectedEyeFrameIndex=index;
  }

  selectEyeBallShape(index:number){
    this.selectedEyeBallIndex=index;
  }
  //#endregion

  //#region Sharing
  shareCode() {
    this.db.getUsernameById().then((data) => {
      var options = {
        url: 'Here is my Joind sharing link: '+environment.url+data,
      };  

      window['plugins']['socialsharing'].shareWithOptions(options);
    })
  }

  shareQRCode() {
    var options = {
      url: 'Here is my Joind QR Code: ',
      files: ['www/assets/camera.png'], 
    };
  
    window['plugins']['socialsharing'].shareWithOptions(options);
  }
  //#endregion

}
