import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MockAnimationDriver,
  MockAnimationPlayer,
} from '@angular/animations/browser/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { AnimationDriver } from '@angular/animations/browser';

describe('AppComponent2', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let button: HTMLButtonElement;
  let openCloseContainer: HTMLElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [{provide: AnimationDriver, useClass: MockAnimationDriver}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.css('button')).nativeElement;
    openCloseContainer = fixture.debugElement.query(
      By.css('.open-close-container')
    ).nativeElement;
  });

  it('should start "* => open" animation on the first load', () => {
    fixture.detectChanges();

    let player = MockAnimationDriver.log.pop()! as MockAnimationPlayer;

    expect(player.keyframes).toEqual([
      new Map<string, string|number>([[ 'height', '*' ], [ 'opacity', '*' ], [ 'backgroundColor', '*' ], [ 'offset', 0 ]]),
      new Map<string, string|number>([[ 'height', '200px' ], [ 'opacity', '1' ], [ 'backgroundColor', 'yellow' ], [ 'offset', 1 ]]),
    ]);

    // We are still animating
    expect(openCloseContainer.classList.contains('ng-animating')).toBeTruthy();

    player.finish();

    // We are done with the animation
    expect(openCloseContainer.classList.contains('ng-animating')).toBeFalsy();

    const computedStyle = window.getComputedStyle(openCloseContainer);
    expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 0)'); // yellow
  });

  it('should start "open => closed" animation when toggled to closed', () => {
    
    button.click();
    fixture.detectChanges();

    let player = MockAnimationDriver.log.pop()! as MockAnimationPlayer;

    expect(player.keyframes).toEqual([
      new Map<string, string|number>([[ 'height', '*' ], [ 'opacity', '*' ], [ 'backgroundColor', '*' ], [ 'offset', 0 ] ]),
      new Map<string, string|number>([[ 'height', '100px' ], [ 'opacity', '0.8' ], [ 'backgroundColor', 'blue' ], [ 'offset', 1 ]]),
    ]);

    // We are still animating
    expect(openCloseContainer.classList.contains('ng-animating')).toBeTruthy();

    player.finish();

    // We are done with the animation
    expect(openCloseContainer.classList.contains('ng-animating')).toBeFalsy();

    const computedStyle = window.getComputedStyle(openCloseContainer);
    expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)'); // blue
  });
});
