import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbaraBrowserComponent } from './ibara-browser.component';

describe('IbaraBrowserComponent', () => {
  let component: IbaraBrowserComponent;
  let fixture: ComponentFixture<IbaraBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbaraBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbaraBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
