const { Activities: ActivitiesModel } = require("../models/Activities");
const { Activity: ActivityModel } = require("../models/Activity");

const activitiesController = {

    create: async (req, res) => {
        try {
            const activities = {
                tripId: req.body.tripId,
                date: req.body.date,
                activities: req.body.ctivities
            };

            const response = await ActivitiesModel.create(activities);
            res.status(201).json({ response, msg: "Criado com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    getAll: async (req, res) => {
        const id = req.query.id
        try {
            const activities = await ActivitiesModel.find({ tripId: id }).sort({ date: 1 });
            if (!activities) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.status(200).json(activities)
        } catch (error) {
            console.log(error)

        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const activities = await ActivitiesModel.findById(id);
            if (!activities) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.json(activities)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor" })

        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const activities = await ActivitiesModel.findById(id);
            if (!activities) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            const deletedactivities = await ActivitiesModel.findByIdAndDelete(id)
            res.status(200).json({ deletedactivities, msg: "Excluido com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const activities = {
                date: req.body.date,
                activities: req.body.activities
            };
            const Updatedactivities = await ActivitiesModel.findByIdAndUpdate(id, activities);
            if (!Updatedactivities) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.status(200).json({ activities, msg: "Viagem Atualizado!" })
        } catch (error) {
            console.log(error)

        }
    },

    // Activity

    createActivity: async (req, res) => {
        try {
            const id = req.params.id;
            const activity = {
                title: req.body.title,
                occurs_at: req.body.occurs_at,
                description: req.body.description
            };

            const activities = await ActivitiesModel.findById(id);
            if (!activities) {
                res.status(404).json({ msg: "Atividades não encontrado!" });
                return;
            }

            activities.activities.push(activity)
            activities.save()
            res.status(201).json({activities, msg: "Criado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor" });
        }

    },
    getAllActivity: async (req, res) => {
        try {
            const id = req.params.id;
            const activities = await ActivitiesModel.findById(id);

            activities.activities.sort((a, b) => a.occurs_at.localeCompare(b.occurs_at));
            await activities.save(); // Salva as alterações no banco de dados

            if (!activities) {
                res.status(404).json({ msg: "Conjunto de atividades não encontrado!" });
                return;
            }

            res.json(activities.activities);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor" });
        }

    },
    getActivity: async (req, res) => {
        try {
            const id = req.params.id;
            const activityId = req.params.activityId;
            const activities = await ActivitiesModel.findById(id);

            if (!activities) {
                res.status(404).json({ msg: "Não encontrado!" });
                return;
            }

            const activity = activities.activities.find(activity => activity._id == activityId);
            res.status(200).json(activity);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor" });
        }
    }
    ,
    deleteActivity: async (req, res) => {
        try {
            const id = req.params.id;
            const activityId = req.params.activityId;

            const activities = await ActivitiesModel.findById(id);
            if (!activities) {
                res.status(404).json({ msg: "Não encontrado!" });
                return;
            }

            // Filtra o array para excluir a atividade com o ID especificado
            activities.activities = activities.activities.filter(activity => activity._id != activityId);
            // Salva as alterações no banco de dados
            await activities.save();

            res.status(200).json({ activities, msg: "Excluído com sucesso!" });
        } catch (error) {
            console.log(error);
        }
    }
    ,
    updateActivity: async (req, res) => {
        try {
            const id = req.params.id;
            const activityId = req.params.activityId;

            const activity = {
                title: req.body.title,
                occurs_at: req.body.occurs_at,
                description: req.body.description
            };

            const activities = await ActivitiesModel.findById(id);
            if (!activities) {
                res.status(404).json({ msg: "Conjunto de atividades não encontrado!" });
                return;
            }

            const updatedActivity = await ActivityModel.findByIdAndUpdate(activityId, activity, { new: true });
            if (!updatedActivity) {
                res.status(404).json({ msg: "Atividade não encontrada!" });
                return;
            }

            res.status(200).json({ activity: updatedActivity, msg: "Atividade atualizada com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao atualizar a atividade." });
        }
    }

}
module.exports = activitiesController