import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../db'

interface UserAttributes {
	id: number
	email: string
	password: string
	role: string
}

interface UserCreationAttributes extends Optional<
	UserAttributes,
	'id' | 'role'
> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	declare id: number
	declare email: string
	declare password: string
	declare role: string
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'USER',
		},
	},
	{
		sequelize,
		tableName: 'users',
	},
)

interface EventAttributes {
	id: number
	title: string
	description: string
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class Event
	extends Model<EventAttributes, EventCreationAttributes>
	implements EventAttributes
{
	declare id: number
	declare title: string
	declare description: string
}

Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'events',
	},
)
interface EventParticipantsAttributes {
	id: number
	eventId: number
	userId: number
}

interface EventParticipantsCreationAttributes extends Optional<
	EventParticipantsAttributes,
	'id'
> {}

class EventParticipants
	extends Model<
		EventParticipantsAttributes,
		EventParticipantsCreationAttributes
	>
	implements EventParticipantsAttributes
{
	declare id: number
	declare eventId: number
	declare userId: number
}

EventParticipants.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		eventId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'event_participants',
	},
)

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
