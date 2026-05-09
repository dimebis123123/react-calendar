import sequelize from '../db'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
})
const Event = sequelize.define('event', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})
const EventParticipants = sequelize.define('event_participants', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasMany(Event, { foreignKey: 'creatorId' })
Event.belongsTo(User, { foreignKey: 'creatorId' })
User.belongsToMany(Event, {
	through: EventParticipants,
	foreignKey: 'userId',
})
Event.belongsToMany(User, {
	through: EventParticipants,
	foreignKey: 'eventId',
})

export { User, Event, EventParticipants }
