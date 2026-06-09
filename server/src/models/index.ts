import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../db'
import {
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	BelongsToManyAddAssociationMixin,
	BelongsToManyGetAssociationsMixin,
} from 'sequelize'
import {
	BelongsToManyAddAssociationsMixin,
	BelongsToManyRemoveAssociationMixin,
	BelongsToManyRemoveAssociationsMixin,
	BelongsToManySetAssociationsMixin,
	BelongsToManyHasAssociationMixin,
	BelongsToManyCountAssociationsMixin,
} from 'sequelize'

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
	declare getCreatedEvents: HasManyGetAssociationsMixin<Event>
	declare createCreatedEvent: HasManyCreateAssociationMixin<Event>

	declare getParticipatedEvents: BelongsToManyGetAssociationsMixin<Event>
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
	date: string
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class Event
	extends Model<EventAttributes, EventCreationAttributes>
	implements EventAttributes
{
	declare id: number
	declare title: string
	declare description: string
	declare date: string

	declare getParticipants: BelongsToManyGetAssociationsMixin<User>
	declare addParticipant: BelongsToManyAddAssociationMixin<User, number>

	declare addParticipants: BelongsToManyAddAssociationsMixin<User, number>

	declare removeParticipant: BelongsToManyRemoveAssociationMixin<User, number>
	declare removeParticipants: BelongsToManyRemoveAssociationsMixin<User, number>

	declare setParticipants: BelongsToManySetAssociationsMixin<User, number>

	declare hasParticipant: BelongsToManyHasAssociationMixin<User, number>

	declare countParticipants: BelongsToManyCountAssociationsMixin
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
		date: {
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

User.hasMany(Event, {
	foreignKey: 'creatorId',
	as: 'createdEvents',
})

Event.belongsTo(User, {
	foreignKey: 'creatorId',
	as: 'creator',
})

User.belongsToMany(Event, {
	through: EventParticipants,
	foreignKey: 'userId',
	as: 'participatedEvents',
})

Event.belongsToMany(User, {
	through: EventParticipants,
	foreignKey: 'eventId',
	as: 'participants',
})

export { User, Event, EventParticipants }
