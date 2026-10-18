
import {
    createConfirmation,
    getScheduleById,
    getTicketOptionsForRoute,
    calculateTicketPrice
} from '../../models/model.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);

    if (!schedule) {
        return res.status(404).render('errors/404', {
            title: 'Schedule Not Found'
        });
    }

    const ticketOptions = await getTicketOptionsForRoute(
        schedule.routeId,
        scheduleId
    );

    res.render('routes/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};

const processBookingRequest = async (req, res) => {
    const data = req.body;

    // Get the schedule from the database rather than trusting the form.
    const schedule = await getScheduleById(data.scheduleId);

    if (!schedule) {
        return res.status(400).send('Invalid schedule selected.');
    }

    // Calculate the original ticket price in yen on the server.
    const ticketPriceYen = await calculateTicketPrice(
        schedule.routeId,
        data.ticketClass
    );

    if (ticketPriceYen === null) {
        return res.status(400).send('Invalid ticket class selected.');
    }

    // Store the original yen price with the confirmation.
    const confirmationNum = await createConfirmation({
        ...data,
        routeId: schedule.routeId,
        ticketPriceYen
    });

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };