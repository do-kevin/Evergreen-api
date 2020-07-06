const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';
const PROVIDER_TABLE = 'providers';
const DATAFIELD_TABLE = 'datafields';
const STUDENT_PATHWAY_TABLE = 'students_pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(DATAFIELD_TABLE, 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn(PROVIDER_TABLE, 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn(OFFER_TABLE, 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn(PATHWAY_TABLE, 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn(STUDENT_PATHWAY_TABLE, 'notes', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(DATAFIELD_TABLE, 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn(PROVIDER_TABLE, 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn(OFFER_TABLE, 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn(PATHWAY_TABLE, 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn(STUDENT_PATHWAY_TABLE, 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
