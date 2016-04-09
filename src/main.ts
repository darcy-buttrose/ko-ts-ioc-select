/// <reference path="../typings/tsd.d.ts" />
import * as ko from "knockout";
import {registerHomePageViewModel} from "./Components/Pages/Home/register"
import $ from "jquery";

$(() => {
    registerHomePageViewModel();
    ko.applyBindings();
});