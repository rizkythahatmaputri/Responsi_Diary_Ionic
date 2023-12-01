import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-kegiatan',
  templateUrl: './kegiatan.page.html',
  styleUrls: ['./kegiatan.page.scss'],
})
export class kegiatanPage implements OnInit {
  modal_edit!: boolean;

  constructor(public _apiService: ApiService, private modal: ModalController) { }

    dataKegiatan: any =[];
    modal_tambah = false;
    id: any;
    judul: any;
    nama: any;

  ngOnInit() {
    this.getKegiatan();
  }

  getKegiatan() {
    this._apiService.tampil('tampilKegiatan.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataKegiatan = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
}


reset_model() {
  this.id = null;
  this.judul = '';
  this.nama = '';
  }
  open_modal_tambah(isOpen: boolean) {
  this.modal_tambah = isOpen;
  this.reset_model();
  this.modal_tambah = true;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilKegiatan(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
  this.modal.dismiss();
  this.modal_tambah = false;
  this.reset_model();
  }

  tambahKegiatan() {
    if (this.judul != '' && this.nama != '') {
    let data = {
    judul: this.judul,
    nama: this.nama,
    }
    this._apiService.tambah(data, 'tambahKegiatan.php')
    .subscribe({
    next: (hasil: any) => {
    this.reset_model();
    console.log('berhasil tambah kegiatan');
    this.getKegiatan();
    this.modal_tambah = false;
    this.modal.dismiss();
    },
    error: (err: any) => {
    console.log('gagal tambah kegiatan');
    }
    })
    } else {
    console.log('gagal tambah kegiatan karena masih ada data yg kosong');
    }
    }

    hapusKegiatan(id: any) {
      this._apiService.hapus(id,
      '/hapusKegiatan.php?id=').subscribe({
      next: (res: any) => {
      console.log('sukses', res);
      this.getKegiatan();
      console.log('berhasil hapus data');
      },
      error: (error: any) => {
      console.log('gagal');
      }
      })
      }
  
      ambilKegiatan(id: any) {
        this._apiService.lihat(id,
        '/lihatKegiatan.php?id=').subscribe({
        next: (hasil: any) => {
        console.log('sukses', hasil);
        let kegiatan = hasil;
        this.id = kegiatan.id;
        this.judul = kegiatan.judul;
        this.nama = kegiatan.nama;
        },
        error: (error: any) => {
        console.log('gagal ambil data');
        }
        })
        }

        editKegiatan() {
          let data = {
          id: this.id,
          judul: this.judul,
          nama: this.nama
          }
          this._apiService.edit(data, '/editKegiatan.php')
          .subscribe({
          next: (hasil: any) => {
          console.log(hasil);
          this.reset_model();
          this.getKegiatan();
          console.log('berhasil edit Kegiatan');
          this.modal_edit = false;
          this.modal.dismiss();
          },
          error: (err: any) => {
          console.log('gagal edit Kegiatan');
          }
          })
          }
}
