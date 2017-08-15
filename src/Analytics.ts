// // TODO: Make this an interface/Adapter Pattern
// const analytics = require('universal-analytics');

// export class Analytics {

//     initialize(id: string) {
//         analytics.initialize(id);
//         return this;
//     }

//     pageView(path: string, options: object = {}):void {
//         analytics.pageview(path, options);
//     }

//     screenView(screen: string, options: object = {}): void {
//         analytics.screenview(screen, options);
//     }

//     event(category: string, action: string, options: object = {}): void {
//         analytics.event(category, action, options);
//     }

//     custom(dimension: string, value: any): void {
//         analytics.custom(dimension, value);
//     }

// }

// export const PCommAnalytics = new Analytics();