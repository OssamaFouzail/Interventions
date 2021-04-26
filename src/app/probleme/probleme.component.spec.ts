import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { TypesproblemeService } from './typesprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers:[TypesproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(0));
    expect(zone.valid).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeFalsy();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + "a");
    expect(zone.valid).toBeFalsy();
  });

  it('#15 | Zone TELEPHONE est descativee quand ne pas me notifier', () => {
    component.appliquerNotification('NePasNotifier');

    let zone = component.problemForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotification('NePasNotifier');
  });

  it('#17 | Zone ADRESSE COURRIEL est descativee quand ne pas me notifier', () => {
    component.appliquerNotification('NePasNotifier');

    let zone = component.problemForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est vide quand ne pas me notifier', () => {
    component.appliquerNotification('NePasNotifier');

    let zone = component.problemForm.get('courrielGroup.confirmerCourriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel ', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel ', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('courrielGroup.confirmerCourriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('courrielGroup.courriel');
    zone.setValue(null);
    expect(zone.invalid).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('courrielGroup.confirmerCourriel');
    expect(zone.invalid).toBeTrue();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotification( 'email');

    let zone = component.problemForm.get('courrielGroup.courriel');
    zone.setValue("salut");
    expect(zone.invalid).toBeTruthy();
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotification( 'email');

    let errors = {}; 
    let zoneGroupe = component.problemForm.get('courrielGroup');
    let zoneConfirmer = component.problemForm.get('courrielGroup.confirmerCourriel');
    zoneConfirmer.setValue('samyfouzail@gmail.com')
    errors = zoneGroupe.errors || {};
    expect(errors['match']).toBeUndefined(); 
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ', () => {
    component.appliquerNotification( 'email');

    let errors = {}; 
    let zoneGroupe = component.problemForm.get('courrielGroup');
    let zoneCourriel = component.problemForm.get('courrielGroup.courriel');
    zoneCourriel.setValue('samyfouzail@gmail.com')
    errors = zoneGroupe.errors || {};
    expect(errors['match']).toBeUndefined(); 
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotification( 'email');

    let errors = {}; 
    let zoneGroupe = component.problemForm.get('courrielGroup');
    let zoneCourriel = component.problemForm.get('courrielGroup.courriel');
    let zoneConfirmerCourriel = component.problemForm.get('courrielGroup.confirmerCourriel');
    zoneCourriel.setValue('samyfouzail@gmail.com')
    zoneConfirmerCourriel.setValue('samy@gmail.com')
    errors = zoneGroupe.errors || {};
    expect(errors['match']).toBeTruthy; 
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ', () => {
    component.appliquerNotification( 'email');

    let errors = {}; 
    let zoneGroupe = component.problemForm.get('courrielGroup');
    let zoneCourriel = component.problemForm.get('courrielGroup.courriel');
    let zoneConfirmerCourriel = component.problemForm.get('courrielGroup.confirmerCourriel');
    zoneCourriel.setValue('samyfouzail@gmail.com')
    zoneConfirmerCourriel.setValue('samyfouzail@gmail.com')
    errors = zoneGroupe.errors || {};
    expect(errors['match']).toBeUndefined(); 
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotification('telephone');

    let zone = component.problemForm.get('telephone');
    expect(zone.enabled).toBeTruthy();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('courrielGroup.confirmerCourriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('telephone');
    expect(zone.invalid).toBeTrue();
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte ', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("salut");
    expect(zone.invalid).toBeTruthy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("123456789");
    expect(zone.invalid).toBeTruthy();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("12345678911");
    expect(zone.invalid).toBeTruthy();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotification( 'telephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("1234567891");
    expect(zone.valid).toBeTruthy();
  });

});
