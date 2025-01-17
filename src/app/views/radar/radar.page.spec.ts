import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RadarPage } from './radar.page';

describe('RadarPage', () => {
  let component: RadarPage;
  let fixture: ComponentFixture<RadarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RadarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
