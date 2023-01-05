import moment from "moment";

const Formatters = {
    formatDate(date: string) {        
        return moment(date.slice(0, 10)).format('DD/MM/YYYY');
    }
};

export default Formatters;