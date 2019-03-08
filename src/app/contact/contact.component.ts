import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MessageService} from './message.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    messageForm: FormGroup;
    error: string | undefined = undefined;
    validation: string = '';

    constructor(private titleService: Title, private formBuilder: FormBuilder, private messageService: MessageService) {
        this.messageForm = this.messageForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.minLength(2)]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit() {
        this.titleService.setTitle('Wandrille • Contact');

        window.scrollTo(0, 0);
    }

    onSubmit({value, valid}: { value: {}, valid: boolean }) {
        if (valid) {
            const date = new Date;
            const local = new Date(date);
            local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            this.messageService.sendMessage({...value, date: local.toJSON().slice(0, 15)})
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
