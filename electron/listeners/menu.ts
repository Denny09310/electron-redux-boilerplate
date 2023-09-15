/**
 * Electron Menu Command Invocation and Listener Setup
 *
 * This module provides functions for invoking menu commands and setting up event listeners
 * to handle menu command invocations in an Electron application.
 *
 * @module MenuCommandInvocation
 */

import { BrowserWindow, Menu, MenuItem, ipcMain } from 'electron'

/**
 * Sets up event listeners for menu command invocation and cleanup.
 *
 * @param {BrowserWindow} win - The Electron BrowserWindow instance to attach listeners to.
 */
const setupListeners = (win: BrowserWindow) => {
  // Add an IPC listener for invoking menu commands
  ipcMain.addListener('invoke-menu-command', invokeMenuCommand(win))

  // Remove the IPC listener when the window is closed
  win.on('close', () => {
    ipcMain.removeListener('invoke-menu-command', invokeMenuCommand(win))
  })
}

/**
 * Creates a function to invoke a menu command based on the provided command string.
 *
 * @param {BrowserWindow} win - The Electron BrowserWindow instance.
 * @returns {Function} - A function that handles the menu command invocation.
 */
function invokeMenuCommand(win: BrowserWindow) {
  return (e: Electron.IpcMainEvent, command: string) => {
    // Get the application menu
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    // Find the menu item corresponding to the specified role
    const menuItem = getMenuItemByRole(menu.items, command)
    if (!menuItem) return

    // Click the menu item, optionally passing event and window references
    menuItem.click(e, win, win.webContents)
  }
}

/**
 * Recursively searches for a menu item by its role within a Menu or MenuItem array.
 *
 * @param {Menu | MenuItem[]} items - The Menu or MenuItem array to search within.
 * @param {string} role - The role of the menu item to find.
 * @returns {MenuItem | undefined} - The found MenuItem or undefined if not found.
 */
function getMenuItemByRole(items: Menu | MenuItem[], role: string): MenuItem | undefined {
  if (items instanceof Menu) {
    items = items.items
  }

  let found = items.find((item) => item.role === role)

  for (let i = 0, length = items.length; !found && i < length; i++) {
    if (items[i].submenu) {
      found = getMenuItemByRole(items[i].submenu!, role)
    }
  }

  return found
}

/**
 * Exports the setupListeners function for use in other parts of the application.
 */
export { setupListeners }
