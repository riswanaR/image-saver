import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedImage: File | null = null;
  savedImages: { id: number; url: string }[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadSavedImages();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  saveData() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageDataUrl = e.target.result;
        const newImage = {
          id: this.savedImages.length + 1,
          url: imageDataUrl
        };
        this.savedImages.push(newImage);
        this.storageService.setItem('savedImages', JSON.stringify(this.savedImages));
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  loadSavedImages() {
    const savedImagesData = this.storageService.getItem('savedImages');
    if (savedImagesData) {
      this.savedImages = JSON.parse(savedImagesData);
    }
  }

  removeImage(id: number) {
    this.savedImages = this.savedImages.filter(image => image.id !== id);
    this.storageService.setItem('savedImages', JSON.stringify(this.savedImages));
  }
}