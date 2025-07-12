export function loadState(user, id) {
    // retrieve the saved states for this user
    const savedStates = localStorage.getItem(user);
    if (savedStates) {
        // convert the saved states to an array
        const states = JSON.parse(savedStates);
        // check if the required state is in the array
        return states.includes(id);
    } else {
        // no states saved at all
        return false;
    }
}

export function saveState(user, id, state) {
    // load the saved states for this user
    const savedStates = localStorage.getItem(user);
    if (savedStates) {
        // convert the saved states to an array
        const states = JSON.parse(savedStates);
        if (state) {
            // add this state to the array if it is not already in the array
            if (!states.includes(id)) {
                states.push(id);
            }
        } else {
            // remove the state form the array if it is in the array
            if (states.includes(id)) {
                const index = states.indexOf(id);
                states.splice(index, 1);
            }
        }
        localStorage.setItem(user, JSON.stringify(states));
    } else {
        // no states saved for this user yet
        if (state) {
            // make a new array with just this state to save
            const states = [id];
            localStorage.setItem(user, JSON.stringify(states));
        }
    }
}
