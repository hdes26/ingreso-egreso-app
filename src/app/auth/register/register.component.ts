import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  crearUsuario() {
    if (this.registroForm.invalid) {return};

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
        setInterval(() => {
          Swal.getTimerLeft();
        });
      },
    });

    const { nombre, email, password } = this.registroForm.value;
    console.log(this.registroForm.value)
    this.authService.crearUsuario(nombre, email, password)
      .then((credenciales) => {
        Swal.close();                                                                                                                  
        this.router.navigate(['/']);
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error',
        })
      );
  }
}
