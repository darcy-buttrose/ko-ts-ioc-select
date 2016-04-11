/**
 * Created by Darcy on 3/04/2016.
 */
/// <reference path="../../typings/tsd.d.ts"/>
import {Keys} from "./Keys";
import {IAction} from "./IAction";
import {Observable} from "../libs/rxjs/rx.js";
import {Map} from "immutable";

var subject: Subject<IAction> = new Subject<IAction>();
function publish(action: IAction) : void {
    subject.next(action);
}

export {
    subject as intent$,
    publish
}