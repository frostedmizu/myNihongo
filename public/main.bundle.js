webpackJsonp([1,4],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActivityService = (function () {
    function ActivityService(authService, http) {
        this.authService = authService;
        this.http = http;
    }
    ActivityService.prototype.getQuestions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = this.authService.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var classId = this.profile.classId;
        var url = 'question/getQuestions?classId=' + classId;
        return this.http.get(url, { headers: headers })
            .map(function (res) {
            var questionsData = res.json();
            return questionsData.data;
        });
    };
    ActivityService.prototype.addQuestion = function (question) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = this.authService.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('question/addQuestion', question, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Returns updated questions
    ActivityService.prototype.deleteQuestion = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = this.authService.loadToken();
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var classId = this.profile.classId;
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('question/deleteQuestion', { id: id, classId: classId }, { headers: headers })
            .map(function (res) {
            var questionsData = res.json();
            return questionsData.data;
        });
    };
    ActivityService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _b) || Object])
    ], ActivityService);
    return ActivityService;
    var _a, _b;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/activity.service.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_activity_service__ = __webpack_require__(158);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddQuestionModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddQuestionModalComponent = (function () {
    function AddQuestionModalComponent(bsModalRef, activityService) {
        this.bsModalRef = bsModalRef;
        this.activityService = activityService;
        this.answerOptions = [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" }
        ];
    }
    AddQuestionModalComponent.prototype.ngOnInit = function () {
    };
    AddQuestionModalComponent.prototype.onSubmit = function () {
        var _this = this;
        this.clearMsg();
        var profile = JSON.parse(localStorage.getItem('profile'));
        var classId = profile.classId;
        var question = {
            question: this.question,
            choiceA: this.choiceA,
            choiceB: this.choiceB,
            choiceC: this.choiceC,
            choiceD: this.choiceD,
            answer: this.answer,
            level: 1,
            classId: classId
        };
        this.activityService.addQuestion(question).subscribe((function (data) {
            if (data.success) {
                _this.resetForm();
                _this.showSuccessMsg();
            }
            else {
                _this.showErrorMsg();
            }
        }), function (err) {
            _this.showErrorMsg();
        });
    };
    AddQuestionModalComponent.prototype.resetForm = function () {
        this.question = undefined;
        this.choiceA = undefined;
        this.choiceB = undefined;
        this.choiceC = undefined;
        this.choiceD = undefined;
        this.answer = undefined;
    };
    AddQuestionModalComponent.prototype.showSuccessMsg = function () {
        this.showSuccess = true;
    };
    AddQuestionModalComponent.prototype.showErrorMsg = function () {
        this.showError = true;
    };
    AddQuestionModalComponent.prototype.clearMsg = function () {
        this.showError = false;
        this.showSuccess = false;
    };
    AddQuestionModalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-question-modal',
            template: __webpack_require__(720),
            styles: [__webpack_require__(711)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalRef */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_activity_service__["a" /* ActivityService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_activity_service__["a" /* ActivityService */]) === 'function' && _b) || Object])
    ], AddQuestionModalComponent);
    return AddQuestionModalComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/add-question-modal.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined ||
            user.email == undefined ||
            user.username == undefined ||
            user.password == undefined ||
            user.role == undefined) {
            return false;
        }
        else {
            if (user.role === "teacher") {
                if (user.className == undefined) {
                    return false;
                }
            }
            else {
                if (user.classId == undefined) {
                    return false;
                }
            }
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    ValidateService.prototype.validateClassId = function (classId) {
        if (classId.match(/^[0-9a-fA-F]{24}$/)) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/validate.service.js.map

/***/ }),

/***/ 413:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 413;


/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(532);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/main.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(719),
            styles: [__webpack_require__(710)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/app.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_vocab_vocab_component__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_validate_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_activity_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_add_question_modal_add_question_modal_component__ = __webpack_require__(349);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGaurd */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGaurd */]] },
    { path: 'vocab', component: __WEBPACK_IMPORTED_MODULE_13__components_vocab_vocab_component__["a" /* VocabComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGaurd */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_vocab_vocab_component__["a" /* VocabComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_add_question_modal_add_question_modal_component__["a" /* AddQuestionModalComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot()
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_19__components_add_question_modal_add_question_modal_component__["a" /* AddQuestionModalComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_14__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGaurd */], __WEBPACK_IMPORTED_MODULE_17__services_activity_service__["a" /* ActivityService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/app.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_activity_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_question_modal_add_question_modal_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = (function () {
    function DashboardComponent(activityService, modalService, flashMessagesService) {
        this.activityService = activityService;
        this.modalService = modalService;
        this.flashMessagesService = flashMessagesService;
        this.subscriptions = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Bring in questions
        this.getQuestions();
        this.subscriptions.push(this.modalService.onHide.subscribe(function (reason) {
            _this.getQuestions();
        }));
    };
    DashboardComponent.prototype.openModal = function () {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__add_question_modal_add_question_modal_component__["a" /* AddQuestionModalComponent */]);
    };
    DashboardComponent.prototype.getQuestions = function () {
        var _this = this;
        this.activityService.getQuestions().subscribe(function (questions) {
            _this.questions = questions;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    DashboardComponent.prototype.deleteQuestion = function (index) {
        var _this = this;
        console.log(this.questions[index]._id);
        var id = this.questions[index]._id;
        this.activityService.deleteQuestion(id).subscribe(function (questions) {
            _this.questions = questions;
            _this.flashMessagesService.show('Question removed', { cssClass: 'alert-success', timeout: 3000 });
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(721),
            styles: [__webpack_require__(712)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_activity_service__["a" /* ActivityService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_activity_service__["a" /* ActivityService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["c" /* BsModalService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["c" /* BsModalService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(722),
            styles: [__webpack_require__(714)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/home.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessagesService) {
        this.authService = authService;
        this.router = router;
        this.flashMessagesService = flashMessagesService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessagesService.show('Log in successful!', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(723),
            styles: [__webpack_require__(715)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/login.component.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessagesService) {
        this.authService = authService;
        this.router = router;
        this.flashMessagesService = flashMessagesService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessagesService.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(724),
            styles: [__webpack_require__(716)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(725),
            styles: [__webpack_require__(717)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/profile.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessagesService, authService, router) {
        this.validateService = validateService;
        this.flashMessagesService = flashMessagesService;
        this.authService = authService;
        this.router = router;
        this.roleOptions = [{ value: "teacher", label: "Teacher" }, { value: "student", label: "Student" }];
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role,
            className: this.className,
            classId: this.classId
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessagesService.show('Please complete all required fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate ClassId
        if (user.classId && !this.validateService.validateClassId(user.classId)) {
            this.flashMessagesService.show('Please enter a valid class ID', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register User
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessagesService.show('You are successfully registered!', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        }, function (err) {
            console.log("ERR: " + err);
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(726),
            styles: [__webpack_require__(718)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/register.component.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_activity_service__ = __webpack_require__(158);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VocabComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VocabComponent = (function () {
    function VocabComponent(activityService) {
        this.activityService = activityService;
        this.view = 'start';
        this.currentQuestion = 0;
        this.progress = [];
        this.count = -1;
        this.score = 0;
    }
    VocabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.questionTime = 10;
        //Bring in questions
        this.activityService.getQuestions().subscribe(function (questions) {
            _this.questions = questions;
            _this.lastQuestion = _this.questions.length - 1;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    VocabComponent.prototype.startQuiz = function () {
        this.view = 'quiz';
        this.renderQuestion();
        this.renderCounter();
        this.timer = setInterval(this.renderCounter.bind(this), 1000);
    };
    VocabComponent.prototype.renderQuestion = function () {
        this.question = this.questions[this.currentQuestion];
    };
    VocabComponent.prototype.renderCounter = function () {
        if (this.count <= this.questionTime) {
            this.count++;
        }
        else {
            this.count = -1;
            // change progress color to red
            this.progress.push(false);
            if (this.currentQuestion < this.lastQuestion) {
                this.currentQuestion++;
                this.renderQuestion();
            }
            else {
                // end the quiz and show the score
                clearInterval(this.timer);
                //this.scoreRender();
                this.view = 'score';
            }
        }
    };
    VocabComponent.prototype.getProgressClass = function (index) {
        if (typeof this.progress[index] === 'undefined') {
            return "fa fa-circle-thin";
        }
        else {
            if (this.progress[index]) {
                return "fa fa-circle green";
            }
            else {
                return "fa fa-circle red";
            }
        }
    };
    VocabComponent.prototype.checkAnswer = function (answer) {
        // Right answer
        if (answer === this.questions[this.currentQuestion].answer) {
            this.progress.push(true);
            this.score++;
        }
        else {
            this.progress.push(false);
        }
        if (this.currentQuestion < this.lastQuestion) {
            this.count = -1;
            this.currentQuestion++;
            this.renderQuestion();
        }
        else {
            this.view = 'score';
        }
    };
    VocabComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vocab',
            template: __webpack_require__(727),
            styles: [__webpack_require__(713)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_activity_service__["a" /* ActivityService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_activity_service__["a" /* ActivityService */]) === 'function' && _a) || Object])
    ], VocabComponent);
    return VocabComponent;
    var _a;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/vocab.component.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('profile', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
        return token;
    };
    AuthService.prototype.isLoggedIn = function () {
        var test = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
        return test;
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/auth.service.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGaurd; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGaurd = (function () {
    function AuthGaurd(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGaurd.prototype.canActivate = function () {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGaurd = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGaurd);
    return AuthGaurd;
    var _a, _b;
}());
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/OMSCS/myNihongo/myNihongo/angular-src/src/environment.js.map

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = "hr {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 96%;\n  background-color: #78C2AD;\n  height: 1px; }\n"

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = ".green {\n  color: green; }\n\n.red {\n  color: red; }\n\n.quizContainer {\n  padding-right: 20px; }\n\n.answerButton {\n  margin: 10px; }\n"

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = ".site-wrapper {\r\n  display: table;\r\n  width: 100%;\r\n  height: 600px;\r\n  background-color: #333;\r\n  /*height: 100%; */\r\n  /*min-height: 100%;*/\r\n}\r\n.site-wrapper-inner {\r\n  display: table-cell;\r\n  vertical-align: top;\r\n}\r\n.cover-container {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n\r\n/* Padding for spacing */\r\n.inner {\r\n  padding: 30px;\r\n}\r\n\r\n/*\r\n * Cover\r\n */\r\n\r\n.cover {\r\n  padding: 0 20px;\r\n}\r\n.cover .btn-lg {\r\n  padding: 10px 20px;\r\n  font-weight: bold;\r\n}\r\n\r\n/*\r\n * Affix and center\r\n */\r\n\r\n@media (min-width: 768px) {\r\n  /* Pull out the header and footer */\r\n  .masthead {\r\n    position: fixed;\r\n    top: 0;\r\n  }\r\n  /* Start the vertical centering */\r\n  .site-wrapper-inner {\r\n    vertical-align: middle;\r\n  }\r\n\r\n}\r\n"

/***/ }),

/***/ 715:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 716:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 717:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 719:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <flash-messages></flash-messages>\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 720:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Add Question</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form (ngSubmit)=\"onSubmit()\" #questionForm=\"ngForm\">\n    <div class=\"form-group\">\n      <label for=\"question\">Question</label>\n      <input type=\"text\"\n             class=\"form-control\"\n             id=\"question\"\n             required\n             [(ngModel)]=\"question\"\n             name=\"question\"\n             (focus)=\"clearMsg()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"choiceA\">Choice A</label>\n      <input type=\"text\"\n             class=\"form-control\"\n             id=\"choiceA\"\n             required\n             [(ngModel)]=\"choiceA\"\n             name=\"choiceA\"\n             (focus)=\"clearMsg()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"choiceB\">Choice B</label>\n      <input type=\"text\"\n             class=\"form-control\"\n             id=\"choiceB\"\n             required\n             [(ngModel)]=\"choiceB\"\n             name=\"choiceB\"\n             (focus)=\"clearMsg()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"choiceC\">Choice C</label>\n      <input type=\"text\"\n             class=\"form-control\"\n             id=\"choiceC\"\n             required\n             [(ngModel)]=\"choiceC\"\n             name=\"choiceC\"\n             (focus)=\"clearMsg()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"choiceD\">Choice D</label>\n      <input type=\"text\"\n             class=\"form-control\"\n             id=\"choiceD\"\n             required\n             [(ngModel)]=\"choiceD\"\n             name=\"choiceD\"\n             (focus)=\"clearMsg()\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"answer\">Answer</label>\n      <div>\n        <select id=\"answer\" name=\"answer\" [(ngModel)]=\"answer\" (click)=\"clearMsg()\">\n          <option [ngValue]=\"undefined\" disabled>Select Answer</option>\n          <option *ngFor=\"let item of answerOptions\" [value]=\"item.value\" >\n            {{item.label}}\n          </option>\n        </select>\n      </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!questionForm.form.valid\">Add Question</button>\n  </form>\n\n  <div class=\"alert alert-success\" role=\"alert\" *ngIf=\"showSuccess\">\n    Question added!\n  </div>\n  <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"showError\">\n    Error: Cannot add question\n  </div>\n</div>\n"

/***/ }),

/***/ 721:
/***/ (function(module, exports) {

module.exports = "<div>\n  <h2 class=\"page-header\">Vocab Quiz</h2>\n\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Add Vocab Question\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"openModal()\">Add Question</button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Your Questions:\n    </div>\n    <div class=\"card-body\">\n      <div *ngFor=\"let question of questions; let last = last; let i = index\" class=\"row\">\n        <div class=\"col-md-10 col-sm-12\">\n          <div>Question: {{question.question}}</div>\n          <ul>\n            <li type=\"A\">{{question.choiceA}}</li>\n            <li type=\"A\">{{question.choiceB}}</li>\n            <li type=\"A\">{{question.choiceC}}</li>\n            <li type=\"A\">{{question.choiceD}}</li>\n          </ul>\n          <div>Answer: {{question.answer}}</div>\n        </div>\n        <div class=\"col-md-2 col-sm-12\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"deleteQuestion(i)\">Delete</button>\n        </div>\n        <hr *ngIf=\"!last\">\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 722:
/***/ (function(module, exports) {

module.exports = "<div class=\"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center\">\n\n  <main role=\"main\" class=\"inner cover\">\n    <h1 class=\"cover-heading\">Welcome to the myNihongo App!</h1>\n    <p class=\"lead\">myNihongo is a Japanese language learning assistant tool. Teachers can customize learning content and\n    gain insight to each student's learning progress. Students can play vocabulary mini games, do reading activities, and\n    compete against other classmates on leaderboards! Please enjoy this app.</p>\n    <p class=\"lead\">\n      <a *ngIf=\"!authService.isLoggedIn()\" [routerLink]=\"['/register']\" class=\"btn btn-lg btn-primary\">Register</a>\n      <a *ngIf=\"!authService.isLoggedIn()\" [routerLink]=\"['/login']\" class=\"btn btn-lg btn-secondary\">Login</a>\n    </p>\n  </main>\n\n  <footer class=\"mastfoot mt-auto\">\n    <div class=\"inner\">\n      <p>Creator: Yan Xu</p>\n    </div>\n  </footer>\n</div>\n"

/***/ }),

/***/ 723:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-signin\" (submit)=\"onLoginSubmit()\">\n  <h1 class=\"h3 mb-3 font-weight-normal\">Please sign in</h1>\n  <label for=\"loginUsername\" class=\"sr-only\">Username</label>\n  <input type=\"text\" id=\"loginUsername\" class=\"form-control\" placeholder=\"Username\" autofocus [(ngModel)]=\"username\" name=\"username\">\n  <label for=\"loginPassword\" class=\"sr-only\">Password</label>\n  <input type=\"password\" id=\"loginPassword\" class=\"form-control\" placeholder=\"Password\" [(ngModel)]=\"password\" name=\"password\">\n<!--  <div class=\"checkbox mb-3\">\n    <label>\n      <input type=\"checkbox\" value=\"remember-me\"> Remember me\n    </label>\n  </div>-->\n  <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n</form>\n"

/***/ }),

/***/ 724:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark bg-dark\">\n  <a class=\"navbar-brand\" href=\"#\">myNihonGo</a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExampleDefault\" aria-controls=\"navbarsExampleDefault\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarsExampleDefault\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/']\">Home</a>\n      </li>\n      <li *ngIf=\"authService.isLoggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/dashboard']\">Dashboard</a>\n      </li>\n      <li *ngIf=\"authService.isLoggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/profile']\">Profile</a>\n      </li>\n      <li *ngIf=\"authService.isLoggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/vocab']\">Vocab</a>\n      </li>\n      <li *ngIf=\"!authService.isLoggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/login']\">Login</a>\n      </li>\n      <li *ngIf=\"!authService.isLoggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <a class=\"nav-link\"[routerLink]=\"['/register']\">Register</a>\n      </li>\n      <li *ngIf=\"authService.isLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" (click)=\"onLogoutClick()\" href=\"#\">Logout</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n"

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <h2 class=\"page-header\">{{user.name}}</h2>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\">Username: {{user.username}}</li>\n    <li class=\"list-group-item\">Email: {{user.email}}</li>\n  </ul>\n</div>\n"

/***/ }),

/***/ 726:
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"onRegisterSubmit()\">\r\n  <h1 class=\"h3 mb-3 font-weight-normal\">Register New Account</h1>\r\n  <div class=\"form-group\">\r\n    <label for=\"registerName\">Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\" id=\"registerName\" placeholder=\"Enter name\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"registerUsername\">Username</label>\r\n    <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\" id=\"registerUsername\" placeholder=\"Enter username\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"registerEmail\">Email address</label>\r\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" id=\"registerEmail\" placeholder=\"Enter email\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"registerRole\">Role</label>\r\n    <div>\r\n      <select id=\"registerRole\" name=\"role\" [(ngModel)]=\"role\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Role</option>\r\n        <option *ngFor=\"let item of roleOptions\" [value]=\"item.value\" >\r\n          {{item.label}}\r\n        </option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"role === 'teacher'\" class=\"form-group\">\r\n    <label for=\"registerClass\">Class Name</label>\r\n    <input type=\"text\" [(ngModel)]=\"className\" name=\"className\" class=\"form-control\" id=\"registerClass\" placeholder=\"Enter Class Name\">\r\n  </div>\r\n  <div *ngIf=\"role === 'student'\" class=\"form-group\">\r\n    <label for=\"registerClassId\">Class ID</label>\r\n    <input type=\"text\" [(ngModel)]=\"classId\" name=\"classId\" class=\"form-control\" id=\"registerClassId\" placeholder=\"Enter Class ID\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"registerPassword\">Password</label>\r\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\" id=\"registerPassword\" placeholder=\"Password\">\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n</form>\r\n"

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = "<div>\n  <h2 class=\"page-header\">Vocab Quiz</h2>\n\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Vocab Quiz Level 1\n    </div>\n    <div class=\"card-body\" [ngSwitch]=\"view\">\n      <div *ngSwitchCase=\"'start'\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"startQuiz()\">Start Quiz!</button></div>\n      <div *ngSwitchCase=\"'quiz'\">\n        <div>{{question.question}}</div>\n        <div class=\"row quizContainer\">\n          <button type=\"button\" class=\"btn btn-secondary col-sm-12 col-lg-4 answerButton\" (click)=\"checkAnswer('A')\">{{question.choiceA}}</button>\n          <button type=\"button\" class=\"btn btn-secondary col-sm-12 col-lg-4 answerButton\" (click)=\"checkAnswer('B')\">{{question.choiceB}}</button>\n          <button type=\"button\" class=\"btn btn-secondary col-sm-12 col-lg-4 answerButton\" (click)=\"checkAnswer('C')\">{{question.choiceC}}</button>\n          <button type=\"button\" class=\"btn btn-secondary col-sm-12 col-lg-4 answerButton\" (click)=\"checkAnswer('D')\">{{question.choiceD}}</button>\n        </div>\n        <div>\n          <hr>\n          <div class=\"progress\" style=\"height: 1px;\">\n            <div class=\"progress-bar\"\n                 role=\"progressbar\"\n                 [ngStyle]=\"{width : ( (count / questionTime) * 100 + '%' ) }\"\n                 attr.aria-valuenow=\"{{(count / questionTime) * 100}}\"\n                 attr.aria-valuemax=\"100\">\n              <span class=\"sr-only\">{{count}}</span>\n            </div>\n          </div>\n          <div></div>\n          <div></div>\n        </div>\n        <div>\n          <i *ngFor=\"let question of questions; let i = index\" [ngClass]=\"getProgressClass(i)\" aria-hidden=\"true\"></i>\n        </div>\n      </div>\n      <div *ngSwitchCase=\"'score'\">Your score: {{this.score}} out of {{this.questions.length}}</div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(414);


/***/ })

},[769]);
//# sourceMappingURL=main.bundle.map