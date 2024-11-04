import { Component, computed, inject, signal } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { tags } from '../../shared/models/tags';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CardComponent, FormsModule, NgClass, CustomButtonComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export class ResearchComponent {
  private userService = inject(UserService);

  interestList = this.userService.interestList;
  tagsList = tags;
  selectedTags: string[] = [];

  ngOnInit() {
    this.selectedTags = [...this.interestList().interests];
  }

  onTagChange(event: any) {
    const tag = event.target.value;
    if (event.target.checked) {
      this.selectedTags.push(tag);
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  interests = computed(() => this.interestList().interests);
  isExpanded = signal<boolean>(false);
  maxAgeGap = signal<number>(0);
  maxDistance = signal<number>(0);
  maxFameGap = signal<number>(0);
  commonTags = signal<string[]>([]);

  toggleForm(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  getDistanceLabel(): string {
    return this.maxDistance() >= 101 ? '100+' : this.maxDistance().toString();
  }

  onReset() {
    // do something
  }

  onSearch() {
    // do something
  }
}
