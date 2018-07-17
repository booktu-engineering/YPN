import axios from 'axios'
import { StartProcess } from '../../helpers/uploader';
const PayWithPayStack = (navigator) => (data) => (dispatch) => {
    StartProcess(navigator);
    return axios.request({
        url: 'https://api.paystack.co/charge',
        method: 'post',
        data, 
        headers: {
            Authorization: 'Bearer sk_test_fdb0d00f5ce8b7d0073912eab15e6d907938e24b', 
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