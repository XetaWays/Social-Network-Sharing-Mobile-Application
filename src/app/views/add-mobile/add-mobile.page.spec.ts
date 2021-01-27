import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMobilePage } from './add-mobile.page';

describe('AddMobilePage', () => {
  let component: AddMobilePage;
  let fixture: ComponentFixture<AddMobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMobilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
