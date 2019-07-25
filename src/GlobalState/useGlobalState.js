import { useState } from 'react'

// El estado general es este objeto. Se recomienda mantener esta estructura como contenedor de arrays, strings, otros objetos...etc
const State = {
    fire_init: null,
    current_menu_option: "Crear Proyecto"
}

const useGlobalState = () => {
    const [state, setState] = useState(State)

    const actions = action => {
        const { type, payload } = action

        switch (type) {
            case "setState": {
                return setState(payload)
            }
        }
    }
    return { state, actions }
}

export default useGlobalState