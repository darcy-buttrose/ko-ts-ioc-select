/// <reference path="../../../typings.d.ts" />
import {inject} from "inversify";
import {INameService} from "../../../Services/INameService";
import * as ko from "knockout";

export interface IHomePageViewModel {
    title: string;
    name: KnockoutObservable<string>;
    display : KnockoutObservable<string>;
    names: KnockoutObservable<Array<string>>;

    publishName(): void;
}