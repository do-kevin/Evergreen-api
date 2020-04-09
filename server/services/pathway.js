import { Offer } from '@/models';

class PathwayService {
  async addGroupsOfOffersToModel(resourceInstance, groupsOfOffers = []) {
    const instanceId = resourceInstance.id;

    if (groupsOfOffers.length) {
      for (let i = 0; i < groupsOfOffers.length; i += 1) {
        if (!groupsOfOffers[i]) {
          break;
        }
        await resourceInstance.addOffers(groupsOfOffers[i].offers, {
          model: Offer,
          through: {
            group_name: groupsOfOffers[i].name,
            group_input_name: groupsOfOffers[i].inputName,
          },
        });
      }
    }

    return {
      includeLoadInstruction: {
        model: Offer,
        through: { attributes: ['group_name', 'group_input_name'] },
      },
    };
  }
}

export default new PathwayService();
