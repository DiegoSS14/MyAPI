var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import crypto from "crypto";
let RefreshToken = class RefreshToken {
    constructor() {
        this.id = crypto.randomUUID();
    }
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", String)
], RefreshToken.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RefreshToken.prototype, "user_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], RefreshToken.prototype, "valid", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expires", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], RefreshToken.prototype, "created_at", void 0);
RefreshToken = __decorate([
    Entity('refresh_tokens'),
    __metadata("design:paramtypes", [])
], RefreshToken);
export { RefreshToken };
