import moment from "moment";

const Formatters = {
    formatDate(date: string) {
        return moment(date).format('DD/MM/YYYY');
    }
};

export default Formatters;