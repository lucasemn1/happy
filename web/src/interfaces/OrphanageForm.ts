import Image from './Image';

export default interface OrphanageForm {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images?: FileList;
}
