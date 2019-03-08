import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageService } from './message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  error: string;
  validation: string;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Wandrille • Contact');

    window.scrollTo(0, 0);
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit({value, valid}) {
    if ( valid ) {
      const date = new Date;
      const local = new Date(date);
      local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      value.date = local.toJSON().slice(0, 15);
      this.messageService.sendMessage(value)
        .then(
          () => this.validation = 'Message send!',
          () => {
            this.validation = 'Message send!';
          }
        );
    }
    this.messageForm.reset();
  }
}
