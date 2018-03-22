import moment from "moment";

export const fullDateTimeFormat = 'DD-MM-YYYY HH-MM:SS';
export const DATE_ONLY_FORMAT = 'DD-MM-YYYY';

export const toFormat = (element) => {
    return moment(element).format('DD-MM-YYYY')
};