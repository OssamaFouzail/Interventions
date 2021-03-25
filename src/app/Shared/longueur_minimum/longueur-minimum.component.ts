import { AbstractControl, ValidatorFn } from "@angular/forms"

export class longueurMinimum {
    static longeurMinimum(longeur: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if(valeurControle.value as string == null){
                return {'nbreCaracteresInsuffisants': true };
            }
            else if (((valeurControle.value as string).trim()).length >= longeur) {
                return null
            }
            else {
                return {'nbreCaracteresInsuffisants': true };
            }
        };
    }
}