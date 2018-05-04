import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GitService } from '../../services/github.service';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    selector: 'git-form',
    templateUrl: './git-form.component.html',
    styleUrls: ['./git-form.component.scss']
})
export class GitFormComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private _userForm: FormGroup;
    private displayedColumns = ['lan', 'branch', 'name', 'description', 'url'];
    private _elementData: any[] = [];
    private _dataSource;

    private _name: string;
    private _dni: string;
    private _birthdate: string;
    private _email: string;
    private _gitUser: string;

    private _showUserInfo: boolean = false;
    private _showUserError: boolean = false;
    private _showGeneralError: boolean = false;

    /**
     * GitFormComponent Constructor
     * @param {GitService} _gitService
     * @param {NgZone} _ngZone
     */
    constructor(private _gitService: GitService, private _ngZone: NgZone) { }

    /**
     * ngOnInit Implementation
     */
    ngOnInit() {
        this._userForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
            dni: new FormControl('', [Validators.required, Validators.min(5), Validators.maxLength(15)]),
            birth_date: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            github_user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)])
        });
    }

    /**
     * Function to find github user
     */
    findUser(): void {
        try {
            this._showUserError = false;
            this._showGeneralError = false;
            this.setUserInformation();
            this._showUserInfo = true;
            let result: Observable<any> = this._gitService.findUserGithubRepos(this._userForm.value.github_user);
            result.subscribe(response => {
                this._ngZone.run(() => {
                    this._elementData = response;
                    this._dataSource = new MatTableDataSource(this._elementData);
                    this._dataSource.paginator = this.paginator;
                    this._dataSource.sort = this.sort;
                });
            }, err => {
                if (err.status === 404) {
                    this._showUserError = true;
                } else {
                    this._showGeneralError = true;
                }
            });
        } catch (e) {
            this._showGeneralError = true;
        }
    }

    /**
     * Function to filter values in data table
     * @param {string} _filterValue 
     */
    applyFilter(_filterValue: string) {
        _filterValue = _filterValue.trim();
        _filterValue = _filterValue.toLowerCase();
        this._dataSource.filter = _filterValue;
    }

    /**
     * Set user information
     */
    setUserInformation(): void {
        this._name = this._userForm.value.name;
        this._dni = this._userForm.value.dni;
        this._birthdate = this._userForm.value.birth_date;
        this._email = this._userForm.value.email;
        this._gitUser = this._userForm.value.github_user;
    }

    /**
     * Clean user information
     */
    cleanUserInformation(): void {
        this._name = '';
        this._dni = '';
        this._birthdate = '';
        this._email = '';
        this._gitUser = '';
    }

    /**
     * Function to cancel process and reset form
     */
    cancel(): void {
        this._userForm.reset();
        this.cleanUserInformation();
        this._dataSource = [];
        this._showUserError = false;
        this._showGeneralError = false;
        this._showUserInfo = false;
    }

    /**
     * ngOnDestroy Implementation
     */
    ngOnDestroy() {
        this.cancel();
    }
}