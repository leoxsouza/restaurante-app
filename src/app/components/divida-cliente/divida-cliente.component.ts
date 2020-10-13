import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
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
    private dividaService: DividaClienteService,
    private messageService: MessageService,
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

    this.dividaQuitada.idUsuarioCliente = this.dividaSelecionada.idCliente;

    if (this.quitarParte) {

      if (this.parteQuitada > this.dividaSelecionada.total) {
        this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: `O valor informado é maior que a dívida.`});
        return;
      }
      
      this.dividaQuitada.valorQuitado = this.parteQuitada;


    } else {
      this.dividaQuitada.valorQuitado = this.dividaSelecionada.total;
    }

    this.persistirRegistro();
    
  }

  disableBtnQuitar() {
    return this.quitarParte && !this.parteQuitada;
  }

  persistirRegistro() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.dividaService.quitarDivida(this.dividaQuitada).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.listarDividas();
      this.closeDialog();
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Dívida quitada com sucesso!`});
    });
  }

}
