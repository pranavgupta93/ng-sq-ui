import { Component, OnInit, Input, OnDestroy,
         Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { CustomEventDetails } from '../../shared/interfaces/custom-event-details';
import { CustomEventBroadcasterService } from '../../shared/services/custom-event-broadcaster.service';

import { InputCoreComponent } from '../../shared/entities/input-core-component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadiobuttonComponent),
  multi: true
};

@Component({
  selector: 'sq-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RadiobuttonComponent extends InputCoreComponent implements OnInit, OnDestroy {
  private listenerId: string;
  @Input() radioValue: any;
  @Input() controlLabel: string;

  @Input() isSelected: boolean;
  @Output() isSelectedChange = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.listenerId = CustomEventBroadcasterService.addEventListener(
      'sqRadio:selected',
      (eventDetails: CustomEventDetails) => {
        if (eventDetails.details.group === this.name &&
            !Object.is(this.radioValue, eventDetails.details.sqRadio.radioValue)) {
          this.isSelected = false;
          this.value = eventDetails.details.sqRadio.radioValue;
          this.isSelectedChange.emit(false);
        }
      });
  }

  ngOnDestroy() {
    CustomEventBroadcasterService.removeEventListener('sqRadio:selected', this.listenerId);
  }

  selectRadio() {
    CustomEventBroadcasterService.broadcastEvent(
      'sqRadio:selected',
      {
        details: {
          group: this.name,
          sqRadio: this
        }
      });

    this.isSelected = true;
    this.value = this.radioValue;
    this.isSelectedChange.emit(true);
  }
}