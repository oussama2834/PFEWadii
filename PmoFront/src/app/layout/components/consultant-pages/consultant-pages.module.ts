import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantPagesRoutingModule } from './consultant-pages-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

import { ToolbarModule } from 'primeng/toolbar';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    ConsultantPagesRoutingModule,
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
export class ConsultantPagesModule { }
