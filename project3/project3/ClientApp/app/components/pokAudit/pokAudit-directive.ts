import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[pokAudit]'
})
export class PokemonAudit {

    constructor() { }

    @Input('pokAudit') message: string;

    @HostListener('click') logMessage() {
        console.log(this.message);
    }
}