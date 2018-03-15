import moment from "moment";

export const toFormat = (element) => {
    return moment(element).format('DD-MM-YYYY')
};