const { Trip: TripModel } = require("../models/Trip");

const tripController = {

    create: async (req, res) => {
        try {
            const trip = {
                destination: req.body.destination,
                starts_at: req.body.starts_at,
                ends_at: req.body.ends_at,
                emails_to_invite: req.body.emails_to_invite,
                owner_name: req.body.owner_name,
                owner_email: req.body.owner_email
            };

            const response = await TripModel.create(trip);
            res.status(201).json({ response, msg: "Criado com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    getAll: async (req, res) => {
        try {
            const trips = await TripModel.find();
            res.json(trips)
        } catch (error) {
            console.log(error)

        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const trip = await TripModel.findById(id);
            if (!trip) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.json(trip)
        } catch (error) {
            console.log(error)

        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const trip = await TripModel.findById(id);
            if (!trip) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            const deletedtrip = await TripModel.findByIdAndDelete(id)
            res.status(200).json({ deletedtrip, msg: "Excluido com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const trip = {
                destination: req.body.destination,
                starts_at: req.body.starts_at,
                ends_at: req.body.ends_at,
                emails_to_invite: req.body.emails_to_invite
            };
            const Updatedtrip = await TripModel.findByIdAndUpdate(id, trip);
            if (!Updatedtrip) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.status(200).json({ trip, msg: "Viagem Atualizado!" })
        } catch (error) {
            console.log(error)

        }
    },
}
module.exports = tripController