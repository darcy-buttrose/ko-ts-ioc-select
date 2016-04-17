/**
 * Created by Darcy on 3/04/2016.
 */
/// <reference path="../typings.d.ts"/>
import {Keys} from "./Keys";
import {IAction} from "./IAction";
import {Observable,Subject} from "@reactivex/rxjs";
import {Map} from "immutable";

var subject: Subject<IAction> = new Subject<IAction>();
function publish(action: IAction) : void {
    subject.next(action);
}

export {
    subject as intent$,
    publish
}