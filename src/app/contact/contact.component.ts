import {ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MatButton} from '@angular/material/button';
import {MessageService} from './message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButton]
})
export class ContactComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  messageForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  error = signal<string | undefined>(undefined);
  validation = signal('');

  ngOnInit() {
    this.titleService.setTitle('Wandrille â€¢ Contact');
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const value = this.messageForm.value as Record<string, unknown>;
      const date = new Date();
      const local = new Date(date);
      local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.messageService.sendMessage({...value, date: local.toJSON().slice(0, 15)})
        .then(
          () => this.validation.set('Message sent!'),
          () => this.validation.set('Message sent!')
        );
    }
    this.messageForm.reset();
  }
}
