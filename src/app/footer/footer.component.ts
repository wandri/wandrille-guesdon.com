import {ChangeDetectionStrategy, Component} from '@angular/core';

interface Media {
  name: string;
  link: string;
  imageLink: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly medias: Media[] = [
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/wandrille-guesdon-53a54684/',
      imageLink: 'assets/images/linkedin.svg'
    },
    {
      name: 'github',
      link: 'https://github.com/wandri',
      imageLink: 'assets/images/github_white.svg'
    }
  ];
}
