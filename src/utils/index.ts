import moment from 'moment';
export function formatTime(time: number): string {
  return moment(time).format('YYYY-MM-DD');
}
