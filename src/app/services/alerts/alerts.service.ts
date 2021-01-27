import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController:AlertController) { }

  async defaultErrorAlert(text:string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: text,
      message: 'Please try again',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async OfflineModeRadio() {
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Hidden Mode Time :",
        message: 'Choose the time you want to be offline',
        inputs: [
          {
            name: '1h',
            type: 'radio',
            label: '1h',
            value: '1h',
            handler: inputsData => {
              alert.dismiss()
              resolve(1)
            }
          },
          {
            name: '4h',
            type: 'radio',
            label: '4h',
            value: '4h',
            handler: inputsData => {
              alert.dismiss()
              resolve(4)
            }
          },
          {
            name: '24h',
            type: 'radio',
            label: '24h',
            value: '24h',
            handler: inputsData => {
              alert.dismiss()
              resolve(24)
            }
          },
          {
            name: 'Unlimited',
            type: 'radio',
            label: 'Unlimited',
            value: 'Unlimited',
            handler: inputsData => {
              alert.dismiss()
              resolve(100)
            }
          },
        ]
      });

      await alert.present();
     
      await alert.onDidDismiss().then(() => {
        resolve("aborted")
      })

    });
  }

  async askFromSim(){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Sim Phone:",
        message: 'Do you want us to use the phone number of your sim card ?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss()
              resolve("yes")
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

  async askEmailFromdb(){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Use Linked email",
        message: 'Do you want us to use the email linked to your account ?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss()
              resolve("yes")
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

  async EnterSource(source:string){
    const type = source == "Email" ? "email" : "tel";
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Phone number :",
        message: 'Enter your '+source,
        inputs: [
          {
            name: 'Input',
            placeholder:'Enter Your '+source,
            type:type
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Ok',
            handler: (data) => {
              alert.dismiss()
              resolve(data)
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

  async enterCode(source:string){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Code :",
        message: 'Enter The Code You we sent to '+source,
        inputs: [
          {
            name: 'InputCode',
            placeholder:'Enter The Code',
            type:'number',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Ok',
            handler: (data) => {
              alert.dismiss()
              resolve(data)
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

  async InvalidCode(source:string){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Invalid Code :",
        message: 'Invalid Verification Code',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Change '+source,
            handler: () => {
              alert.dismiss()
              resolve("change")
            }
          },
          {
            text: 'Retry Code',
            handler: () => {
              alert.dismiss()
              resolve("retry")
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

  async linkPhoneAccount(){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Link The Phone",
        message: 'Do you want us to link this phone to your account',
        buttons: [
          {
            text: 'No',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss()
              resolve("yes")
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  } 

  async enterUname(source:string){
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Username :",
        message: 'Enter Your '+source +" Username",
        inputs: [
          {
            name: 'uname',
            placeholder:'Username',
            type:'text',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss()
              resolve(null)
            }
          },
          {
            text: 'Ok',
            handler: (data) => {
              alert.dismiss()
              resolve(data)
            }
          }
        ]
      });

      await alert.present();
      
      await alert.onDidDismiss().then(() => {
        resolve(null)
      })

    });
  }

}
