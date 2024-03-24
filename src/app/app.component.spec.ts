import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let animatedElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    animatedElement = element.querySelector('div');
  });

  it('should check the styles when the div is open', () => {
    const computedStyle = getComputedStyle(animatedElement);

    expect(computedStyle.opacity).toBe('1');
    expect(computedStyle.height).toBe('200px');
    expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 0)');
  });
});
