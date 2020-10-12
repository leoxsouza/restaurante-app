import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DividaCliente } from 'src/app/model/divida-cliente';
import { QuitarDivida } from 'src/app/model/quitar-divida';
import { DividaClienteService } from 'src/app/service/divida-cliente.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-divida-cliente',
  templateUrl: './divida-cliente.component.html',
  styleUrls: ['./divida-cliente.component.css']
})
export class DividaClienteComponent implements OnInit {

  dividas: DividaCliente[] = [];
  displayModal: boolean;
  dividaSelecionada: DividaCliente = new DividaCliente();
  quitarParte: boolean = false;
  dividaQuitada: QuitarDivida = new QuitarDivida();
  parteQuitada: number = null;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private dividaService: DividaClienteService
  ) { }

  ngOnInit(): void {
    this.listarDividas();
  }

  listarDividas() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.dividaService.listarDividas()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => this.dividas = data);
  }

  quitarDivida(dividaSelecionada: DividaCliente) {
    this.dividaSelecionada = dividaSelecionada;
    this.showModalDialog();
    console.log(this.dividaSelecionada);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  closeDialog() {
    this.parteQuitada = null;
    this.quitarParte = false;
    this.displayModal = false;
  }

  confirmarPagamento() {
    //TODO TRAZER O ID DO CLIENTE NA LSITAGEM TBM
    // this.dividaQuitada.idUsuarioCliente = this.dividaSelecionada.idUsuarioCliente;

    if (this.quitarParte) {
      this.dividaQuitada.valorQuitado = this.parteQuitada;
    } else {
      this.dividaQuitada.valorQuitado = this.dividaSelecionada.total;
    }

    console.log(this.dividaQuitada);
  }

  disableBtnQuitar() {
    return this.quitarParte && !this.parteQuitada;
  }

}
