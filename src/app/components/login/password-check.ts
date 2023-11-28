import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class PasswordCheck {
    checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
        let pass = group.get('password')?.value;
        let confirmPass = group.get('confirmPassword')?.value;

        if(pass !== confirmPass){
            group.get('confirmPassword')?.setErrors({notSame: true});
        }

        group.get('confirmPassword')?.markAsTouched();

        return pass === confirmPass ? null : { notSame: true }
    }
}

export class PasswordCheckErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
      control: FormControl | null,
      form: FormGroupDirective | NgForm | null
    ): boolean {
      const invalidCtrl = !!(control && control.invalid && control?.parent?.dirty);
      const invalidParent = !!(
        control &&
        control.parent &&
        control.parent.invalid &&
        control.parent.dirty
      );
  
      return invalidCtrl || invalidParent;
    }
  }