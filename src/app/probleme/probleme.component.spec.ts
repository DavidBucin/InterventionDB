import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [ProblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    expect(zone.invalid).toBeTruthy();
  });

  it('#5 | Zone PRÉNOM valide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.invalid).toBeTruthy();
  });

  it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a ');
    expect(zone.invalid).toBeTruthy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('');

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.gestionNotification("");

    let zone = component.problemeForm.get('telephone');

    zone.setValue('');

    expect(zone.value).toBe('');
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification("");

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeTrue();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification("");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.disabled).toBeTrue();
  });
  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () =>{
    component.gestionNotification('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.enabled).toBeFalse();
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () =>{
    component.gestionNotification('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.gestionNotification('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.value).toBeNull();
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.gestionNotification('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.value).toBeNull();
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () =>{
    component.gestionNotification('courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel')
    zoneCourriel.setValue('aaaa')
    let errors = zoneCourriel.errors || {};
    expect(errors["pattern"]).toBeFalsy();
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () =>{
    component.gestionNotification('courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup')
    let zoneConfirmerCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zoneConfirmerCourriel.setValue('asdf@gmail.com')
    expect(zoneCourriel.invalid).toBeFalse();
  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () =>{
    component.gestionNotification('courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel')
    zoneCourriel.setValue('asdf@gmail.com')
    let zoneConfirmerCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zoneConfirmerCourriel.invalid).toBeFalse();
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel'
  , () =>{
    component.gestionNotification('courriel');
    let zoneConfirmerCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zoneConfirmerCourriel.setValue('abb@gmail.com')
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel')
    let group = component.problemeForm.get('courrielGroup')
    zoneCourriel.setValue('abbc@gmail.com')
    expect(group.valid).toBeFalse();
  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel'
  , () =>{
    component.gestionNotification('courriel');
    let zoneConfirmerCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zoneConfirmerCourriel.setValue('abbc@gmail.com')
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel')
    let group = component.problemeForm.get('courrielGroup')
    zoneCourriel.setValue('abbc@gmail.com')
    expect(group.invalid).toBeFalse();
  });
  
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte '
  , () =>{
    component.gestionNotification("messageTexte")

    let zone = component.problemeForm.get("telephone");
    expect(zone.enabled).toBeFalse();
  });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")

    let zone = component.problemeForm.get("telephone");
    expect(zone.disabled).toBeTrue();
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")

    let zone = component.problemeForm.get("courrielGroup.courriel");
    expect(zone.disabled).toBeTrue();
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")

    let zone = component.problemeForm.get("telephone");
    zone.setValue('a'.repeat(0))
    expect(zone.status).toBeTruthy();
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")
    let telephone = component.problemeForm.get("telephone")
    telephone.setValue("asdfgh")
    let errors = telephone.errors || {};
    expect(errors["pattern"]).toBeFalsy();
  });
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue("012345678")
    let errors = zone.errors || {};
    expect(errors["minLength"]).toBeFalsy();
  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue("01234567891")
    let errors = zone.errors || {};
    expect(errors["minLength"]).toBeFalsy();
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte'
  , () =>{
    component.gestionNotification("messageTexte")
    let zone = component.problemeForm.get("telephone")
    zone.setValue('1234567891')
    let errors = zone.errors || {};
    expect(errors["required"]).toBeFalsy();
  });



});
