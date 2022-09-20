import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorChip',
})
export class ColorChipPipe implements PipeTransform {
  transform(type: string): string {
    let color: string;

    switch (type) {
      case 'Issus':
        color = 'red';
        break;
      case 'Bug':
        color = 'blue';
        break;
      case 'Feature Request':
        color = 'green';
        break;
      case 'New':
        color = 'brown ';
        break;
      case 'In progress':
        color = 'grey ';
        break;
      case 'Resolve':
        color = 'yellow';
        break;
      case 'Low':
        color = 'deep-purple';
        break;
      case 'Medium':
        color = 'pink';
        break;
      case 'Hight':
        color = 'dark';
        break;
      case 'Intermediate':
        color = 'white ';
        break;
      default:
        color = 'grey';
        break;
    }

    return color;
  }
}
