import { Offer } from '@/models';
import { compact } from 'lodash';
import DataFieldService from '@/services/datafield';
import OfferService from '@/services/offer';
import SequelizeHelperService from '@/services/sequelize-helper';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offer,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.offerResource.create.write_after(async (req, res, context) => {
      const {
        category,
        topics = [],
        related_offers = [],
        prerequisites = [],
      } = req.body;

      const datafields = compact([
        category,
        ...topics,
      ]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      const { includeLoadInstruction: relatedOffersLoad } = await OfferService.addRelatedOffers(context.instance, related_offers);
      const { includeLoadInstruction: prereqOffersLoad } = await OfferService.addPrereqOffers(context.instance, prerequisites);

      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, relatedOffersLoad, prereqOffersLoad]);

      return context.continue;
    });

    this.offerResource.update.write_after(async (req, res, context) => {
      const {
        category: newCategory,
        topics: newTopics = [],
        related_offers = [],
        prerequisites = [],
      } = req.body;

      const datafields = compact([
        newCategory,
        ...newTopics,
      ]);

      await context.instance.setDataFields([]);
      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);

      const {
        includeLoadInstruction: relatedOffersLoad,
      } = await OfferService.connectRelatedOffers(context.instance, related_offers);
      const {
        includeLoadInstruction: prereqOffersLoad,
      } = await OfferService.connectPrereqOffers(context.instance, prerequisites);

      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, relatedOffersLoad, prereqOffersLoad]);

      return context.continue;
    });
  }
}
