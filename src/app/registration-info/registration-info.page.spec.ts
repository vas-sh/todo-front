import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationInfoPage } from './registration-info.page';

describe('RegistrationInfoPage', () => {
  let component: RegistrationInfoPage;
  let fixture: ComponentFixture<RegistrationInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
