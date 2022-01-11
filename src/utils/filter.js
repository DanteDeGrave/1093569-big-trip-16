import {FilterType} from '../const';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().diff(point.timeStart) < 0),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().diff(point.timeEnd) > 0),
};
