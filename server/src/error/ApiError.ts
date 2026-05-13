class ApiError extends Error {
	public status: number
	constructor(status: number, message: string) {
		super()
		this.status = status
		this.message = message
		Object.setPrototypeOf(this, ApiError.prototype)
	}
	static badRequest(message: string) {
		return new ApiError(404, message)
	}
	static internal(message: string) {
		return new ApiError(500, message)
	}
}
export default ApiError
