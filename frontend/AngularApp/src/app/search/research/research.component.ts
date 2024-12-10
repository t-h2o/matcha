import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tags } from '../../shared/models/tags';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [FormsModule, NgClass, CustomButtonComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export class ResearchComponent {
  private potentialMatchService = inject(PotentialMatchService);

  storedMatchFilter = this.potentialMatchService.potentialMatchFilter;
  tagsList = tags;
  selectedTags: string[] = [];

  ngOnInit() {
    this.selectedTags = [...this.storedMatchFilter().interests];
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

  interests = computed(() => this.storedMatchFilter().interests);
  isExpanded = signal<boolean>(false);
  maxAgeGap = signal<number>(this.storedMatchFilter().ageGap);
  maxDistance = signal<number>(this.storedMatchFilter().distance);
  maxFameGap = signal<number>(this.storedMatchFilter().fameGap);

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
    this.maxAgeGap.set(31);
    this.maxDistance.set(101);
    this.maxFameGap.set(6);
    this.selectedTags = [];
    const postFilter = {
      ageGap: 31,
      fameGap: 5,
      distance: 101,
      interests: [],
    };
    this.potentialMatchService.potentialMatchFilter.set(postFilter);
  }

  onSearch() {
    const postFilter = {
      ageGap: this.maxAgeGap(),
      fameGap: this.maxFameGap(),
      distance: this.maxDistance(),
      interests: this.selectedTags,
    };
    this.potentialMatchService.potentialMatchFilter.set(postFilter);
    this.potentialMatchService.filterPotentialMatches(postFilter);
  }
}
