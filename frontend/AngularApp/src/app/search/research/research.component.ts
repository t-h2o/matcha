import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tags } from '../../shared/models/tags';
import { UserService } from '../../shared/services/user.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [FormsModule, NgClass, CustomButtonComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export class ResearchComponent {
  private userService = inject(UserService);
  private potentialMatchService = inject(PotentialMatchService);

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

  getAgeGapLabel(): string {
    return this.maxAgeGap() >= 31 ? '30+' : this.maxAgeGap().toString();
  }

  getFameGapLabel(): string {
    return this.maxFameGap() >= 5 ? '5+' : this.maxFameGap().toString();
  }

  onReset() {
    this.maxAgeGap.set(0);
    this.maxDistance.set(0);
    this.maxFameGap.set(0);
    this.selectedTags = [...this.interestList().interests];
  }

  onSearch() {
    const postFilter = {
      ageGap: this.maxAgeGap(),
      fameGap: this.maxFameGap(),
      distance: this.maxDistance(),
      interests: this.selectedTags,
    };

    this.potentialMatchService.filterPotentialMatches(postFilter);
  }
}
