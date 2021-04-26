import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../Shared/longueur_minimum/email-matcher/email-matcher.component';
import { longueurMinimum } from '../Shared/longueur_minimum/longueur-minimum.component';
import { ICategorie } from './probleme-data';
import { TypesproblemeService } from './typesprobleme.service';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemForm: FormGroup;
  categoriesProblemes: ICategorie[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private categories: TypesproblemeService) { }

  ngOnInit(): void {
    this.problemForm = this.fb.group({
      prenom: ['', [longueurMinimum.longeurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      typeDeProbleme: ['', [Validators.required]],
      notifier: ['NotifierProbleme'],
      choix: ['NePasNotifier'],
      telephone: [{ value: '', disabled: true }],
      courrielGroup: this.fb.group({
      courriel: [{ value: '', disabled: true }],
      confirmerCourriel: [{ value: '', disabled: true }],
      }),
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true} 
    });

    this.categories.obtenirCategories()
      .subscribe(cat => this.categoriesProblemes = cat,
        error => this.errorMessage = <any>error);
        
      this.problemForm.get('choix').valueChanges
      .subscribe(value => this.appliquerNotification(value));
  }
  save(): void { }
  appliquerNotification(emailChoix: string): void {
    const telephoneCommandeControl = this.problemForm.get('telephone')
    const confirmerCourrielCommandeControl = this.problemForm.get('courrielGroup.confirmerCourriel')
    const courrielCommandeControl = this.problemForm.get('courrielGroup.courriel')
    const groupCommandeControl = this.problemForm.get('courrielGroup')

    telephoneCommandeControl.reset();
    
    telephoneCommandeControl.clearValidators();
    courrielCommandeControl.reset();
    
    courrielCommandeControl.clearValidators();
    confirmerCourrielCommandeControl.reset();
    confirmerCourrielCommandeControl.clearValidators();

    
      if (emailChoix === 'email') {
        courrielCommandeControl.enable();
        courrielCommandeControl.setValidators([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]);
        confirmerCourrielCommandeControl.enable();
        confirmerCourrielCommandeControl.setValidators([Validators.required]);
        groupCommandeControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
        telephoneCommandeControl.disable();
      } else if (emailChoix === 'telephone') {
        telephoneCommandeControl.setValidators([Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(10), Validators.maxLength(10)]);
        telephoneCommandeControl.enable();
        courrielCommandeControl.disable();
        confirmerCourrielCommandeControl.disable();
      } else if (emailChoix === 'NePasNotifier') {
        telephoneCommandeControl.disable();
        courrielCommandeControl.disable();
        confirmerCourrielCommandeControl.disable();
      } 
    
    telephoneCommandeControl.updateValueAndValidity();
    courrielCommandeControl.updateValueAndValidity();
    confirmerCourrielCommandeControl.updateValueAndValidity();
  }

}
