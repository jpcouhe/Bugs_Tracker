import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './layout/material.module';
import { LayoutModule } from './layout/layout.module';
import { ChartsComponent } from './components/charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalculDatePipe } from './pipe/calcul-date.pipe';
import { ColorChipPipe } from './pipe/color-chip.pipe';

@NgModule({
  declarations: [ChartsComponent, CalculDatePipe, ColorChipPipe],
  imports: [CommonModule, MaterialModule, LayoutModule, NgxChartsModule],
  exports: [
    MaterialModule,
    LayoutModule,
    CommonModule,
    ChartsComponent,
    CalculDatePipe,
    ColorChipPipe
  ],
})
export class SharedModule {}
