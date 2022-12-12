import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

const ANGULAR_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

const PRIMENG_MODULES = [
  PasswordModule,
  InputNumberModule,
  SelectButtonModule,
  FileUploadModule,
  AvatarModule,
  ProgressSpinnerModule,
  SkeletonModule,
  TagModule,
  ToastModule,
  MessageModule,
  MessagesModule,
  DynamicDialogModule,
  ConfirmDialogModule,
  SidebarModule,
  InputTextModule,
  InputSwitchModule,
  DropdownModule,
  CalendarModule,
  AutoCompleteModule,
  ButtonModule,
  CardModule,
  DividerModule,
  DataViewModule,
  TableModule,
  TreeModule,
  MenubarModule,
  TabMenuModule,
  ContextMenuModule,
  OverlayPanelModule,
  MenuModule,
  BreadcrumbModule,
  ProgressBarModule,
  DialogModule,
  FieldsetModule,
  CarouselModule,
  ChipsModule,
  ToolbarModule,
  PickListModule,
  ChartModule
];

const MODULES = [
  ...ANGULAR_MODULES,
  ...PRIMENG_MODULES
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class UiModule {}
