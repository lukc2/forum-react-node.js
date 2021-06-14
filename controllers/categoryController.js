const db = require("../config/database");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
	//GET http://localhost:3000/api/forum/ranks
	listRanks: function (req, res) {
		db.Rank.findAll()
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
				});
			});
	},
	//GET http://localhost:3000/api/forum/ranks
	listCategories: function (req, res) {
		db.Category.findAll()
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
				});
			});
	},
	//GET http://localhost:3000/api/forum/search
	searchThreads: function (req, res) {
		const search = req.query.search;
		db.Thread.findAll({
			where: {
				name: {
					[Op.iLike]: "%" + search + "%",
				},
			},
		})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
				});
			});
	},
	//http://localhost:3000/api/forum/:categoryId GET
	viewCategory: function (req, res) {
		const category_id = req.params.categoryId;
		db.Category.findAll({
			include: [
				{
					model: db.Thread,
					attributes: ["id", "name", "updatedAt", "reputation"],
					include: [
						{
							model: db.User,
							attributes: ["nickname"],
						},
					],
				},
			],
			where: {
				id: category_id,
			},
			order: [[db.Thread, "updatedAt", "DESC"]],
		})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
				});
			});
	},
	//http://localhost:3000/api/forum/:categoryId/:threadId GET
	viewThread: function (req, res) {
		let category_id = req.params.categoryId;
		let thread_id = req.params.threadId;

		db.Thread.findAll({
			include: [
				{
					model: db.Post,
					include: {
						model: db.User,
						attributes: ["nickname", "rank_id", "avatar"],
					},
				},
			],
			where: {
				[Op.and]: [{ id: thread_id }, { category_id: category_id }],
			},
			order: [[db.Post, "id", "ASC"]],
		})
			.then((data) => res.json(data))
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
				});
			});
	},

	//http://localhost:3000/api/forum/:categoryId/addThread POST
	addThread: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json({
				success: false,
				errors: errors,
			}).end();
			return;
		}
		let body = req.body;
		let catId = req.params.categoryId;

		db.Thread.create({
			name: body.title,
			user_id: req.session.userId,
			category_id: catId,
		})
			.then((thread) => {
				db.Post.create({
					thread_id: thread.id,
					user_id: req.session.userId,
					content: body.content,
					attachement: body.attachement
				})
					.then((post) => {
						res.json({
							success: true,
							thread_id: thread.id,
							post_id: post.id,
							msg: "Pomyślnie dodano wątek",
						});
					})
					.catch((err) => {
						res.json({
							success: false,
							errors: err,
							msg: "Nie udało się dodać wątku",
						});
						return;
					});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udało się dodać wątku",
				});
			});
	},
	//http://localhost:3000/api/forum/:categoryId/:threadId POST
	addPost: async (req, res) => {
		let content = req.body.content;
		let ThrId = req.params.threadId;
		const thread = await db.Thread.findByPk(ThrId);
		if (thread.closed == 1) {
			res.json({
				success: false,
				msg: "Nie można dodać postu - wątek zamknięty!",
			}).end();
			return;
		}

		const post = await db.Post.create({
			thread_id: ThrId,
			user_id: req.session.userId,
			content: content,
		}).catch((err) => {
			res.json({
				success: false,
				errors: err,
			}).end();
			return;
		});
		db.Thread.update(
			// to jest bardzo dziwne ale działa najlepiej, wymuszamy zmianę updatedAt przez podmianę id na to samo
			// sypie to errora ale działa jak należy, nie wiem co myśleć - możliwe że już przestało
			{ id: post.thread_id },
			{ where: { id: post.thread_id } }
		)
			.then(() => {
				res.json({
					success: true,
					msg: "Utworzono post",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udalo się dodać postu!",
				}).end();
			});
	},
	//http://localhost:3000/api/forum/:categoryId/:threadId PUT
	votePost: async (req, res) => {
		let idPost = req.body.postId;
		let userId = req.session.userId;
		const post = await db.Post.findByPk(idPost);
		let votedString = post.voted;

		if (votedString == null) {
			votedString = "0";
		}
		let votArr = votedString.split(",");

		if (votArr.includes(userId.toString())) {
			res.json({
				success: false,
				msg: "Ten uzytkownik juz zaglosowal na ten post!",
			}).end();
			return;
		}
		votArr.push(userId);
		let vote = req.body.vote;
		let rep = post.reputation + vote;
		votedString = votArr.join();

		db.Post.update(
			{ reputation: rep, voted: votedString },
			{ where: { id: idPost } }
		)
			.then(() => {
				res.json({
					success: true,
					id: thread.id,
					msg: "Dodano glos",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udało się dodac głosu na post",
				}).end();
			});
	},
	//http://localhost:3000/api/forum/:categoryId PUT
	voteThread: async (req, res) => {
		let idThread = req.body.threadId;
		let userId = req.session.userId;
		const thread = await db.Thread.findByPk(idThread);
		let votedString = thread.voted;

		if (votedString == null) {
			votedString = "0";
		}
		let votArr = votedString.split(",");

		if (votArr.includes(userId.toString())) {
			res.json({
				success: false,
				msg: "Ten uzytkownik juz zaglosowal na ten wątek!",
			}).end();
			return;
		}
		votArr.push(userId);
		let vote = req.body.vote;
		let rep = thread.reputation + vote;
		votedString = votArr.join();

		db.Thread.update(
			{ reputation: rep, voted: votedString },
			{ where: { id: idThread } },
			{ silent: true }
		)
			.then(() => {
				res.json({
					success: true,
					msg: "Dodano glos na wątek",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udało się dodać głosu na wątek",
				}).end();
			});
	},
	//http://localhost:3000/api/forum/:categoryId PATCH
	//sadzi error ale tak naprawde działa - możliwe że już przestało
	closeThread: async (req, res) => {
		const user = await db.User.findByPk(req.session.userId);
		idThread = req.body.threadId;

		if (user.rank_id == 3) {
			//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
			res.json({
				success: false,
				msg: "Nie masz uprawnień do zamykania wątków!",
			}).end();
			return;
		}
		db.Thread.update(
			{ closed: 1 },
			{ where: { id: idThread } },
			{ silent: true }
		)
			.then(() => {
				res.json({
					success: true,
					msg: "Zamknięto wątek!",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udalo sie zamknąć wątku!",
				}).end();
			});
	},
	//http:localhost:3000/api/forum/:categoryId DELETE
	deleteThread: async (req, res) => {
		const user = await db.User.findByPk(req.session.userId);
		idThread = req.body.threadID;

		if (user.rank_id != 1) {
			//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
			res.json({
				success: false,
				msg: "Nie masz uprawnień do usuwania wątków!",
			}).end();
			return;
		}

		db.Post.destroy({ where: { thread_id: idThread } })
			.then(() => {
				db.Thread.destroy({ where: { id: idThread } })
					.then(() => {
						res.json({
							success: true,
							msg: "Usunieto watek!",
						});
					})
					.catch((err) => {
						res.json({
							success: false,
							errors: err,
							msg: "Nie udalo sie usunac postu z watku",
						}).end();
					});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udalo sie usunac watku!",
				}).end();
			});
	},
	//http://localhost:3000/api/forum/:categoryId/:threadId DELETE
	//sadzi error ale działa - możliwe że już przestało
	deletePost: async (req, res) => {
		const user = await db.User.findByPk(req.session.userId);
		idPost = req.body.postID;

		const post = await db.Post.findByPk(idPost);
		const thread = await db.Thread.findByPk(post.thread_id);

		if (thread.closed == 1) {
			res.json({
				success: false,
				msg: "Nie można usunąć postu - wątek zamknięty!",
			}).end();
			return;
		}

		if (user.rank_id == 3) {
			//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
			res.json({
				success: false,
				msg: "Nie masz uprawnień do usuwania postów!",
			}).end();
			return;
		}

		db.Post.destroy({ where: { id: idPost } })
			.then(() => {
				res.json({
					success: true,
					msg: "Usunięto post",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udalo sie usunac postu!",
				}).end();
			});
	},
	// http://localhost:3000/api/forum/:categoryId/:threadId PATCH
	editPost: async (req, res) => {
		idPost = req.body.postID;
		newContent = req.body.content;
		newAttachement = req.body.attachement

		const user = await db.User.findByPk(req.session.userId);
		const post = await db.Post.findByPk(idPost);
		const thread = await db.Thread.findByPk(post.thread_id);

		if (thread.closed == 1) {
			res.json({
				success: false,
				msg: "Nie można edytować postu - wątek zamknięty!",
			}).end();
			return;
		}

		if (user.rank_id == 3 || post.user_id != user.id) {
			//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
			res.json({
				success: false,
				msg: "Nie masz uprawnień do edytowania cudzych postów lub post jest nie twój!",
			}).end();
			return;
		}

		db.Post.update({ content: newContent, attachement: newAttachement }, { where: { id: idPost } })
			.then(() => {
				res.json({
					success: true,
					msg: "Zedytowano post",
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					errors: err,
					msg: "Nie udalo sie zedytowac posta",
				}).end();
			});
	},
};
