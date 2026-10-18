
import {
    getAllRoutes,
    getListOfRegions,
    getListOfSeasons
} from '../../models/model.js';

export default async (req, res, next) => {
    try {
        const regions = await getListOfRegions();
        const seasons = await getListOfSeasons();

        // Read the selected filters from the URL query parameters.
        const selectedRegion = req.query.region || '';
        const selectedSeason = req.query.season || '';

        // Start with every route.
        let routes = await getAllRoutes();

        // Apply the region filter, if one was selected.
        if (selectedRegion) {
            routes = routes.filter(route =>
                route.region.toLowerCase() === selectedRegion.toLowerCase()
            );
        }

        // Apply the season filter, if one was selected.
        if (selectedSeason) {
            routes = routes.filter(route =>
                route.bestSeason.toLowerCase() === selectedSeason.toLowerCase()
            );
        }

        res.render('routes/list', {
            title: 'Scenic Train Routes',
            regions,
            seasons,
            routes,
            selectedRegion,
            selectedSeason
        });
    } catch (error) {
        next(error);
    }
};