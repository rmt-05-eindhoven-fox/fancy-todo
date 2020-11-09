"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Todos",
			[
				{
					title: "makan pagi",
					description: "pake tomat",
					status: "done",
					due_date: `2020-11-05`,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "makan sore",
					description: "pake apel",
					status: "undone",
					due_date: `2020-11-05`,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "makan malam",
					description: "pake pisang",
					status: "undone",
					due_date: `2020-11-05`,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Todos", null);
	},
};
