"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagaluUrls = exports.MagaluStrategy = void 0
var pkginfo_1 = __importDefault(require("pkginfo"));
var mercado_livre_strategy_1 = require("./mercado-livre.strategy");
Object.defineProperty(exports, "MagaluStrategy", {
  enumerable: true,
  get: function () {
    return mercado_livre_strategy_1.MagaluStrategy
  },
})
Object.defineProperty(exports, "MagaluUrls", {
  enumerable: true,
  get: function () {
    return mercado_livre_strategy_1.MagaluUrls
  },
})(0, pkginfo_1.default)(module, "version")
