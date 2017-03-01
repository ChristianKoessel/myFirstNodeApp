"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node.d.ts" />
var fs = require("fs");
var WeightService = (function () {
    function WeightService() {
    }
    WeightService.readWeights = function () {
        return JSON.parse(fs.readFileSync(__dirname + '/../data/weight.json').toString());
    };
    WeightService.writeWeights = function (weights) {
        fs.writeFile(__dirname + '/../data/weight.json', JSON.stringify(weights));
    };
    WeightService.reduceWeights = function (weights, date) {
        return weights.filter(function (weightEntry) {
            return (weightEntry.date.getTime() != date.getTime());
        });
    };
    WeightService.add = function (weight) {
        var weights = this.readWeights();
        weights = this.reduceWeights(weights, weight.date);
        weights.push(weight);
        this.writeWeights(weights);
        return weights;
    };
    WeightService.remove = function (date) {
        var weights = this.readWeights();
        weights = this.reduceWeights(weights, date);
        this.writeWeights(weights);
        return weights;
    };
    WeightService.removeAll = function () {
        this.writeWeights([]);
        return [];
    };
    WeightService.get = function (date) {
        var weights = this.readWeights();
        for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
            var weight = weights_1[_i];
            if (weight.date.getTime() == date.getTime()) {
                return weight;
            }
        }
        return null;
    };
    WeightService.getAll = function () {
        return this.readWeights();
    };
    return WeightService;
}());
exports.default = WeightService;
//# sourceMappingURL=weight.js.map