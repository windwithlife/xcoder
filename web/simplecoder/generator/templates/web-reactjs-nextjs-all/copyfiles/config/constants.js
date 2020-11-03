export const MILISECONDS_TO_SECONDS = 1000.0;
export const WEEK_LENGTH = 7;
const DEFAULT_REFETCH_INTERVAL = 10;

const REFETCH_INTERVALS = {
  USER: 30,
  WHOAMI: 30,
  DEFAULT: DEFAULT_REFETCH_INTERVAL,
};

export function getRefetchInterval(endpoint) {
  return _.get(REFETCH_INTERVALS, endpoint, DEFAULT_REFETCH_INTERVAL);
}

export const MOMENT_MONTH_YEAR_FORMAT = 'MMMM YYYY';
