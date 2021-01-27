import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareCodePage } from './share-code.page';

describe('ShareCodePage', () => {
  let component: ShareCodePage;
  let fixture: ComponentFixture<ShareCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
