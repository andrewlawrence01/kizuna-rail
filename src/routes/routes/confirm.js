
import { getConfirmationById } from '../../models/model.js';

export default async (req, res, next) => {
    try {
        const { confirmationId } = req.params;
        const confirmation = await getConfirmationById(confirmationId);

        if (!confirmation) {
            return res.status(404).send('Confirmation not found.');
        }

        res.render('routes/confirm', {
            title: 'Trip Confirmation',
            confirmation
        });
    } catch (error) {
        next(error);
    }
};