import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFireAuthModule } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersList: User[] = [];
  userObj: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    eid : '',
    efirst_name : '',
    elast_name : '',
    eemail : '',
    emobile : '',
    
  };
  
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';
  

  constructor(public authService: AuthService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    const userDetails:any = localStorage.getItem("user");
    console.log(typeof JSON.parse(userDetails));
    if(!JSON.parse(userDetails)){
      this.router.navigate(["/sign-in"])
      return
    }
    
    
    this.getAllUsers();
  }

  register() {
     this.authService.logout();
   }

  getAllUsers() {

    this.data.getAllUsers().subscribe(res => {

      this.usersList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching user data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  addUser() {
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.userObj.id = '';
    this.userObj.email = this.email;
    this.userObj.first_name = this.first_name;
    this.userObj.last_name = this.last_name;
    this.userObj.mobile = this.mobile;

    this.data.addUser(this.userObj);
    this.resetForm();

  }

  updateUser(user : User) {

  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.deleteUser(user);
    }
    
  }

  signOut() {
    localStorage.removeItem("user");
    this.router.navigate(["/sign-in"])
  }

  editUser(user: User) {
    user.isEditing = true;
    this.first_name == user.efirst_name;
    this.last_name == user.elast_name;
    this.email == user.eemail;
    this.mobile == user.emobile;
  }

  saveUser(user: User) {
    // Perform any necessary validation or API calls to save the user's details
    user.isEditing = false;
    //user.first_name = this.first_name;
    //user.last_name = this.last_name;
    //user.email = this.email;
    //user.mobile = this.mobile;
    localStorage.setItem('user', JSON.stringify(user));
  
    // Reset the form input values
    this.resetForm();
  }
  

  cancelEdit(user: User) {
    user.isEditing = false;
  }
  /* editUser(user: User) {
    if (window.confirm('Are you sure you want to edit ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.editUser(user);
    }*/
  
}