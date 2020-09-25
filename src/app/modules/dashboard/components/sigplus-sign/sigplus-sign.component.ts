import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sigplus-sign',
  templateUrl: './sigplus-sign.component.html',
  styleUrls: ['./sigplus-sign.component.scss'],
})
export class SigplusSignComponent implements OnInit {
  // @ViewChild('SigPlus1') SigPlus1;

  txtValue = '';
  Disclaimer="Signing to this form is for example purposes only and authorizes no agreement whatsoever between signer and Company";
  SigData;

  constructor() {}

  ngOnInit(): void {}

  onSignClick() {
    var SigPlus1: any = document.getElementById('SigPlus1');
    console.log('clear', this.Disclaimer);
    SigPlus1.TabletState = 1;
  }

  OnClear() {
    var vSig: any = document.getElementById('SigPlus1');
    console.log('clear');
    vSig.ClearTablet();
  }

  OnCancel() {
    var SigPlus1: any = document.getElementById('SigPlus1');
    console.log('clear');
    SigPlus1.TabletState = 0;
  }

  submitSignature() {
    // event.preventDefault();
    console.log('submit sign');
    var vSig: any = document.getElementById('SigPlus1');
    if (this.txtValue == '') {
      alert('Please enter your first name to continue');
      return false;
    } else {
      if (vSig.NumberOfTabletPoints == 0) {
        alert('Please sign to continue');
        return false;
      } else {
        vSig.TabletState = 0;
        vSig.AutoKeyStart();
        vSig.AutoKeyData = this.txtValue;
        vSig.AutoKeyData = this.Disclaimer;
        vSig.AutoKeyFinish();
        vSig.EncryptionMode = 1;
        vSig.SigCompressionMode = 2;
        this.SigData = vSig.SigString;
        // this.submit();
      }
    }
  }
}
