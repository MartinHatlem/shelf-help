import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { LibraryStore } from '../../services/api/library-store';

@Component({
	selector: 'app-book-form',
	imports: [RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
	templateUrl: './book-form.html',
	styleUrl: './book-form.css',
})
export class BookForm {
	router = inject(Router);
	fb = inject(FormBuilder);
	store = inject(LibraryStore);

	form = this.fb.nonNullable.group({
		title: ['', Validators.required],
		author: ['', Validators.required],
		coverImg: ['', Validators.required],
		blurb: ['', Validators.maxLength(500)],
	});

	onSubmit() {
		if (this.form.invalid) {
			console.log('Form invalid');
			return;
		}

		const data = this.form.getRawValue();
		this.store.addBook(data);
		this.router.navigate(['/']);
	}
}
