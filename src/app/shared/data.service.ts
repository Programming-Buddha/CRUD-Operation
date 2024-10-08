import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from '../model/file-meta-data';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add user
  addUser(user : User) {
    user.id = this.afs.createId();
    return this.afs.collection('/Users').add(user);
  }

  // get all users
  getAllUsers() {
    return this.afs.collection('/Users').snapshotChanges();
  }

  // delete user
  deleteUser(user : User) {
     this.afs.doc('/Users/'+user.id).delete();
  }

  // edit user
  updateUser(user : User) {
    this.deleteUser(user);
    this.addUser(user);
  }
    
}
