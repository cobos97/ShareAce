import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaPage } from './modal-nueva.page';

describe('ModalNuevaPage', () => {
  let component: ModalNuevaPage;
  let fixture: ComponentFixture<ModalNuevaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNuevaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
