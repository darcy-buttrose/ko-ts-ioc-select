/// <reference path="../typings.d.ts" />
import {injectable, inject} from "inversify";

export interface INameService {
    getNames(): Array<string>;
}