import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate';
import { Post } from '../interfaces/post';
import { PostsService } from '../services/posts.service';
import { postRequiredValidator } from '../validators/post-required.validator';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements CanComponentDeactivate {
  #router = inject(Router);
  #postsService = inject(PostsService);
  #fb = inject(NonNullableFormBuilder);

  fileName = '';
  saved = false;
  imageBase64 = '';

  postForm = this.#fb.group({
    title: ['', [Validators.minLength(5), Validators.pattern("^[a-zA-Z][a-zA-Z ]*$")]],
    description: ['', [Validators.minLength(8)]],
    image: '',
    mood: 1,
  }, { validators: postRequiredValidator });

  canDeactivate() {
    return (
      this.saved || this.postForm.pristine ||
      confirm('Do you want to leave this page?. Changes can be lost')
    );
  }

  addPost() {
    const post: Post = {
      ...this.postForm.getRawValue(),
      likes: null,
      image: this.imageBase64
    };
    this.#postsService.addPost(post).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/posts']);
    });
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.imageBase64 = reader.result as string;
    });
  }
}
