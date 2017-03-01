/// <reference path="../../node.d.ts" />
export interface Weight {
    date: Date;
    weight: number;
}
export default class WeightService {
    private static readWeights();
    private static writeWeights(weights);
    private static reduceWeights(weights, date);
    static add(weight: Weight): Weight[];
    static remove(date: Date): Weight[];
    static removeAll(): Weight[];
    static get(date: Date): Weight;
    static getAll(): Weight[];
}
