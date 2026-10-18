import {
    generateConfirmationCode,
    kmToMiles,
    yenToUsd,
    monthAbbreviation
} from '../includes/helpers.js';

/**
 * Helper function to set all expected res.locals values.
 */
const setLocalVariables = (req, res, next) => {
    // Make NODE_ENV available to all templates.
    res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

    // Make query parameters available to all templates.
    res.locals.query = req.query;

    // Make helper functions available to EJS templates.
    res.locals.generateConfirmationCode = generateConfirmationCode;
    res.locals.kmToMiles = kmToMiles;
    res.locals.yenToUsd = yenToUsd;
    res.locals.monthAbbreviation = monthAbbreviation;

    next();
};

export default setLocalVariables;