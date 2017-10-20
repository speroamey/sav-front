// import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// import { Principal } from '../auth/principal.service';
//
// /**
//  * @whatItDoes Conditionally includes an HTML element if current user has any
//  * of the authorities passed as the `expression`.
//  *
//  * @howToUse
//  * ```
//  *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
//  *
//  *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
//  * ```
//  */
// @Directive({
//   selector: '[jhiHasAnyRessources]'
// })
// export class HasAnyRessourcesDirective {
//   constructor(
//     private principal: Principal,
//     private templateRef: TemplateRef<any>,
//     private viewContainerRef: ViewContainerRef
//   ) {}
//
//   @Input()
//   set jhiHasAnyRessources(value: string) {
//     this.updateView(value);
//     // Get notified each time authentication state changes.
//     this.principal
//       .getAuthenticationState()
//       .subscribe(identity => this.updateView(value));
//   }
//
//   private updateView(value): void {
//     this.principal.getRessources().then((ressources: any[]) => {
//       this.viewContainerRef.clear();
//       ressources = [];
//       if (ressources.indexOf(value) === -1) {
//         this.viewContainerRef.createEmbeddedView(this.templateRef);
//       }
//     });
//   }
// }
