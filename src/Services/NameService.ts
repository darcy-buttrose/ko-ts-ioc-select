/// <reference path="../typings.d.ts" />
import {injectable} from "../libs/inversify/inversify.js";
import {INameService} from "./INameService";

@injectable()
export class NameService implements INameService {
    getNames(): Array<string> {
        return [
            "Darcy",
            "Marta"
        ];
    }
}