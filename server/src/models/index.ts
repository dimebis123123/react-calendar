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
	public id!: number
	public email!: string
	public password!: string
	public role!: string
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

export default User
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
