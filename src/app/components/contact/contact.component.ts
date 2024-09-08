import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactform!: FormGroup;

  constructor(private fb: FormBuilder, private contactservice: ContactService) {}

  ngOnInit(): void {
    this.contactform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  private validateFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFields(control);
      }
    });
  }

  onSubmit() {
    if (this.contactform.valid) {
      console.log(this.contactform.value);
      this.contactservice.onsubmit(this.contactform.value).subscribe({
        next: (res) => {
          console.log('Response:', res);
        
          if (res && res.success) { // Adjust based on the actual response structure
            alert("Message sent successfully");
            this.contactform.reset()
          } else {
            alert("Message sent, but the server indicated an issue.");
            this.contactform.reset()
          }
          
        },
        error: (err) => {
          console.log('Error:', err);
          alert("Message sent successfully");
          this.contactform.reset()
        }
      });
    
    } else {
      this.validateFields(this.contactform);
      alert("Invalid form. Please fill in all required fields.");
    }
  }
}
