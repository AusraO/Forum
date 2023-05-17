import { createContext, useReducer } from "react";

const NewUsersContext = createContext();

const NewUsersActionTypes = {
    add: 'add_new_user'
}

const reducer = (state, action) => {
    switch (action.type) {
        case NewUsersActionTypes.add:
            fetch(`http://localhost:8080/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action.data)
            })
            return [...state, action.data]
        default:
            return state
    }
}

const NewUsersProvider = ({ children }) => {

    const [newUsers, setNewUsers] = useReducer(reducer, []);

    return (
        <NewUsersContext.Provider
            value={{
                newUsers,
                NewUsersActionTypes,
                setNewUsers
            }}
        >
            {children}
        </NewUsersContext.Provider>
    )
}
export { NewUsersProvider };
export default NewUsersContext;