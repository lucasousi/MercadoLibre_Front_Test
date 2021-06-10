/* 

Fluxo: Componente => Service => Store => Componente. Mão única, cada um no seu quadrado.
1. Componente chama Service
2. Service chama e alimenta Store.
3. Store repassa o state ao Componente a partir dos Observables.

*/

import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

interface StoreBase<StateType> {
	initialState: StateType | StateType[];
	state$: BehaviorSubject<StateType | StateType[] | null>;
	updateState(request: Function | Partial<StateType | StateType[]>): void;
	getCurrentState(): StateType | StateType[] | null;
}

export default function getStoreBase<StateType>(
	initialState: StateType | StateType[],
): StoreBase<StateType> {
	// Inicia o BehaviorSubject com os dados iniciais
	const state$ = new BehaviorSubject<StateType | StateType[] | null>(null);

	// Atualiza o estado interno e emite um novo estado
	function updateState(request: Function | Partial<StateType | StateType[]>) {
		const currentState = cloneDeep(state$.getValue());
		const newState =
			request instanceof Function ? request(currentState) : request;

		/** Atribui valor ao Observable, sendo:
		 * Em caso de ARRAY, apenas substitui o antigo estado pelo novo estado
		 * Em caso de OBJECT, junta atual estado + novo estado para assim alterar apenas as props modificadas
		 *
		 * */

		state$.next(
			currentState
				? Array.isArray(currentState)
					? newState
					: {
							...currentState,
							...newState,
					  }
				: Array.isArray(initialState)
				? newState
				: {
						...initialState,
						...newState,
				  },
		);
	}

	// Capta o estado atual
	function getCurrentState() {
		return state$.getValue();
	}

	// Retorno tudo que uma store precisa
	return {
		initialState,
		state$,
		updateState,
		getCurrentState,
	};
}
