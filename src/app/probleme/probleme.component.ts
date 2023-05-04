import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private typeproblemeService: ProblemeService
  ) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }
  save(): void {}

  gestionNotification(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('datesGroup');   
    
    const telephoneControl = this.problemeForm.get('telephone');   


    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();    
    telephoneControl.disable();

    if (typeNotification === 'Courriel') {   
      //courrielControl.setValidators([Validators.required]);      
      //courrielControl.enable();  
      //dateExpeditionControl.setValidators([Validators.required]);              
      //dateExpeditionControl.enable();  
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
      //datesGroupControl.setValidators([Validators.compose([datesValides])]);                       
}   
else
{
  if(typeNotification === 'Téléphone')
  {
    telephoneControl.setValidators([Validators.required]);      
    telephoneControl.disable();           
  }
}


courrielControl.updateValueAndValidity();   
courrielConfirmationControl.updateValueAndValidity();         
telephoneControl.updateValueAndValidity();
  }
}
