import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { CompraCliente } from 'src/app/model/compra-cliente';
import { CompraClienteService } from 'src/app/service/compra-cliente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-divida-cliente-form',
  templateUrl: './divida-cliente-form.component.html',
  styleUrls: ['./divida-cliente-form.component.css']
})
export class DividaClienteFormComponent implements OnInit {


  compraCliente: CompraCliente = new CompraCliente();

  clientes: SelectItem[] = [];



  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private usuarioService: UsuarioService,
    private compraService: CompraClienteService,
    private router: Router,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.getDropdown();
  }

  getDropdown() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.usuarioService.getClientesDropdown().pipe(finalize(() => this.blockUI.stop()))
      .subscribe(clientesDropdown => this.clientes = clientesDropdown);
  }

  salvarCompra() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.compraService.salvar(this.compraCliente).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.router.navigate( [ '/divida-cliente' ] );
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Compra ${MensagemUtil.SALVO}`});
    });
  }

  disableBtnSalvar() {
    return !this.compraCliente.idUsuarioCliente || !this.compraCliente.valorCompra;
  }

}
