import { Injectable } from '@angular/core';
import {
  authState,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  initAuthListener() {
    return authState(this.auth);
  }
  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }: any) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        const userRef = collection(this.firestore, 'user');
        return addDoc(userRef, { ...newUser });
      }
    );
  }
  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    return signOut(this.auth);
  }
  isAuth() {
    return authState(this.auth).pipe(
      map((fbUser) => fbUser != null)
      );
  }
}
