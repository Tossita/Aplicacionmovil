import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  constructor(private menu: MenuController, private alertController: AlertController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('main-content');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async comenzarAlert() {
    const alert = await this.alertController.create({
      header: 'La clase a comenzado!',
      buttons: ['OK'],
    });

    await alert.present();
  }


}
