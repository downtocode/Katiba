import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageviewerComponent } from './pageviewer.component';

describe('PageviewerComponent', () => {
  let component: PageviewerComponent;
  let fixture: ComponentFixture<PageviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
