export enum ActionType {
  MOVE_CELL = 'move_cell',
  DELETE_CELL = 'delete_cell',
  INSERT_CELL_AFTER = 'insert_cell_after',
  UPDATE_CELL = 'update_cell',

  FETCH_CELLS = 'fetch_cells',
  FETCH_CELLS_COMPLETE = 'fetch_cells_complete',
  FETCH_CELLS_ERROR = 'fetch_cells_error',
  SAVE_CELLS_ERROR = 'save_cells_error',
  CLEAR_CELLS_STATE = 'clear_cells_state',

  SET_USER = 'set_user',

  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',
}
