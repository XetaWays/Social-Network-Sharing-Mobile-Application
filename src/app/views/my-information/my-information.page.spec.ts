import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyInformationPage } from './my-information.page';

describe('MyInformationPage', () => {
  let component: MyInformationPage;
  let fixture: ComponentFixture<MyInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
