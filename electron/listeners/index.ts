/**
 * Electron Window Listeners Setup
 *
 * This module exports a function to set up event listeners for various aspects of an Electron BrowserWindow.
 * It delegates the setup of specific listeners to separate modules for controls and menu actions.
 *
 * @module WindowListenersSetup
 */

import { BrowserWindow } from 'electron'
import { setupListeners as setupControlsListener } from './controls'
import { setupListeners as setupMenuListener } from './menu'

/**
 * Sets up event listeners for a given Electron BrowserWindow by delegating to other modules.
 *
 * @param {BrowserWindow} win - The Electron BrowserWindow instance to attach listeners to.
 */
export const setupListeners = (win: BrowserWindow) => {
  // Delegate setup of control-related listeners to the 'controls' module
  setupControlsListener(win)

  // Delegate setup of menu-related listeners to the 'menu' module
  setupMenuListener(win)
}
