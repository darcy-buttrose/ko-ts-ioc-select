/// <reference path="../../../typings.d.ts" />
import * as ko from "knockout";
import {kernel} from "../../../inversify.config";
import componentTemplate from "text!./home-page.tmpl.html";
import {IHomePageViewModel} from "./IHomePageViewModel"
import {HomePageViewModel} from "./HomePageViewModel"

export function registerHomePageViewModel() {
    ko.components.register('home-page',{
        viewModel: {
            createViewModel: (params,componentInformation) : IHomePageViewModel => {
                var viewModel = kernel.get<IHomePageViewModel>("IHomePageViewModel");
                viewModel.init(params);
                return viewModel;
            }
        },
        template: componentTemplate
    });
}
