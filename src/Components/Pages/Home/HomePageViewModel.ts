/**
 * Created by Darcy on 1/04/2016.
 */
/// <reference path="../../../typings.d.ts" />

import * as ko from "knockout";
import {publish} from "../../../Intents/Intent";
import {Keys} from "../../../Intents/Keys";
import {Map} from "immutable";
import state$ from "../../../Models/Model";
import {inject, injectable} from "inversify";
import {INameService} from "../../../Services/INameService";
import {IHomePageViewModel} from "./IHomePageViewModel"

@injectable()
export class HomePageViewModel implements IHomePageViewModel {
    title: string;
    name: KnockoutObservable<string>;
    display : KnockoutObservable<string>;
    names: KnockoutObservable<Array<string>>;
    nameService: INameService;

    constructor (
        @inject("INameService") nameService: INameService
    ) {
        this.nameService = nameService;
    }

    public init(params: {title: string, initName: string}) {
        this.title = params.title;
        this.names = ko.observable(this.nameService.getNames());
        this.name = ko.observable(params.initName);
        this.display = ko.observable(this.name());
        //here
        state$.subscribe(state => {
           this.display(state.get('name'));
        });
    }

    public publishName() {
        publish({
            key: Keys.ChangeName,
            payload: Map({name:this.name()})
        })
    }
}