import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from './../../shared';

import { ProjetsComponent } from './projets.component';

describe('ChartsComponent', () => {
  let component: ProjetsComponent;
  let fixture: ComponentFixture<ProjetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      Ng2Charts,
      PageHeaderModule
    ],
      declarations: [ ProjetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
