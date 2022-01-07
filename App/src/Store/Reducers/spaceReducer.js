import { SPACE_CREATED } from '../actions/spaceActions';
const initialState = {};

export default function spacesReducer(state = initialState, action) {
	switch (action.type) {
		case SPACE_CREATED: {
			return { ...state, payload: action.payload };
		}

		default: {
			return state;
		}
	}
}
