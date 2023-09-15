import Store from 'electron-store'

type StoreType = {
    'windowState.maximized': boolean,
    'windowState.fullscreen': boolean
}

export const store = new Store<StoreType>();