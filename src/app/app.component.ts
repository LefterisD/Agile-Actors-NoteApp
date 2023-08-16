import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [
    {
      id: 1,
      title: 'Mock Title',
      body: 'mock body',
      color: '#ff0000',
      favourite: true
    }
  ];
  selected: Partial<Note>;

  title: string;
  body: string;
  favourite: boolean;
  color: string;

  private service: NotesService;

  constructor(
    private notesService: NotesService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.loadNotes();
  }

  getNotes() {
    return this.notes;
  }



  private loadNotes(): void {
    // TODO: Retrieve a list of notes from the service and store them locally
    this.notes = this.notesService.getNotes();
  }

  selectNote(note) {
    // TODO: prevent changing original object
    this.selected = note;
    this.fillFormWithSelected();
  }

  fillFormWithSelected() {
    this.title = this.selected.title;
    this.body = this.selected.body;
    this.favourite = this.selected.favourite;
    this.color = this.selected.color;
  }

  newNote() {
    this.selected = {};
  }

  saveNote(form: any) {
    // TODO: save
    if (form.form.status !== 'INVALID') {
      if (this.selected !== undefined) form.value.id = this.selected.id;
      this.notesService.saveNote(form.value);
      this.cleanForm();
    }
  }

  cleanForm() {
    this.title = '' ;
    this.body = '' ;
    this.favourite = false;
    this.color = '#000000';
  }
}
