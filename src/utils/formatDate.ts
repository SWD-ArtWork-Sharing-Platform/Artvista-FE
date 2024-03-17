import moment from 'moment';

export const formatDate_YYYY_MMMM_DD = (dateStr: string) => moment(dateStr).format('YYYY, MMMM DD');