import axios from 'axios';
import qs from 'qs';
import Question from '../models/elections';

const VerifyUserVin = async (req, res) => {
    axios
        .post('http://voters.inecnigeria.org/', qs.stringify({data: { Voter: req.body }}), { headers: { Authorization: 'application/x-www-form-urlencoded' }})
        .then((response) => {
        const parsedString = response.data.toString()
        if(!req.user.lastname) return res.status(400).json({ messages: 'Please send in your last name'})
        const { firstname, lastname } = req.user;
        if(parsedString.search(firstname.toUpperCase()) !== -1 && parsedString.search(lastname.toUpperCase()) !== -1) return res.status(200).json({ valid: true })
        return res.status(403).json({ message: 'Sorry that VIN is either invalid, or does not belong to you.' })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json({ message: 'That did not work' })
    })

}

const IndexElection = async (req, res) => {
    try {
        const target = await Question.findById(req.params.questionID)
        if(!target) return res.status(400).json({ message: 'Election not found' });
        const targetX = target.responses.filter(item => item.user.vin && item.user.vin === req.user.vin);
        if(targetX.length) return res.status(409).json({ message: 'This user has participated in this election before'})
        return res.status(200).json({ message: 'All clear' })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export {
    VerifyUserVin, 
    IndexElection
}