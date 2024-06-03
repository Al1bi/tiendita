import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelwryComponent } from './jewelwry.component';

describe('JewelwryComponent', () => {
  let component: JewelwryComponent;
  let fixture: ComponentFixture<JewelwryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JewelwryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JewelwryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
