import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  acao: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.verificarParametros();
  }

  verificarParametros() {
    this.route.params.subscribe((params) => {

      this.acao = params['acao'];
    });
  }


}
