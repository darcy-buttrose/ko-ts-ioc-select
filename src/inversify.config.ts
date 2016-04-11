/// <reference path="./typings.d.ts" />
import "reflect-metadata";
import {NameService} from "./Services/NameService";
import {INameService} from "./Services/INameService";
import {IHomePageViewModel} from "./Components/Pages/Home/IHomePageViewModel"
import {HomePageViewModel} from "./Components/Pages/Home/HomePageViewModel"
import {Kernel} from "./libs/inversify/inversify.js";

var kernel = new Kernel();
kernel.bind<INameService>("INameService").to(NameService);
kernel.bind<IHomePageViewModel>("IHomePageViewModel").to(HomePageViewModel);

export {
    kernel
}