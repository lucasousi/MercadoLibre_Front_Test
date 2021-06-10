export default interface Claim {
	rate: number;
	excluded: ExcludedClaim;
	value: number;
	period: string;
}

interface ExcludedClaim {
	real_rate: number;
	real_value: number;
}
