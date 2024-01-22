import { AbstractControl, ValidationErrors } from '@angular/forms';

export function postRequiredValidator(
  postForm: AbstractControl
): ValidationErrors | null {
  if (
    !postForm.get('title')?.value &&
    !postForm.get('description')?.value &&
    !postForm.get('image')?.value
  ) {
    return { postRequired: true };
  }

  return null;
}
