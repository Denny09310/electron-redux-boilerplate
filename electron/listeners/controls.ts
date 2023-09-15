/**
 * Electron Window State Management and Event Setup
 *
 * This module provides functions for managing the state of an Electron BrowserWindow
 * and setting up event listeners for window actions such as minimize, maximize, close, etc.
 *
 * @module WindowStateManager
 */

import { BrowserWindow, ipcMain } from 'electron'
import { store } from '../store'

/**
 * Object defining the callback parameters for updating window state.
 */
interface UpdateWindowStateCallback {
  maximized?: boolean
  fullscreen?: boolean
}


/**
 * Sets up event listeners for the given Electron BrowserWindow.
 *
 * @param {BrowserWindow} win - The Electron BrowserWindow instance to attach listeners to.
 */
const setupListeners = (win: BrowserWindow) => {
  // Functions to send window state updates
  const sendMaximized = updateWindowState(win, { maximized: true })
  const sendUnmaximized = updateWindowState(win, { maximized: false })
  const sendEnterFullscreen = updateWindowState(win, { fullscreen: true })
  const sendLeaveFullscreen = updateWindowState(win, { fullscreen: false })

  // Add event listeners to the BrowserWindow
  win.addListener('maximize', sendMaximized)
  win.addListener('unmaximize', sendUnmaximized)
  win.addListener('enter-full-screen', sendEnterFullscreen)
  win.addListener('leave-full-screen', sendLeaveFullscreen)

  // Functions for handling window actions
  const minimize = () => win.minimize()
  const maximize = () => (win.isMaximized() ? win.unmaximize() : win.maximize())
  const close = () => win.close()

  // Add IPC listeners for window actions
  ipcMain.addListener('minimize-window', minimize)
  ipcMain.addListener('maximize-window', maximize)
  ipcMain.addListener('close-window', close)

  // Add a listener for the 'did-finish-load' event to handle window maximization on load
  win.webContents.addListener('did-finish-load', () => {
    const maximized = store.get('windowState.maximized', false);
    if (maximized) win.maximize();
  })

  // Remove event listeners when the window is closed
  win.on('close', () => {
    win.removeListener('maximize', sendMaximized)
    win.removeListener('unmaximize', sendUnmaximized)
    win.removeListener('enter-full-screen', sendEnterFullscreen)
    win.removeListener('leave-full-screen', sendLeaveFullscreen)

    ipcMain.removeListener('minimize-window', minimize)
    ipcMain.removeListener('maximize-window', maximize)
    ipcMain.removeListener('close-window', close)
  })
}

/**
 * Creates a function to update the window state based on the provided callback parameters.
 *
 * @param {BrowserWindow} win - The Electron BrowserWindow instance.
 * @param {UpdateWindowStateCallback} param1 - The callback parameters for updating the window state.
 * @returns {Function} - A function that updates the window state and sends a 'window-size-changed' event.
 */
function updateWindowState(
  win: BrowserWindow,
  { maximized, fullscreen }: UpdateWindowStateCallback,
) {
  return () => {
    // Update window state properties in the store
    if (maximized !== undefined) store.set('windowState.maximized', maximized)
    if (fullscreen !== undefined) store.set('windowState.fullscreen', fullscreen)

    // Retrieve the updated state from the store
    const state = {
      maximized: store.get('windowState.maximized'),
      fullscreen: store.get('windowState.fullscreen'),
    }

    // Send a 'window-size-changed' event to the renderer process
    win.webContents.send('window-size-changed', state)
  }
}

/**
 * Exports the setupListeners function for use in other parts of the application.
 */
export { setupListeners }
