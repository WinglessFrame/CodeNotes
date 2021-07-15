import firebase from 'firebase/app';
import { Dispatch } from 'redux';
import * as db from '../../firestore';

import { CellTypes, Direction } from './../cell';
import {
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  SetUserAction,
  Action,
} from './../actions/index';
import { ActionType } from '../action-types';
import bundle from '../../bundler';
import { RootState } from '../reducers';
import { CellsState } from '../reducers/cellsReducer';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const setUser = (user: firebase.User | null): SetUserAction => {
  return {
    type: ActionType.SET_USER,
    payload: { user },
  };
};

export const fetchNotes = (uid: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const { id, data } = await db.fetchUserNotes(uid);

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: {
          cells: Object.values(JSON.parse(data)),
          id,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, id, order },
      user: { user },
    } = getState();
    if (user) {
      const cells = JSON.stringify(
        order
          .map((id) => data[id])
          .reduce((acc, cell) => {
            acc[cell.id] = cell;
            return acc;
          }, {} as CellsState['data'])
      );
      try {
        await db.uploadUserNotes(id, cells);
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: ActionType.SAVE_CELLS_ERROR,
            payload: error.message,
          });
        }
      }
    }

    // try {
    //   await axios.post('/cells', { cells });
    // } catch (err) {
    //   dispatch({
    //     type: ActionType.SAVE_CELLS_ERROR,
    //     payload: err.message,
    //   });
    // }
  };
};
