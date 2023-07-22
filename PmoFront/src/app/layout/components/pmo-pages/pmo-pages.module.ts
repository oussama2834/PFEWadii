import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmoPagesRoutingModule } from './pmo-pages-routing.module';
import { ProjectComponent } from './project/project.component';
import { FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

import { CardModule } from 'primeng/card';

import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,

  ],
  imports: [
    CommonModule,
    PmoPagesRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    FileUploadModule,
    ReactiveFormsModule,
    RippleModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    CardModule,
    TreeTableModule,
    AccordionModule
  ]
})
export class PmoPagesModule { }
