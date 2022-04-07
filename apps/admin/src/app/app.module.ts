import { ProductsService } from '@develop/products';
import { UiModule } from '@develop/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from './pages/login/login.component';


const UI_Module = [
    ButtonModule,
    InputTextareaModule,
    TagModule,
    ConfirmDialogModule,
    EditorModule,
    CardModule,
    ToolbarModule,
    TableModule,
    ToastModule,
    InputTextModule,
];

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'admin',
                component: DashboardComponent,
            },
            {
                path: 'products',
                component: ProductsListComponent,
            },
            {
                path: 'products/form',
                component: ProductsFormComponent,
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent,
            },
            {
                path: 'orders',
                component: OrderListComponent,

            },   
        ],
    },
    {
        path: 'login',
        component: LoginComponent, 
    }
];
@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        NotFoundComponent,
        ProductsFormComponent,
        ProductsListComponent,
        OrderListComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        ...UI_Module,
    ],
    providers: [MessageService, ProductsService, ConfirmationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
