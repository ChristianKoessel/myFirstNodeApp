/// <reference path="../../node.d.ts" />
import fs = require('fs');

export interface Weight {
    date: Date;
    weight: number;
}

export default class WeightService {

    private static readWeights(): Weight[] {
        return JSON.parse(fs.readFileSync(__dirname + '/../data/weight.json').toString());
    }

    private static writeWeights(weights: Weight[]) {
        fs.writeFile(__dirname + '/../data/weight.json', JSON.stringify(weights));
    }

    private static reduceWeights(weights: Weight[], date: Date): Weight[] {
        return weights.filter(function(weightEntry) {
            return (weightEntry.date.getTime() != date.getTime());
        });
    }

    public static add(weight: Weight):Weight[] {
        let weights: Weight[] = this.readWeights();
        weights = this.reduceWeights(weights, weight.date);
        weights.push(weight);
        this.writeWeights(weights);
        return weights;
    }

    public static remove(date: Date): Weight[] {
        let weights: Weight[] = this.readWeights();
        weights = this.reduceWeights(weights, date);
        this.writeWeights(weights);
        return weights;
    }

    public static removeAll(): Weight[] {
        this.writeWeights([]);
        return [];
    }

    public static get(date: Date): Weight {
        let weights: Weight[] = this.readWeights();
        for (let weight of weights) {
            if (weight.date.getTime() == date.getTime()) {
                return weight;
            }
        }
        return null;
    }

    public static getAll(): Weight[] {
        return this.readWeights();
    }
}
