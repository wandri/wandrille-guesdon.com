import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {MenuProject} from '../main/project.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  project = input<MenuProject | null>(null);

  protected title = computed(() => this.project()?.title ?? '');
  protected subTitle = computed(() => this.project()?.subTitle ?? null);
  protected backgroundImageLink = computed(() => this.project()?.backgroundImagePath ?? null);
  protected logoLink = computed(() => this.project()?.logoPath ?? null);
  protected backgroundStyle = computed(() => {
    const link = this.backgroundImageLink();
    return link ? `url(${link})` : null;
  });
}
