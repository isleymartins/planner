const { Trip: TripModel } = require("../models/Trip");

const tripController = {

    create: async (req, res) => {
        try {
            const trip = {
                destination: req.body.destination,
                starts_at: req.body.starts_at,
                ends_at: req.body.ends_at,
                emails_to_invite: req.body.emails_to_invite,
                owner_email: req.body.owner_email
            };
            if (!trip.destination) {
                return res.status(422).json({ response, msg: "O destino é obrigatorio" })
            }
            if (!trip.starts_at || !trip.ends_at) {
                return res.status(422).json({ response, msg: "Data de inicio e fim são obrigatorios" })
            }
            if (!trip.owner_email) {
                return res.status(422).json({ response, msg: "Nome e email do usuario são obrigatorios" })
            }
            const response = await TripModel.create(trip);
            return res.status(201).json({ response, msg: "Criado com sucesso!" })
        } catch (error) {
            return console.log(error)

        }
    },
    getAll: async (req, res) => {
        try {
            const email = req.query.email
            const trips = await TripModel.find({ owner_email: email });
            const response = trips.map(trip => {
                return {
                    id: trip._id,
                    destination: trip.destination,
                    starts_at: trip.starts_at,
                    ends_at: trip.ends_at,
                    emails_to_invite: trip.emails_to_invite,
                    owner_email: trip.owner_email
                }
            })
            return res.status(200).json(response)
        } catch (error) {
            return console.log(error)

        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const trip = await TripModel.findById(id);
            if (!trip) {
                return res.status(404).json({ msg: "Não encontrado!" })
            }
            return res.status(200).json(trip)
        } catch (error) {
            return console.log(error)

        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const trip = await TripModel.findById(id);
            if (!trip) {
                return res.status(404).json({ msg: "Não encontrado!" })
            }
            const deletedtrip = await TripModel.findByIdAndDelete(id)
            return res.status(200).json({ deletedtrip, msg: "Excluido com sucesso!" })
        } catch (error) {
            return console.log(error)

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
            }
            if (!trip.destination) {
                return res.status(422).json({ response, msg: "O destino é obrigatorio" })
            }
            if (!trip.starts_at || !trip.ends_at) {
                return res.status(422).json({ response, msg: "Data de inicio e fim são obrigatorios" })
            }
            if (!trip.owner_email || !trip.owner_name) {
                return res.status(422).json({ response, msg: "Nome e email do usuario são obrigatorios" })
            }
            const Updatedtrip = await TripModel.findByIdAndUpdate(id, trip);
            if (!Updatedtrip) {
                return res.status(404).json({ msg: "Não encontrado!" })
            }
            return res.status(201).json({ trip, msg: "Viagem Atualizado!" })
        } catch (error) {
            return console.log(error)

        }
    },
}
module.exports = tripController