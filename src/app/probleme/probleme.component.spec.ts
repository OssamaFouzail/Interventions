import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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


});
