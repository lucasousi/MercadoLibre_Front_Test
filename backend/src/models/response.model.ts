export interface HTTPResponseError {
	status?: HTTPStatusCode;
	msg: string;
}

export interface HTTPResponseMethods<ResponseType> {
	toJSON: () => ResponseType;
}

export default class HTTPResponse<DataType = any>
	implements HTTPResponseMethods<HTTPResponse<DataType>> {
	private _data: DataType | DataType[];
	private _data_amount: number;
	private _errors: HTTPResponseError[];

	constructor() {
		this.data = null;
		this.errors = null;
	}

	get data() {
		return this._data;
	}

	set data(value: DataType | DataType[]) {
		this._data = value;
		this._data_amount = value ? (Array.isArray(value) ? value.length : 1) : 0;
	}

	get data_amount() {
		return this._data_amount;
	}

	get errors() {
		return this._errors;
	}

	set errors(value: HTTPResponseError[]) {
		this._errors = value;
	}

	toJSON() {
		return {
			data: this.data,
			data_amount: this.data_amount,
			errors: this.errors,
		} as HTTPResponse<DataType>;
	}
}

export enum HTTPStatusCode {
	//Captado de: https://gist.github.com/scokmen/f813c904ef79022e84ab2409574d1b45

	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTI_STATUS = 207,
	ALREADY_REPORTED = 208,
	IM_USED = 226,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	SWITCH_PROXY = 306,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	I_AM_A_TEAPOT = 418,
	MISDIRECTED_REQUEST = 421,
	UNPROCESSABLE_ENTITY = 422,
	LOCKED = 423,
	FAILED_DEPENDENCY = 424,
	UPGRADE_REQUIRED = 426,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
	VARIANT_ALSO_NEGOTIATES = 506,
	INSUFFICIENT_STORAGE = 507,
	LOOP_DETECTED = 508,
	NOT_EXTENDED = 510,
	NETWORK_AUTHENTICATION_REQUIRED = 511,
}
