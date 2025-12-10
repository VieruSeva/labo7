import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center gy-4">
        <div class="col-lg-4">
          <div class="glass-card p-4 h-100">
            <p class="section-heading mb-2">Visit Aurora</p>
            <h2 class="h4 mb-3">Gallery details</h2>
            <p class="small text-muted-soft mb-3">
              This is a fictional gallery for your Angular lab, but the layout mirrors real
              museum contact pages.
            </p>

            <ul class="list-unstyled small mb-3">
              <li class="mb-2">
                <i class="bi bi-geo-alt text-warning me-2"></i>
                Aurora Gallery, 27 Art District, Paris
              </li>
              <li class="mb-2">
                <i class="bi bi-clock text-warning me-2"></i>
                Tue – Sun, 10:00 – 20:00
              </li>
              <li class="mb-2">
                <i class="bi bi-envelope text-warning me-2"></i>
                hello@aurora-expo.test
              </li>
              <li>
                <i class="bi bi-telephone text-warning me-2"></i>
                +33 (0)1 23 45 67 89
              </li>
            </ul>

            <p class="small text-muted-soft mb-2">Quick links</p>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge-soft">Group bookings</span>
              <span class="badge-soft">Guided tours</span>
              <span class="badge-soft">School visits</span>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="soft-card p-4 p-md-5">
            <h2 class="h4 mb-3">Contact the curator</h2>
            <p class="small text-muted-soft mb-4">
              Send us a question about the artworks, the topic of the exhibition, or technical
              details about this Angular project.
            </p>

            <div
              *ngIf="successMessage"
              class="alert alert-success alert-dismissible fade show small"
            >
              {{ successMessage }}
              <button type="button" class="btn-close" (click)="successMessage = ''"></button>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  formControlName="name"
                  [class.is-invalid]="f['name'].touched && f['name'].invalid"
                />
                <div class="invalid-feedback">Name is required.</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  formControlName="email"
                  [class.is-invalid]="f['email'].touched && f['email'].invalid"
                />
                <div class="invalid-feedback">Enter a valid email.</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Topic</label>
                <select
                  class="form-select"
                  formControlName="topic"
                  [class.is-invalid]="f['topic'].touched && f['topic'].invalid"
                >
                  <option value="">Choose a topic…</option>
                  <option value="visit">Gallery visit</option>
                  <option value="artwork">Specific artwork</option>
                  <option value="project">Angular project question</option>
                </select>
                <div class="invalid-feedback">Please choose a topic.</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea
                  class="form-control"
                  rows="5"
                  formControlName="message"
                  [class.is-invalid]="f['message'].touched && f['message'].invalid"
                ></textarea>
                <div class="invalid-feedback">
                  Message must be at least 10 characters.
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2 rounded-pill">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.successMessage =
        'Thank you! Your (demo) message has been captured in the console.';
      this.contactForm.reset();
      this.contactForm.markAsPristine();
      this.contactForm.markAsUntouched();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
