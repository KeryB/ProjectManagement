import moment from "moment/moment";

export const toFormat = (element) => {
    moment(element).format('DD-MM-YYYY')
};