import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IosComponent } from './ios.component';

describe('IosComponent', () => {
  let component: IosComponent;
  let fixture: ComponentFixture<IosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
