import { catchError } from 'rxjs/operators';
import { FakeApiService } from './../../services/fake-api.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(private fakeApiService: FakeApiService) { }

  ngOnInit(): void {
  }

  public twoHundred(): Subscription{
    return this.fakeApiService.successMethod().subscribe(response => {
      console.log('Evvai');
    });
  }

  public fourHundredOne(): Subscription{
    return this.fakeApiService.unathorizedMethod().subscribe(res => console.log('401'));
  }

  public fourHundredThree(): Subscription{
    return this.fakeApiService.forbiddenMethod().subscribe(res => console.log('403'));
  }

  public fourHundredFour(): Subscription{
    return this.fakeApiService.notFoundMethod().subscribe(res => console.log('404'));
  }

  public fiveHundred(): Subscription{
    return this.fakeApiService.internalServerErrorMethod().subscribe(res => console.log('500'));
  }

}
