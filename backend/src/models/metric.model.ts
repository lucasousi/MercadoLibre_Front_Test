import Claim from './claims.model';
import Sales from './sale.model';

export default interface Metrics {
	claims: Claim;
	delayed_handling_time: Claim;
	sales: Sales;
	cancellations: Claim;
}
