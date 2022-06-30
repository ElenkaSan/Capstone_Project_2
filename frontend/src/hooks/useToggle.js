import { useState } from 'react';

const useToggle = (initialState = true) => {

    const [state, setState] = useState(initialState);

    const flipState = () => {
        setState(state => !state);
    }
    return [state, flipState];
}
export default useToggle;