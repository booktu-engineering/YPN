import axios from 'axios'
import { StartProcess } from '../../helpers/uploader';
const PayWithPayStack = (navigator) => (data) => (dispatch) => {
    StartProcess(navigator);
    return axios.request({
        url: 'https://api.paystack.co/charge',
        method: 'post',
        data, 
        headers: {
            Authorization: 'Bearer pk_live_e6fd9ec3c639d4a77bc4d8aba5815b53afca27ff', 
        }
    })
    .then((response) => {
            return response.data.reference;
    })
    .catch((err) => {
        return err;
    })
}

export default PayWithPayStack;