import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
name: 'prefix'
})
export class PrefixPipe implements PipeTransform {
    transform(value: string, prefix: string) {
        return prefix + value;
    }

}