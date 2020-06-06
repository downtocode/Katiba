import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YaliyomoComponent } from './yaliyomo.component';

describe('YaliyomoComponent', () => {
  let component: YaliyomoComponent;
  let fixture: ComponentFixture<YaliyomoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YaliyomoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaliyomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
